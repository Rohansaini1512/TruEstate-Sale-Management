"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

const sortOptions = [
  { value: "customerName", label: "Sort by: Customer Name (A-Z)", defaultOrder: "asc" },
  { value: "date", label: "Sort by: Date (Newest First)", defaultOrder: "desc" },
  { value: "quantity", label: "Sort by: Quantity", defaultOrder: "desc" },
]

export default function SortDropdown({ sortBy, sortOrder, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const currentSort = sortOptions.find((opt) => opt.value === sortBy)
  const label = currentSort ? currentSort.label : "Sort By"

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border bg-gray-200 border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium cursor-pointer"
      >
        <span>{label}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSortChange(option.value, option.defaultOrder)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer ${sortBy === option.value ? "bg-blue-100 text-blue-900" : ""}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
