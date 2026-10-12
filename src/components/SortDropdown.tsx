"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";

export type SortOption = "default" | "price-asc" | "price-desc";

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortLabels: Record<SortOption, string> = {
  default: "ডিফল্ট",
  "price-asc": "দাম: কম থেকে বেশি",
  "price-desc": "দাম: বেশি থেকে কম",
};

export default function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <span className="text-xs sm:text-sm font-medium text-gray-500 hidden sm:inline">
          সাজান:
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-emerald-700" />
          <span>{sortLabels[currentSort]}</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-1 w-48 sm:w-52 origin-top-right bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
          {(["default", "price-asc", "price-desc"] as SortOption[]).map((option) => (
            <button
              key={option}
              onClick={() => {
                onSortChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-xs sm:text-sm flex items-center justify-between transition-colors ${
                currentSort === option
                  ? "bg-emerald-50 text-emerald-800 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>{sortLabels[option]}</span>
              {currentSort === option && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
