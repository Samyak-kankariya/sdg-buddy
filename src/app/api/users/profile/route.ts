import { UserModel } from "@/models/user.model";
import getTokenPayload from "@/utils/getTokenPayload";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest
){
    const userPayload: any = await getTokenPayload(req);
    const userPayloadJson = userPayload.json().then((data: any) => data);

    const user = await UserModel.findOne({
        _id: userPayloadJson.id
    }).select("-password");

    if(!user){
        return NextResponse.json("User not found", {status: 404});
    }

    return NextResponse.json({user}, {status: 200});

}