'use client'

import AdminSidebar from '@/components/Admin/Sidebar'
import Link from 'next/link'

export default function AdminDashboard() {
  const stats = [
    { label: "Today's Sales", value: '$2,345', icon: '💰', trend: '+12%' },
    { label: 'Total Revenue', value: '$45,230', icon: '💵', trend: '+8%' },
    { label: 'New Orders', value: '23', icon: '📦', trend: '+5' },
    { label: 'Total Customers', value: '1,234', icon: '👥', trend: '+42' },
  ]

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', amount: '$49.00', status: 'Completed', date: '2024-01-15' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: '$79.00', status: 'Completed', date: '2024-01-14' },
    { id: 'ORD-003', customer: 'Bob Johnson', amount: '$59.00', status: 'Processing', date: '2024-01-14' },
    { id: 'ORD-004', customer: 'Alice Williams', amount: '$39.00', status: 'Pending', date: '2024-01-13' },
    { id: 'ORD-005', customer: 'Charlie Brown', amount: '$69.00', status: 'Completed', date: '2024-01-13' },
  ]

  const topTemplates = [
    { name: 'React E-Commerce', sales: 245, revenue: '$12,005' },
    { name: 'Next.js SaaS', sales: 198, revenue: '$15,642' },
    { name: 'WordPress Blog', sales: 156, revenue: '$6,084' },
  ]

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 ml-64 bg-black min-h-screen">
        {/* Header */}
        <div className="bg-gray-950 border-b border-gray-800 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's your dashboard overview.</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-lime-300 text-sm mt-2">{stat.trend}</p>
                    </div>
                    <span className="text-4xl">{stat.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Orders */}
              <div className="lg:col-span-2">
                <div className="card">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Recent Orders</h2>
                    <Link href="/admin/orders" className="text-lime-300 hover:text-lime-400">
                      View All →
                    </Link>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b border-gray-800">
                        <tr>
                          <th className="text-left py-3">Order ID</th>
                          <th className="text-left py-3">Customer</th>
                          <th className="text-left py-3">Amount</th>
                          <th className="text-left py-3">Status</th>
                          <th className="text-left py-3">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-800">
                            <td className="py-3 font-semibold text-lime-300">{order.id}</td>
                            <td className="py-3">{order.customer}</td>
                            <td className="py-3 font-semibold">{order.amount}</td>
                            <td className="py-3">
                              <span className={`px-3 py-1 rounded text-xs font-semibold ${
                                order.status === 'Completed' ? 'bg-green-600' :
                                order.status === 'Processing' ? 'bg-yellow-600' :
                                'bg-gray-600'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 text-gray-400">{order.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Top Templates */}
              <div>
                <div className="card">
                  <h2 className="text-2xl font-bold mb-6">Top Templates</h2>

                  <div className="space-y-4">
                    {topTemplates.map((template, idx) => (
                      <div key={idx} className="p-4 bg-gray-900 rounded">
                        <p className="font-semibold mb-2">{template.name}</p>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>{template.sales} sales</span>
                          <span className="text-lime-300 font-semibold">{template.revenue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="card mt-6">
                  <h3 className="font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Link href="/admin/products" className="block btn-primary text-center text-sm">
                      Add Product
                    </Link>
                    <Link href="/admin/orders" className="block btn-secondary text-center text-sm">
                      View Orders
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
