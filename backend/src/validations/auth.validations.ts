import { z } from "zod";
import { ApiError } from "../utils/ApiError";
import httpStatus from "http-status";

// Validation Schema
const authSchema = z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    imageURL: z.string().optional(),
});

export const validateAuthInput = (data: any) => {
    const result = authSchema.safeParse(data);
    if (!result.success) {
        console.log("Validation Error:", result.error);
        throw new ApiError("Invalid input data", httpStatus.BAD_REQUEST);
    }
    return result.data;
};
