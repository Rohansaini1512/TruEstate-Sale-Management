"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import { Menu, X } from "lucide-react"

export default function Layout({ children, searchBar }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="flex-1 md:ml-48 w-full overflow-auto">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 md:px-6 py-4 flex items-center justify-between gap-3 md:gap-4">
            {/* Mobile menu button */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg shrink-0 cursor-pointer">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <h1 className="text-base md:text-xl font-semibold text-gray-900 whitespace-nowrap shrink-0">Sales Management System</h1>

            <div className="flex-1 max-w-lg">{searchBar}</div>
            
           
          </div>
        </div>
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  )
}
