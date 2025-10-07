"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface User {
    username: string;
    email: string;
}

interface Props {
    userId: string;
}

export default function UserProfileClient({ userId }: Props) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch user details
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/api/users/${userId}`);
                setUser(res.data);
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
        fetchUser();
    }, [userId]);

    // Logout
    const handleLogout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.error || err.message);
            } else if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
            <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg w-80 text-center">
                <h1 className="text-2xl font-semibold mb-2">
                    {loading ? "Loading..." : user?.username || "Unknown User"}
                </h1>
                <p className="text-gray-400 text-sm mb-6">
                    {loading ? "Loading..." : user?.email || "-"}
                </p>

                <button
                    onClick={handleLogout}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg cursor-pointer mb-4"
                >
                    Logout
                </button>

                <button
                    onClick={() => router.push("/")}
                    className="text-orange-400 hover:underline text-sm cursor-pointer"
                >
                    ← Back to Home
                </button>
            </div>
        </div>
    );
}
