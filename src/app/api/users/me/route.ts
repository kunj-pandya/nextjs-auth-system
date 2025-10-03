import { getDataFormToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {

    try {
        const userId = await getDataFormToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({ message: "User Found", data: user });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

}
