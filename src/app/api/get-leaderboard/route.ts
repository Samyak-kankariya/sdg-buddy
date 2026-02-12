import { ProfileModel } from "@/models/profile.model";
import getTokenPayload from "@/utils/getTokenPayload";
import { connectToDatabase } from "@/utils/mongodb-connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest
){
    try{
        await connectToDatabase();
        const tokenData = await getTokenPayload(req);
        const tokenDataJson = await tokenData.json().then(data => data);
        const userId = tokenDataJson.id;
        const userProfile = await ProfileModel.findOne({user: userId});
        const userPoints = userProfile?.totalPoints;
        //fetch leaderboard data from ProfileModel
        const leaderboard = await ProfileModel.aggregate([
        {
            $facet: {
            lower: [
                { $match: { points: { $lt: userPoints } } },
                { $sort: { points: -1 } },
                { $limit: 2 }
            ],
            higher: [
                { $match: { points: { $gt: userPoints } } },
                { $sort: { points: 1 } },
                { $limit: 2 }
            ]
            }
        },
        {
            $addFields: {
            current: [userProfile]
            }
        },
        {
            $project: {
            leaderboard: {
                $concatArrays: ["$lower", "$current", "$higher"]
            }
            }
        }
        ]);
        return NextResponse.json({leaderboard}, {
            status: 200
        }
        )
    }catch(err: any){
        return NextResponse.json({error: err.message}, {
            status: 500
        })
    }
}