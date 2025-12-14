"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const menuItems = [
  { label: "Dashboard", icon: "📊", subItems: [] },
  { label: "Nexus", icon: "🔗", subItems: [] },
  { label: "Intake", icon: "📥", subItems: [] },
  {
    label: "Services",
    icon: "⚙️",
    subItems: [
      { label: "Pre-active", icon: "⏱️" },
      { label: "Active", icon: "✓" },
      { label: "Blocked", icon: "🚫" },
      { label: "Closed", icon: "✕" },
    ],
  },
  { label: "Invoices", icon: "📄", subItems: [] },
  {
    label: "Invoices",
    icon: "📋",
    subItems: [
      { label: "Proforma Invoices", icon: "📄" },
      { label: "Final Invoices", icon: "✓" },
    ],
  },
]

export default function Sidebar({ isOpen, onClose }) {
  const [expandedItems, setExpandedItems] = useState({})

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-48 h-screen bg-gray-100 text-slate-900 overflow-y-auto border-r border-gray-200 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-bold text-white">V</div>
            <span className="font-bold text-base text-slate-900">Vault</span>
          </div>
          <p className="text-xs text-slate-500">Rohan</p>
        </div>

        <nav className="p-2 space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => item.subItems.length > 0 && toggleExpand(index)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-white transition text-sm text-slate-800 cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                {item.subItems.length > 0 && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform text-slate-600 ${expandedItems[index] ? "rotate-180" : ""}`}
                  />
                )}
              </button>

              {expandedItems[index] && item.subItems.length > 0 && (
                <div className="pl-2 space-y-1 mt-1 bg-white rounded-md ml-2 border border-gray-100">
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:text-slate-900 hover:bg-gray-100 rounded-md transition flex items-center gap-2 cursor-pointer"
                    >
                      <span>{subItem.icon}</span>
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
