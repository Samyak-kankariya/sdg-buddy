import { ActionModel } from "@/models/action.model";
import getTokenPayload from "@/utils/getTokenPayload";
import { connectToDatabase } from "@/utils/mongodb-connect";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

const SDG_LABELS: Record<number, string> = {
    1: "No Poverty",
    2: "Zero Hunger",
    3: "Good Health and Well-being",
    4: "Quality Education",
    5: "Gender Equality",
    6: "Clean Water and Sanitation",
    7: "Affordable and Clean Energy",
    8: "Decent Work and Economic Growth",
    9: "Industry, Innovation and Infrastructure",
    10: "Reduced Inequality",
    11: "Sustainable Cities and Communities",
    12: "Responsible Consumption and Production",
    13: "Climate Action",
    14: "Life Below Water",
    15: "Life on Land",
    16: "Peace, Justice and Strong Institutions",
    17: "Partnerships for the Goals"
};  

function getSDGLabel(id: number) {
  return SDG_LABELS[id] || `SDG ${id}`;
}

function getSDGColor(id: number) {
  const colors = [
    "#E5243B", "#DDA63A", "#4C9F38", "#C5192D", "#FF3A21",
    "#26BDE2", "#FCC30B", "#A21942", "#FD6925", "#DD1367",
    "#FD9D24", "#BF8B2E", "#3F7E44", "#0A97D9", "#56C02B",
    "#00689D", "#19486A"
  ];
  return colors[id - 1] || colors[0];
}

function formatDataForFrontend(stats: any[]) {
  const months = 12;
  const goalTemplate = (id: number) => ({
    id: `goal${id}`,
    label: getSDGLabel(id), // Helper for names like "No Poverty"
    color: getSDGColor(id), // Helper for SDG specific hex codes
    data: Array(months).fill(0)
  });

  const resultMap: Record<number, any> = {};
  for (let i = 1; i <= 17; i++) {
    resultMap[i] = goalTemplate(i);
  }

  stats.forEach(stat => {
    // MongoDB $month is 1-indexed. Adjust to 0-indexed for the array.
    const monthIndex = stat._id.month - 1; 
    const sdgNum = stat._id.sdg;
    
    if (resultMap[sdgNum]) {
      resultMap[sdgNum].data[monthIndex] = stat.totalPoints;
    }
  });

  return Object.values(resultMap);
}

export async function GET(
    req: NextRequest
){
    try{
        await connectToDatabase();
        const tokenData = await getTokenPayload(req);
        const tokenDataJson = await tokenData.json().then(data => data);
        const userId = tokenDataJson.id;
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const stats = await ActionModel.aggregate([
        {
            // 1. Filter by user and time range
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                completedAt: { $gte: oneYearAgo }
            }
            },
            {
            // 2. Expand the sdgs array so an action with [1, 2] becomes two separate documents
            $unwind: "$sdgs"
            },
            {
            // 3. Group by SDG and Month
            $group: {
                _id: {
                sdg: "$sdgs",
                month: { $month: "$completedAt" }, // Returns 1-12
                year: { $year: "$completedAt" }
                },
                totalPoints: { $sum: "$points" }
            }
            }
        ]);

        return new Response(JSON.stringify(formatDataForFrontend(stats)), {
            status: 200
        });

    }catch(err: any){
        return new Response(JSON.stringify({error: err.message}), {
            status: 500
        })
    }
}