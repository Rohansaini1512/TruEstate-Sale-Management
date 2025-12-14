"use client"

import { Search, X } from "lucide-react"

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <Search size={18} className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        placeholder="Name, Phone no."
        aria-label="Search transactions by customer name or phone number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-2 cursor-pointer text-gray-400 hover:text-gray-600 transition"
          title="Clear search"
          aria-label="Clear search"
        >
          <X size={20} />
        </button>
      )}
    </div>
  )
}
