"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, RotateCcw } from "lucide-react"

const filterOptions = {
  region: ["North", "South", "East", "West", "Central"],
  gender: ["Male", "Female", "Other"],
  ageRange: ["18-25", "26-35", "36-50", "50+"],
  category: ["Clothing", "Electronics", "Furniture", "Groceries", "Sports"],
  tags: ["Premium", "Sale", "New", "Popular", "Limited"],
  paymentMethod: ["Credit Card", "Debit Card", "Cash", "UPI", "Net Banking"],
}

export default function Filters({ filters, onChange, onClear }) {
  const [expanded, setExpanded] = useState({})

  const handleToggleFilter = (filterName, value) => {
    const currentFilter = filters[filterName]
    const newFilter = currentFilter.includes(value)
      ? currentFilter.filter((item) => item !== value)
      : [...currentFilter, value]

    onChange({
      ...filters,
      [filterName]: newFilter,
    })
  }

  const handleDateChange = (field, value) => {
    onChange({
      ...filters,
      dateRange: { ...filters.dateRange, [field]: value },
    })
  }

  const handleRemoveChip = (filterName, value) => {
    if (filterName === "dateRange") {
      onChange({
        ...filters,
        dateRange: { start: null, end: null },
      })
      return
    }

    const current = filters[filterName] || []
    onChange({
      ...filters,
      [filterName]: current.filter((item) => item !== value),
    })
  }

  const containerRef = useRef(null)

  const toggleExpanded = (section) => {
    setExpanded((prev) => {
      const newExpanded = {}
      newExpanded[section] = !prev[section]
      return newExpanded
    })
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setExpanded({})
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const hasActiveFilters = Object.values(filters).some((f) => {
    if (Array.isArray(f)) return f.length > 0
    if (typeof f === "object") return f.start || f.end
    return false
  })

  const filterConfig = [
    { key: "region", label: "Customer Region", options: filterOptions.region },
    { key: "gender", label: "Gender", options: filterOptions.gender },
    { key: "ageRange", label: "Age Range", options: filterOptions.ageRange },
    { key: "category", label: "Product Category", options: filterOptions.category },
    { key: "tags", label: "Tags", options: filterOptions.tags },
    { key: "paymentMethod", label: "Payment Method", options: filterOptions.paymentMethod },
    { key: "dateRange", label: "Date", isDateRange: true },
  ]

  const activeChips = [
    ...filters.region.map((val) => ({ label: `Region: ${val}`, key: `region-${val}`, remove: () => handleRemoveChip("region", val) })),
    ...filters.gender.map((val) => ({ label: `Gender: ${val}`, key: `gender-${val}`, remove: () => handleRemoveChip("gender", val) })),
    ...filters.ageRange.map((val) => ({ label: `Age: ${val}`, key: `age-${val}`, remove: () => handleRemoveChip("ageRange", val) })),
    ...filters.category.map((val) => ({ label: `Category: ${val}`, key: `cat-${val}`, remove: () => handleRemoveChip("category", val) })),
    ...filters.tags.map((val) => ({ label: `Tag: ${val}`, key: `tag-${val}`, remove: () => handleRemoveChip("tags", val) })),
    ...filters.paymentMethod.map((val) => ({ label: `Payment: ${val}`, key: `pay-${val}`, remove: () => handleRemoveChip("paymentMethod", val) })),
  ]

  if (filters.dateRange.start || filters.dateRange.end) {
    const from = filters.dateRange.start || "..."
    const to = filters.dateRange.end || "..."
    activeChips.push({
      label: `Date: ${from} to ${to}`,
      key: `date-${from}-${to}`,
      remove: () => handleRemoveChip("dateRange"),
    })
  }

  return (
    <div ref={containerRef}>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1 px-3 py-2 text-sm text-slate-700 bg-gray-200 hover:bg-white font-medium transition cursor-pointer rounded-lg border border-gray-300"
          title="Reset filters"
        >
          <RotateCcw size={14} />
        </button>
        {filterConfig.map((filter) => (
          <div key={filter.key} className="relative">
            <button
              onClick={() => toggleExpanded(filter.key)}
              className="inline-flex items-center gap-1 px-3 py-2 bg-gray-200 border border-gray-300 rounded-lg hover:bg-white text-sm text-gray-700 font-medium transition cursor-pointer"
            >
              <span>{filter.label}</span>
              <ChevronDown size={14} className={`transition-transform ${expanded[filter.key] ? "rotate-180" : ""}`} />
            </button>

            {expanded[filter.key] && (
              <div className="absolute top-full mt-1 left-0 bg-white border border-gray-300 rounded-lg shadow-lg z-20 min-w-48">
                {filter.isDateRange ? (
                  <div className="p-3 space-y-2">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">From</label>
                      <input
                        type="date"
                        value={filters.dateRange.start}
                        onChange={(e) => handleDateChange("start", e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">To</label>
                      <input
                        type="date"
                        value={filters.dateRange.end}
                        onChange={(e) => handleDateChange("end", e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-2 space-y-2 max-h-48 overflow-y-auto">
                    {filter.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 cursor-pointer px-2 py-1.5 hover:bg-gray-50 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={filters[filter.key].includes(option)}
                          onChange={() => handleToggleFilter(filter.key, option)}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded-full text-slate-700"
            >
              <span>{chip.label}</span>
              <button
                onClick={chip.remove}
                className="text-slate-500 hover:text-slate-700 font-semibold leading-none cursor-pointer"
                aria-label={`Remove ${chip.label}`}
                
              >
                x
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
