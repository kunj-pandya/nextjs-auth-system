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

        const actionLink = emailType === "VERIFY" ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
            : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;


        const htmlContent = `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}</h2>
        <p>
        Click <a href="${actionLink}" style="color: #ff6600; text-decoration: none;">here</a> to 
        ${emailType === "VERIFY" ? "verify your email address" : "reset your password"}.
        </p>
        <p>This link will expire in <b>1 hour</b>.</p>
        <p>If you did not request this, please ignore this email.</p>
        <br />
        </div>`;

        const mailOptions = {
            from: "kunj@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify Your Email"
                    : "Reset Your Password",
            html: htmlContent,
        };

        const mailresponse = await transporter.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}

