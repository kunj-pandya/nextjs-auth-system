"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function Signuppage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    //  validation function
    const validateForm = () => {
        if (!user.username || user.username.length < 3) {
            toast.error("Username must be at least 3 characters");
            return false;
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(user.email)) {
            toast.error("Please enter a valid email");
            return false;
        }

        if (!user.password || user.password.length < 8) {
            toast.error("Password must at least 8 characters long");
            return false;
        }

        return true;
    };


    const onSignup = async () => {

        if (!validateForm()) return;

        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            toast.success("Signup successfull!");
            console.log("Signup suceess", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Sign Up Failed", error.message);
            toast.error(error.response?.data?.error || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
        }
    }, [user]);


    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900 border-zinc-400">
            <div className="w-full max-w-md bg-zinc-800 shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-semibold text-center text-orange-400 mb-6">
                    {loading ? "Proccessing...." : "Sign up"}
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
                    disabled={buttonDisabled || loading}
                    className={`w-full py-3 rounded-lg font-medium transition-colors mb-4
            ${buttonDisabled || loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                        }`}
                >
                    {buttonDisabled ? "Fill all fields" : loading ? "Signing up..." : "Sign up"}
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
