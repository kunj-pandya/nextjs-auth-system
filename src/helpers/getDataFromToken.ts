import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload {
    id: string;
    iat?: number;
    exp?: number;
}

export const getDataFormToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload & TokenPayload;
        return decodedToken.id!;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Something went wrong while decoding the token");
        }
    }
}

