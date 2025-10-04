/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody;

        if (!username || username.length < 3) {
            return NextResponse.json(
                { error: "Username must be at least 3 characters" },
                { status: 400 }
            );
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!email || !emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Please enter a valid email" },
                { status: 400 }
            );
        }

        if (!password || password.length < 8) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters long" },
                { status: 400 }
            );
        }

        console.log(reqBody);

        // check if user alrady exits
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "user alredy exists" }, { status: 400 });
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log("saaved user", savedUser);

        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "user created successfully",
            success: true,
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
            },
        }, { status: 201 });

    } catch (error: any) {
        console.error("Error creating user:", error); // log for server
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
