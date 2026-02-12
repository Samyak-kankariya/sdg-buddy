
import getTokenPayload from "@/utils/getTokenPayload";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest
){
    const userPayload: any = getTokenPayload(req);

    return NextResponse.json(userPayload, {status: 200});

}