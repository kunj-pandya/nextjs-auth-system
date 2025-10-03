"use client";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me");
            setData(res.data.data);
        } catch (error: any) {
            console.log(error.message);
            setData(null);
            toast.error("Failed to fetch user details");
        }
    }

    // fetch when page loads
    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
            <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg w-80 text-center">
                <h1 className="text-2xl font-semibold mb-2"> {data.username || "Loading..."}</h1>
                <p className="text-gray-400 text-sm mb-6"> {data.email || "Loading..."}</p>

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
