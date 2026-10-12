"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const { loginWithEmail, loginWithSocial, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!email.trim() || !password.trim()) {
      const msg = "অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড পূরণ করুন।";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    setSubmitting(true);
    const success = await loginWithEmail(email, password);
    setSubmitting(false);

    if (success) {
      router.push(redirectUrl);
    } else {
      setFormError("ভুল ইমেইল অথবা পাসওয়ার্ড। অনুগ্রহ করে পুনরায় চেষ্টা করুন।");
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setSubmitting(true);
    const success = await loginWithSocial(provider);
    setSubmitting(false);
    if (success) {
      router.push(redirectUrl);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-10 shadow-sm">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto">
            <LogIn className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">সাইন ইন</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            বাজার দরের বিস্তারিত ও সংরক্ষিত তথ্য পেতে সাইন ইন করুন
          </p>
        </div>

        {/* Error alert in form */}
        {formError && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-600 font-medium">
            {formError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              ইমেইল অ্যাড্রেস
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || isLoading}
            className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-bold text-sm shadow-md hover:shadow-lg shadow-emerald-700/20 transition-all duration-200 flex items-center justify-center gap-2 mt-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>সাইন ইন হচ্ছে...</span>
              </>
            ) : (
              <span>সাইন ইন করুন</span>
            )}
          </button>

          <button
            type="button"
            onClick={async () => {
              setEmail("tanvir@example.com");
              setPassword("password123");
              setSubmitting(true);
              const success = await loginWithEmail("tanvir@example.com", "password123");
              setSubmitting(false);
              if (success) {
                router.push(redirectUrl);
              }
            }}
            disabled={submitting || isLoading}
            className="w-full py-2 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>⚡ এক ক্লিকে ডেমো সাইন ইন (Quick Demo Login)</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <span className="relative bg-white px-3 text-xs text-gray-400 font-medium">
            অথবা
          </span>
        </div>

        {/* Social Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={submitting || isLoading}
            className="w-full py-2.5 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 font-semibold text-xs sm:text-sm text-gray-700 flex items-center justify-center gap-3 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Google দিয়ে প্রবেশ করুন</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            disabled={submitting || isLoading}
            className="w-full py-2.5 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 font-semibold text-xs sm:text-sm text-gray-700 flex items-center justify-center gap-3 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 fill-current text-gray-900" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
            <span>GitHub দিয়ে প্রবেশ করুন</span>
          </button>
        </div>

        {/* Link to Register */}
        <div className="mt-8 text-center text-xs sm:text-sm text-gray-500">
          <span>কোনো অ্যাকাউন্ট নেই? </span>
          <Link
            href="/signup"
            className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            নিবন্ধন করুন (সাইন আপ)
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin"></div>
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
