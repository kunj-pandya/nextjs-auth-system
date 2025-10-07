import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        // Send reset email using helper function
        await sendEmail({ email, emailType: "RESET", userId: user._id });

        return NextResponse.json({
            message: "Reset password link sent to your email",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}