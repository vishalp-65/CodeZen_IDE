import httpStatus from "http-status";
import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import catchAsync from "../utils/catchAsync";
import {
    validateAuthInput,
    validateLoginInput,
    validatePasswordInput,
} from "../validations/auth.validations";
import UserService from "../services/user.service";
import { sendVerificationToken } from "../utils/token";
import { encryptPassword } from "../utils/encryption";
import { randomBytes } from "crypto";

export const createUser = catchAsync(async (req: Request, res: Response) => {
    const validatedData = validateAuthInput(req.body);
    const message = await AuthService.register(validatedData);

    res.status(httpStatus.CREATED).json({ message });
});

export const login = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.body);
    const validatedData = validateLoginInput(req.body);
    const response = await AuthService.login(validatedData);
    res.status(httpStatus.OK).json(response);
});

export const verifyToken = catchAsync(async (req: Request, res: Response) => {
    const { token } = req.query as { token: string };

    if (!token)
        return res
            .status(httpStatus.BAD_REQUEST)
            .json({ error: "Provide token" });

    const response = await AuthService.verifyEmail(token);
    res.status(httpStatus.OK).json(response);
});

export const resendToken = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email)
        return res
            .status(httpStatus.BAD_REQUEST)
            .json({ error: "Provide email" });
    const emailExist = await UserService.findByEmail(email);
    if (!emailExist)
        return res
            .status(httpStatus.NOT_FOUND)
            .json({ error: "Email not found" });
    if (emailExist.verified)
        return res
            .status(httpStatus.OK)
            .json({ error: "Email already verified" });
    await sendVerificationToken(email);
    res.status(httpStatus.OK).json({
        message: "Verification token sent successfully",
    });
});

export const changePassword = async (req: Request, res: Response) => {
    const validatePassword = validatePasswordInput(req.body);
    const { oldPassword, newPassword } = validatePassword;

    const user = await UserService.findById(req.user.id);
    if (!user)
        return res
            .status(httpStatus.NOT_FOUND)
            .json({ error: "User not found" });

    if (user.provider === "local" || user.salt) {
        const oldHash = encryptPassword(oldPassword, user.salt as string);
        if (oldHash !== user.password) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .json({ message: "Invalid Old Password" });
        }
        const newHash = encryptPassword(newPassword, user.salt as string);
        await UserService.update(user.id, { password: newHash });
        res.status(httpStatus.OK).json({ message: "Password changed" });
    } else {
        if (!user.salt) {
            if (!newPassword)
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .json({ error: "probide new password" });
            const salt = randomBytes(32).toString("hex");
            const newHash = encryptPassword(newPassword, salt);
            await UserService.update(user.id, {
                salt,
                password: newHash,
            });
            res.status(httpStatus.OK).json({ message: "Password changed" });
        }
    }
};
