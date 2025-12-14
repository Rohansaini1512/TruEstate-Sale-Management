import { Info } from "lucide-react"

export default function KPICards({ kpis }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount || 0)
  }

  const cards = [
    {
      title: "Total units sold",
      value: kpis.totalUnits,
      info: true,
    },
    {
      title: "Total Amount",
      value: formatCurrency(kpis.totalAmount),
      info: true,
      percentage: "(19.5%)",
    },
    {
      title: "Total Discount",
      value: formatCurrency(kpis.totalDiscount),
      info: true,
      percentage: "(45.8%)",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <p className="text-xs text-gray-600 font-medium">{card.title}</p>
                {card.info && <Info size={14} className="text-gray-400" />}
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              {card.percentage && <p className="text-xs text-gray-500 mt-1">{card.percentage}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
