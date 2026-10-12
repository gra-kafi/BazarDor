"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Shield, Edit3, LogOut, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.push("/signin?redirect=/profile");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-10 shadow-sm space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left border-b border-gray-100 pb-8">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500 shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-emerald-600 text-white flex items-center justify-center text-4xl font-bold shadow-md">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}

          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Shield className="w-3.5 h-3.5" />
              <span>ভেরিফায়েড প্রোফাইল</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Profile Details List */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
            অ্যাকাউন্ট বিবরণ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <User className="w-4 h-4 text-emerald-600" />
                <span>পুরো নাম</span>
              </div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">
                {user.name}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>ইমেইল অ্যাড্রেস</span>
              </div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
          {/* C3 Requirement: Update button takes user to another route */}
          <Link
            href="/profile/update"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg shadow-emerald-700/20 transition-all"
          >
            <Edit3 className="w-4 h-4" />
            <span>তথ্য আপডেট করুন (Update Information)</span>
          </Link>

          <button
            onClick={() => logout()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 hover:bg-red-50 hover:text-red-600 text-gray-700 font-semibold text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>সাইন আউট</span>
          </button>
        </div>
      </div>
    </div>
  );
}
