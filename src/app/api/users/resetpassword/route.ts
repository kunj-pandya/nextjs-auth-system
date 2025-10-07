import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: Request) {
    try {
        const { token, password } = await request.json();

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Password reset successfully",
            success: true,
        });
    } catch (err: unknown) {
        let errorMessage = "Something went wrong";

        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
