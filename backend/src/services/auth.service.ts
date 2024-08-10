import { ApiError } from "../utils/ApiError";
import httpStatus from "http-status";
import { randomBytes } from "crypto";
import { encryptPassword } from "../utils/encryption";
import UserService from "./user.service";
import { sendVerificationToken, signToken, verifyToken } from "../utils/token";

class AuthService {
    public static register = async (data: {
        fullName: string;
        email: string;
        password: string;
        imageURL?: string;
    }) => {
        const emailExist = await UserService.findByEmail(data.email);

        if (emailExist) {
            throw new ApiError("User already exists", httpStatus.BAD_REQUEST);
        }

        const salt = randomBytes(32).toString("hex");
        const hashedPassword = encryptPassword(data.password, salt);

        const user = await UserService.create({
            ...data,
            password: hashedPassword,
            salt,
            provider: "local",
        });

        await sendVerificationToken({ email: user.email, id: user.id });
        return "A mail was sent successfully, Please verify";
    };

    public static async verifyEmail(token: string) {
        const { id, tokenType } = verifyToken(token);

        if (tokenType !== "verification" || !id) {
            throw new ApiError("Invalid token", httpStatus.BAD_REQUEST);
        }

        const user = await UserService.findById(id);
        if (!user) {
            throw new ApiError("User not found", httpStatus.NOT_FOUND);
        }
        if (user.verified) {
            throw new ApiError("User already verified", httpStatus.BAD_REQUEST);
        }
        await UserService.update(user.id, { verified: true });

        const accessToken = signToken({
            email: user.email,
            id: user.id,
            tokenType: "access",
        });
        return {
            token: accessToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    }
}

export default AuthService;
