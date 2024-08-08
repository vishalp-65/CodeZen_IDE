import dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT: process.env.PORT as string,
    DB_URI: process.env.DB_URI as string,
    REDIS_URL: process.env.REDIS_URL as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    NODEMAILER: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Boolean(process.env.SMTP_SECURE),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    },
};
