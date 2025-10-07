/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function Loginpage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900 border-zinc-400">
            <div className="w-full max-w-md bg-zinc-800 shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-semibold text-center text-orange-400 mb-6">
                    Login
                </h1>
                <hr className="mb-6 border-zinc-700" />

                {/* Email */}
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full p-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg mb-4 focus:outline-none"
                />

                {/* Password */}
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-1"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full p-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg mb-6 focus:outline-none"
                />

                {/* Forgot Password */}
                <div className="text-right mb-6">
                    <Link
                        href="/forgotpassword"
                        className="text-sm text-orange-400 hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>

                {/* Button */}
                <button
                    onClick={onLogin}
                    className={`w-full py-3 rounded-lg font-medium transition-colors mb-4
                         ${buttonDisabled || loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                        }`}
                >
                    {loading ? "Logging in..." : "Login Here"}
                </button>

                {/* Link */}
                <p className="text-sm text-center text-gray-400">
                    Don’t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-orange-400 hover:underline font-medium"
                    >
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    );
};
