import { config } from "../config/server_config";
import { JWTTokenDetails, JWTTokenPayload } from "../types/user.type";
import JWT from "jsonwebtoken";
import httpStatus from "http-status";
import { ApiError } from "./ApiError";
import { sendMail } from "./nodemailer";

export function signToken(payload: JWTTokenPayload, expiresIn?: string) {
    return JWT.sign(payload, config.JWT_SECRET, {
        expiresIn: expiresIn || "20d",
    });
}

export function verifyToken(token: string) {
    try {
        return JWT.verify(token, config.JWT_SECRET) as JWTTokenDetails;
    } catch (error) {
        console.log(error);
        throw new ApiError("Invalid token", httpStatus.BAD_REQUEST);
    }
}

export async function sendVerificationToken(payload: {
    email: string;
    id: string;
}) {
    const verificationToken = signToken(
        {
            ...payload,
            tokenType: "verification",
        },
        "1d"
    );
    console.log("token", verificationToken);
    await sendMail(payload.email, verificationToken);
}
