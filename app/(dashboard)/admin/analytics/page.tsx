'use client'

import AdminSidebar from '@/components/Admin/Sidebar'

export default function AdminAnalyticsPage() {
  const monthlyData = [
    { month: 'Jan', revenue: 8000, orders: 24 },
    { month: 'Feb', revenue: 12000, orders: 36 },
    { month: 'Mar', revenue: 15000, orders: 45 },
    { month: 'Apr', revenue: 18000, orders: 54 },
    { month: 'May', revenue: 22000, orders: 66 },
    { month: 'Jun', revenue: 25000, orders: 75 },
  ]

  const productPerformance = [
    { name: 'React E-Commerce', sales: 245, revenue: '$12,005' },
    { name: 'Next.js SaaS', sales: 198, revenue: '$15,642' },
    { name: 'Nest API', sales: 112, revenue: '$6,608' },
    { name: 'WordPress Blog', sales: 156, revenue: '$6,084' },
  ]

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 ml-64 bg-black min-h-screen">
        {/* Header */}
        <div className="bg-gray-950 border-b border-gray-800 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold">Analytics</h1>
            <p className="text-gray-400">View your business metrics</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Revenue Chart */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Revenue Trend</h2>
              <div className="h-64 flex items-end gap-2 mb-4">
                {monthlyData.map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-800 rounded-t" style={{
                      height: `${(data.revenue / maxRevenue) * 200}px`,
                      backgroundColor: '#BFFF00'
                    }}></div>
                    <span className="text-xs text-gray-400">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Total Revenue: $100,000</span>
                <span>Average: $16,667</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Orders Chart */}
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Orders Over Time</h2>
                <div className="space-y-2">
                  {monthlyData.map((data, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm">{data.month}</span>
                      <div className="flex-1 mx-4 bg-gray-800 rounded h-2 overflow-hidden">
                        <div
                          className="bg-lime-300 h-full transition-all"
                          style={{ width: `${(data.orders / 75) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">{data.orders}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion Metrics */}
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Key Metrics</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Conversion Rate', value: '3.5%' },
                    { label: 'Avg Order Value', value: '$65.42' },
                    { label: 'Customer Satisfaction', value: '4.8/5' },
                    { label: 'Refund Rate', value: '2.1%' },
                  ].map((metric, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-900 rounded">
                      <span className="text-gray-300">{metric.label}</span>
                      <span className="font-bold text-lime-300">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Performance */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Product Performance</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-800">
                    <tr>
                      <th className="text-left py-3 px-4">Product Name</th>
                      <th className="text-left py-3 px-4">Sales</th>
                      <th className="text-left py-3 px-4">Revenue</th>
                      <th className="text-left py-3 px-4">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productPerformance.map((product, idx) => (
                      <tr key={idx} className="border-b border-gray-800">
                        <td className="py-3 px-4 font-semibold">{product.name}</td>
                        <td className="py-3 px-4">{product.sales}</td>
                        <td className="py-3 px-4 text-lime-300 font-semibold">{product.revenue}</td>
                        <td className="py-3 px-4 text-green-400">↑ 12%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Customer Acquisition */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Customer Acquisition</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'New Customers', value: '156', icon: '👤' },
                  { label: 'Returning Customers', value: '342', icon: '🔄' },
                  { label: 'Repeat Purchase Rate', value: '45%', icon: '📈' },
                  { label: 'Churn Rate', value: '5%', icon: '📉' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-900 rounded text-center">
                    <span className="text-2xl block mb-2">{item.icon}</span>
                    <p className="text-gray-400 text-sm mb-1">{item.label}</p>
                    <p className="font-bold text-xl text-lime-300">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
