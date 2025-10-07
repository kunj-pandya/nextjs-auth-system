"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            return toast.error("All fields are required");
        }
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }
        if (password.length < 8) {
            return toast.error("Password must be at least 8 characters");
        }

        try {
            setLoading(true);
            const res = await axios.post("/api/users/resetpassword", {
                token,
                password,
            });
            toast.success(res.data.message || "Password reset successfully!");
            setTimeout(() => router.push("/login"), 2000);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.error || err.message);
            } else if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900">
            <div className="w-full max-w-md bg-zinc-800 shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-semibold text-center text-orange-400 mb-6">
                    Reset Password
                </h1>
                <hr className="mb-6 border-zinc-700" />

                <form onSubmit={handleReset} className="flex flex-col gap-4">
                    <label htmlFor="password" className="text-gray-300 text-sm">
                        New Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter new password"
                        className="p-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label htmlFor="confirmPassword" className="text-gray-300 text-sm">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        className="p-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:outline-none"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-medium transition-colors 
                    ${loading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                            }`}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
