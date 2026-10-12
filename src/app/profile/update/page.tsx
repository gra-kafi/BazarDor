"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, ArrowLeft, Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { user, isLoading, updateName } = useAuth();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("তথ্য পরিবর্তন করতে প্রথমে সাইন ইন করুন");
      router.push("/signin?redirect=/profile/update");
    } else if (user) {
      setName(user.name || "");
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }

    setSubmitting(true);
    // Follows BetterAuth updateUser API call implemented in useAuth / authClient
    const success = await updateName(name.trim());
    setSubmitting(false);

    if (success) {
      router.push("/profile");
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-10 shadow-sm space-y-6">
        {/* Back Link */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>

        {/* Heading */}
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-gray-900">
            তথ্য আপডেট করুন (Update Information)
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচের ফর্মটি ব্যবহার করুন।
          </p>
        </div>

        {/* Form per C3 requirements: input field ( Name ), An Update Information button */}
        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              আপনার নাম (Name)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="নতুন নাম লিখুন"
                className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-bold text-sm shadow-md hover:shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>তথ্য আপডেট হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>তথ্য আপডেট করুন (Update Information)</span>
                </>
              )}
            </button>

            <Link
              href="/profile"
              className="w-full sm:w-auto text-center py-3 px-5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm transition-colors"
            >
              বাতিল
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
