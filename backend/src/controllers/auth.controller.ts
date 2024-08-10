import httpStatus from "http-status";
import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import catchAsync from "../utils/catchAsync";
import { validateAuthInput } from "../validations/auth.validations";

export const createUser = catchAsync(async (req: Request, res: Response) => {
    const validatedData = validateAuthInput(req.body);
    const message = await AuthService.register(validatedData);

    res.status(httpStatus.CREATED).json({ message });
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
