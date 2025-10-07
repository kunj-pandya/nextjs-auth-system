
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
    username: string;
    email: string;
}

interface Props {
    userId: string;
}

export default function UserProfileClient({ userId }: Props) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/api/users/${userId}`);
                setUser(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, [userId]);

    return (
        <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
            <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg w-80 text-center">
                <h1 className="text-2xl font-semibold mb-2">
                    {user?.username || "Loading..."}
                </h1>
                <p className="text-gray-400 text-sm mb-6">{user?.email || "Loading..."}</p>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg cursor-pointer">
                    Edit Profile
                </button>
            </div>
        </div>
    );
}
