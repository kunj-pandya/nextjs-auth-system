"use client";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function ProfilePage() {

    interface User {
        username: string;
        email: string;
    }

    const router = useRouter();
    const [data, setData] = useState<User | null>(null);

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("logout successful");
            router.push("/login");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error || error.message);
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me");
            setData(res.data.data);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.error || err.message);
            } else if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    }

    // fetch when page loads
    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
            <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg w-80 text-center">
                <h1 className="text-2xl font-semibold mb-2"> {data?.username || "Loading..."}</h1>
                <p className="text-gray-400 text-sm mb-6"> {data?.email || "Loading..."}</p>

                <button
                    onClick={logout}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg cursor-pointer mb-4">
                    Logout
                </button>

                <Link
                    href="/"
                    className="text-orange-400 hover:underline text-sm cursor-pointer"
                >
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
};
