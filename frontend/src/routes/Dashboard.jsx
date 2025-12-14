"use client"

import { useState, useEffect } from "react"
import FilterPanel from "../components/Filters"
import SortDropdown from "../components/SortDropdown"
import TransactionTable from "../components/TransactionTable"
import Pagination from "../components/Pagination"
import KPICards from "../components/KPICards"
import SearchBar from "../components/SearchBar"
import { fetchTransactions } from "../services/api"

export default function Dashboard({ searchTerm, setSearchTerm }) {
  const [paginatedData, setPaginatedData] = useState([])
  const [serverMeta, setServerMeta] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Search and Filter State
  const [filters, setFilters] = useState({
    region: [],
    gender: [],
    ageRange: [],
    category: [],
    tags: [],
    paymentMethod: [],
    dateRange: { start: null, end: null },
  })
  const [sortBy, setSortBy] = useState("customerName")
  const [sortOrder, setSortOrder] = useState("desc")

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Fetch data whenever page, search, filters, or sort changes
  useEffect(() => {
    loadTransactions()
  }, [currentPage, searchTerm, filters, sortBy, sortOrder])

  const loadTransactions = async () => {
    try {
      setLoading(true)
      
      // Build query params for server-side filtering and pagination
      const params = {
        page: currentPage,
        pageSize: itemsPerPage,
        sortBy: sortBy,
        sortOrder: sortOrder,
      }

      // Add search
      if (searchTerm) {
        params.search = searchTerm
      }

      // Add filters
      if (filters.region.length > 0) params.region = filters.region.join(",")
      if (filters.gender.length > 0) params.gender = filters.gender.join(",")
      if (filters.category.length > 0) params.category = filters.category.join(",")
      if (filters.paymentMethod.length > 0) params.paymentMethod = filters.paymentMethod.join(",")
      if (filters.tags.length > 0) params.tags = filters.tags.join(",")

      // Age ranges (multi-select)
      if (filters.ageRange.length > 0) params.ageRanges = filters.ageRange.join(",")

      // Date range
      if (filters.dateRange.start) {
        params.dateFrom = filters.dateRange.start
      }
      if (filters.dateRange.end) {
        params.dateTo = filters.dateRange.end
      }

      const { data, meta } = await fetchTransactions(params)
      setPaginatedData(data)
      setServerMeta(meta)
      setError(null)
    } catch (err) {
      setError("Failed to load transactions")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const kpis = {
    totalUnits: paginatedData.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0),
    totalAmount: paginatedData.reduce((sum, item) => sum + (Number(item.totalAmount) || 0), 0),
    totalDiscount: paginatedData.reduce((sum, item) => {
      const amt = Number(item.totalAmount) || 0
      const discPct = Number(item.discountPercentage) || 0
      return sum + (amt * discPct) / 100
    }, 0),
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleClearFilters = () => {
    setFilters({
      region: [],
      gender: [],
      ageRange: [],
      category: [],
      tags: [],
      paymentMethod: [],
      dateRange: { start: null, end: null },
    })
    setCurrentPage(1) // Reset to first page when clearing filters
  }

  if (loading) {
    return <div className="flex items-center justify-center h-96 text-gray-500">Loading...</div>
  }

  const totalPages = serverMeta?.totalPages || 1
  const totalRecords = serverMeta?.totalRecords || 0
  const showingFrom = totalRecords === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const showingTo = Math.min(currentPage * itemsPerPage, totalRecords)

  return (
    <div className="space-y-6 w-full">
      

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <FilterPanel filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} />
          <SortDropdown
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={(newSort, newOrder) => {
              setSortBy(newSort)
              setSortOrder(newOrder)
              setCurrentPage(1) // Reset page when sort changes
            }}
          />
        </div>
      </div>

      {/* KPI Cards */}
      <KPICards kpis={kpis} />

      
      {/* Transaction Table */}
      {paginatedData.length > 0 ? (
        <>
          <TransactionTable data={paginatedData} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          {error ? error : "No transactions found. Try adjusting your filters or search."}
        </div>
      )}
    </div>
  )
}
