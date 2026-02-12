import getTokenPayload from "@/utils/getTokenPayload";
import { connectToDatabase } from "@/utils/mongodb-connect";
import { NextRequest, NextResponse } from "next/server";
import { ActionModel } from "@/models/action.model";

export async function GET(
    req: NextRequest
){
    try{
        await connectToDatabase();
        const tokenPayload = await getTokenPayload(req);
        const tokenPayloadJson = await tokenPayload.json().then(data => data);
        const userId = tokenPayloadJson.id;
        const sdgData = await ActionModel.aggregate([
            {$match: {user: new (require('mongoose').Types.ObjectId)(userId)}},
            {$unwind: "$sdgs"},
            {$group: {
                _id: "$sdgs",
                totalPoints: {$sum: "$points"},
            }},
            {$project: {
                sdgId: "$_id",
                points: "$totalPoints",
                _id: 0
            }},
            {$sort: {sdgId: 1}}
        ]);
        return NextResponse.json(sdgData, {status: 200});
    }catch(err: any){
        return NextResponse.json({error: err.message}, {
            status: 500
        })
    }
}