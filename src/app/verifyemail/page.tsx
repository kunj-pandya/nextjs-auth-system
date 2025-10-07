"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

export default function VerifyEmailPage() {

    const [token, setToken] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);


    const verifyUserEmail = useCallback(async () => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (err: unknown) {
            setError(true);
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data);
            } else if (err instanceof Error) {
                console.log(err.message);
            } else {
                console.log(err);
            }
        }
    }, [token]);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        verifyUserEmail();
    }, [verifyUserEmail]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
            <div className="bg-gray-800 w-full max-w-md rounded-2xl shadow-lg p-8 text-center">
                <h1 className="text-3xl font-bold mb-6 text-orange-400">Verify Email</h1>

                <h2 className="mb-6 text-sm break-all text-gray-300">
                    {token ? (
                        <span className="bg-gray-700 px-4 py-2 rounded-lg text-orange-300">{token}</span>
                    ) : (
                        <span className="text-red-400">No token found</span>
                    )}
                </h2>

                {verified && (
                    <div className="space-y-4">
                        <h2 className="text-2xl text-green-400 font-semibold">Email Verified Successfully</h2>
                        <Link
                            href="/login"
                            className="inline-block bg-orange-500 text-black px-6 py-2 rounded-lg font-medium hover:bg-orange-400 transition"
                        >
                            Go to Login
                        </Link>
                    </div>
                )}

                {error && (
                    <div className="space-y-2 mt-6">
                        <h2 className="text-2xl font-semibold text-red-500">Verification Failed</h2>
                        <p className="text-sm text-gray-400">Invalid or expired verification link.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

