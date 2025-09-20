"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";


export default function Loginpage() {

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const onSignup = async () => {

    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900 border-zinc-400">
            <div className="w-full max-w-md bg-zinc-800 shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-semibold text-center text-orange-400 mb-6">
                    Sign Up
                </h1>
                <hr className="mb-6 border-zinc-700" />

                {/* Username */}
                <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-300 mb-1"
                >
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Enter your username"
                    className="w-full p-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg mb-4 focus:outline-none"
                />

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

                {/* Button */}
                <button
                    onClick={onSignup}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 cursor-pointer transition-colors mb-4"
                >
                    Sign Up
                </button>

                {/* Link */}
                <p className="text-sm text-center text-gray-400">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-orange-400 hover:underline font-medium"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};
