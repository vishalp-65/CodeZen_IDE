import { z } from "zod";
import { ApiError } from "../utils/ApiError";
import httpStatus from "http-status";

// Validation Schema
const authSchema = z.object({
    fullName: z.string().min(3).trim(),
    email: z.string().email().trim(),
    password: z.string().min(6).trim(),
    imageURL: z.string().optional(),
});

const loginSchema = z.object({
    email: z.string().email().trim(),
    password: z.string().min(6).trim(),
});

export const validateAuthInput = (data: any) => {
    const result = authSchema.safeParse(data);
    if (!result.success) {
        console.log("Validation Error:", result.error);
        throw new ApiError("Invalid input data", httpStatus.BAD_REQUEST);
    }
    return result.data;
};

export const validateLoginInput = (data: any) => {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
        console.log("Validation Error:", result.error);
        throw new ApiError("Invalid input data", httpStatus.BAD_REQUEST);
    }
    return result.data;
};
