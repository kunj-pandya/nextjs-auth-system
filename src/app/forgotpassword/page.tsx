"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    try {
      setLoading(true);
      const res = await axios.post("/api/users/forgotpassword", { email });
      toast.success(res.data.message || "Reset link sent to your email!");
      setEmail("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 border-zinc-400">
      <div className="w-full max-w-md bg-zinc-800 shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-center text-orange-400 mb-6">
          Forgot Password
        </h1>
        <hr className="mb-6 border-zinc-700" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Enter your registered email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="p-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}

