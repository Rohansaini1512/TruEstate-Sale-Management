const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api"

export const fetchTransactions = async (params = {}) => {
  const url = new URL(`${BASE_URL}/sales`)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, value)
    }
  })

  const response = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const json = await response.json()

  // Normalize backend record keys - handle BOTH formats
  const normalizeRecord = (item = {}) => {
    const date = item.date || item.Date ? new Date(item.date || item.Date) : null
    return {
      transactionId: item.productId || item["Product ID"] || item["Transaction ID"] || "-",
      date,
      customerId: item.customerId || item["Customer ID"] || "-",
      customerName: item.customerName || item["Customer Name"] || "-",
      phoneNumber: item.phoneNumber || item["Phone Number"] || "",
      gender: item.gender || item.Gender || "-",
      age: item.age || item.Age || "-",
      productCategory: item.productCategory || item["Product Category"] || "-",
      quantity: item.quantity || item.Quantity || 0,
      customerRegion: item.customerRegion || item["Customer Region"] || "-",
      paymentMethod: item.paymentMethod || item["Payment Method"] || "-",
      totalAmount: item.totalAmount || item["Total Amount"] || item.finalAmount || item["Final Amount"] || 0,
      discountPercentage: item.discountPercentage || item["Discount Percentage"] || 0,
      productId: item.productId || item["Product ID"] || "-",
      employeeName: item.employeeName || item["Employee Name"] || "-",
      raw: item,
    }
  }

  const normalized = (json?.data || []).map(normalizeRecord)

  return {
    data: normalized,
    meta: json?.meta || {
      totalRecords: normalized.length,
      totalPages: 1,
      currentPage: 1,
      pageSize: params.pageSize || 10,
    },
  }
}

export const searchTransactions = async (searchTerm) => fetchTransactions({ search: searchTerm })
export const filterTransactions = async (filters) => fetchTransactions(filters)