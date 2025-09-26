"use client";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();

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

    return (
        <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
            <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg w-80 text-center">
                <h1 className="text-2xl font-semibold mb-2">Kunj Pandya</h1>
                <p className="text-gray-400 text-sm mb-6">Kunj@gmail.com</p>

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
