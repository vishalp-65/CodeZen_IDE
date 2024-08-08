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
