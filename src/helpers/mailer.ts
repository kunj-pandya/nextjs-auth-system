import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000,
                }
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000,
                }
            )
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_TRAP_USER,
                pass: process.env.MAIL_TRAP_PASSWORD
            }
        });

        const mailOptions = {
            from: "kunj@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "verify your email" : "Reset your password",
            html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p>Click<a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
            here</a>to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>
            <p>This link will expire in 1 hour.</p>
            <p>If you did not request this, you can safely ignore this email.</p>
            </div>`,
        }

        const mailresponse = await transporter.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}

