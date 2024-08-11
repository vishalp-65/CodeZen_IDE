import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";
import { prismaClient } from "../client";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";

export const isUserAuthenticated = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const header = req.headers["authorization"];
        if (!header)
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json({ error: "Invalid authorization" });
        const token = header.split(" ")[1];

        const decodedToken = verifyToken(token);
        if (!decodedToken) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json({ message: "Invalid Token" });
        }
        const user = await prismaClient.user.findUnique({
            where: {
                id: decodedToken.id,
            },
            select: {
                id: true,
                provider: true,
                role: true,
                verified: true,
                githubAccessToken: true,
                githubUsername: true,
                installationId: true,
            },
        });
        if (!user)
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json({ error: "Invalid User" });
        if (!user.verified)
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json({ error: "User not verified" });

        req.user = user;
        next();
    }
);
