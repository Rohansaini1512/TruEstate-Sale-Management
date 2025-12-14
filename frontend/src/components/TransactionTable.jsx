"use client"

import { Copy } from "lucide-react"
import { useState } from "react"

export default function TransactionTable({ data }) {
  const [copiedId, setCopiedId] = useState(null)

  const copyToClipboard = (text) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopiedId(text)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const columns = [
    { key: "transactionId", label: "Transaction ID", width: "10%" },
    { key: "date", label: "Date", width: "8%" },
    { key: "customerId", label: "Customer ID", width: "10%" },
    { key: "customerName", label: "Customer Name", width: "11%" },
    { key: "phoneNumber", label: "Phone Number", width: "12%" },
    { key: "gender", label: "Gender", width: "7%" },
    { key: "age", label: "Age", width: "6%" },
    { key: "productCategory", label: "Product Category", width: "10%" },
    { key: "quantity", label: "Quantity", width: "7%" },
    { key: "totalAmount", label: "Total Amount", width: "10%" },
    { key: "customerRegion", label: "Customer Region", width: "9%" },
    { key: "productId", label: "Product ID", width: "10%" },
    { key: "employeeName", label: "Employee Name", width: "11%" },
  ]

  const formatDate = (dateValue) => {
    if (!dateValue) return "-"
    const d = typeof dateValue === "string" ? new Date(dateValue) : dateValue
    if (Number.isNaN(d.getTime())) return "-"
    return d.toISOString().split("T")[0]
  }

  const formatPhoneNumber = (phone) => {
    if (!phone) return "-"
    return phone.includes("+") ? phone : `+91${phone}`
  }

  const formatAmount = (value) => {
    const n = Number(value)
    if (Number.isNaN(n)) return "-"
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[960px] text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className="px-4 py-3 text-left font-semibold text-gray-700 text-xs tracking-tight"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                {columns.map((col) => {
                  let cellValue = row[col.key]

                  if (col.key === "date") {
                    cellValue = formatDate(cellValue)
                  } else if (col.key === "phoneNumber") {
                    cellValue = formatPhoneNumber(cellValue)
                  } else if (col.key === "totalAmount") {
                    cellValue = formatAmount(cellValue)
                  }

                  return (
                    <td key={`${idx}-${col.key}`} style={{ width: col.width }} className="px-4 py-3 text-gray-800">
                      {col.key === "phoneNumber" ? (
                        <div className="flex items-center gap-2">
                          <span>{cellValue || "-"}</span>
                          {row[col.key] && (
                            <button
                              onClick={() => copyToClipboard(row[col.key])}
                              className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
                              title="Copy phone number"
                            >
                              <Copy size={14} />
                            </button>
                          )}
                        </div>
                      ) : (
                        cellValue || "-"
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
