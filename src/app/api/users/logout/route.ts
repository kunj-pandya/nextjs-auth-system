import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "logout successful",
                success: true
            }
        )
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        return response;
    } catch (err: unknown) {
        let errorMessage = "Something went wrong";

        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
