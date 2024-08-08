import { ApiError } from "../utils/ApiError";
import httpStatus from "http-status";
import { randomBytes } from "crypto";
import { encryptPassword } from "../utils/encryption";
import UserService from "./user.service";
import { sendVerificationToken } from "../utils/token";

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
}

export default AuthService;
