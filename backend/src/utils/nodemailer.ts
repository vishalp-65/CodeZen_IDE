import nodemailer from "nodemailer";
import httpStatus from "http-status";
import { config } from "../config/server_config";
import { ApiError } from "./ApiError";

export const sendMail = async (email: string, token: string) => {
    try {
        const transport = nodemailer.createTransport({
            port: config.NODEMAILER.port,
            host: config.NODEMAILER.host,
            service: config.NODEMAILER.service,
            secure: config.NODEMAILER.secure,
            auth: {
                user: config.NODEMAILER.auth.user,
                pass: config.NODEMAILER.auth.pass,
            },
        });
        console.log(config.NODEMAILER);
        await transport.sendMail({
            from: config.NODEMAILER.auth.user,
            to: email,
            subject: "Confirm Your Email Address",
            html: `
      <p>Thank you for registering! Please click the following link to confirm your email:</p>
      <a href="${process.env.CLIENT_URL}/confirm-email?code=${token}">Confirm Email</a>
    `,
        });
        console.log("MAIL SENT");
    } catch (error) {
        throw new ApiError(
            "Failed to send the verification email",
            httpStatus.INTERNAL_SERVER_ERROR
        );
    }
};
