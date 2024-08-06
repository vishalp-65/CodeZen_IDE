"use client";
import "../../app/globals.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoIosArrowRoundForward } from "react-icons/io";

const Login = () => {
    const [authState, setAuthState] = useState<"login" | "register">("login");
    // State for handle error for each input
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    // Validation function
    const validate = () => {
        const errors: { [key: string]: string } = {};
        if (authState === "login") {
            if (!formData.email) errors.email = "Email is required.";
            setErrors(errors);
            return Object.keys(errors).length === 0;
        }
        if (!formData.email) errors.email = "Email is required.";
        if (!formData.lastName) errors.name = "Last name is required.";
        if (!formData.firstName) errors.name = "First name is required.";
        if (!formData.password) errors.password = "Password date is required.";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        if (!validate()) return;
    };

    useEffect(() => {
        setErrors({});
    }, [authState]);

    return (
        <div className="bg-white">
            <div className="h-screen flex items-center justify-center py-10">
                <div className="w-full sm:w-[25rem] h-auto bg-white rounded-3xl drop-shadow-2xl">
                    <div className="p-8 space-y-6">
                        <div className="pt-4">
                            <p className="font-semibold text-2xl">
                                {authState === "login" ? "Sign in" : "Sign up"}
                            </p>
                            <p className="text-gray-500">
                                to continue to CodeZen
                            </p>
                        </div>

                        <div className="group w-full h-10 rounded-md border flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all">
                            <div className="flex items-center justify-start px-4 gap-4">
                                <FcGoogle className="h-6 w-6" />
                                <Label className="cursor-pointer">
                                    Continue with Google
                                </Label>
                            </div>
                            <IoIosArrowRoundForward className="mr-3 h-5 w-5 hidden group-hover:block" />
                        </div>

                        <div className="w-full flex items-center">
                            <div className="border-b w-full border-gray-400/40"></div>
                            <p className="mx-3.5">or</p>
                            <div className="border-b w-full border-gray-400/40"></div>
                        </div>

                        <div>
                            {authState === "login" ? (
                                <div className="space-y-0.5">
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <div>
                                            <Label>First name</Label>
                                            <Input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <Label>Last name</Label>
                                            <Input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-500 text-sm">
                                            {errors.name}
                                        </p>
                                    )}

                                    <div>
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label>Password</Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        {errors.password && (
                                            <p className="text-red-500 text-sm">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                            <Button
                                variant="default"
                                className="w-full bg-blue hover:bg-blue/90 mt-3"
                                onClick={handleSubmit}
                            >
                                Continue
                            </Button>
                        </div>

                        <div>
                            <p className="text-sm">
                                {authState === "login"
                                    ? "No account ? "
                                    : "Already an account ? "}
                                <span
                                    className="cursor-pointer text-blue"
                                    onClick={() =>
                                        setAuthState(
                                            authState === "login"
                                                ? "register"
                                                : "login"
                                        )
                                    }
                                >
                                    {authState === "login"
                                        ? "Sign up"
                                        : "Sign in"}
                                </span>{" "}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
