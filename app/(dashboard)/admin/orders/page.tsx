'use client'

import { useState } from 'react'
import AdminSidebar from '@/components/Admin/Sidebar'

export default function AdminOrdersPage() {
  const [orders] = useState([
    { id: 'ORD-001', customer: 'John Doe', amount: '$49.00', status: 'Completed', payment: 'Stripe', date: '2024-01-15' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: '$79.00', status: 'Completed', payment: 'PayPal', date: '2024-01-14' },
    { id: 'ORD-003', customer: 'Bob Johnson', amount: '$59.00', status: 'Processing', payment: 'Stripe', date: '2024-01-14' },
    { id: 'ORD-004', customer: 'Alice Williams', amount: '$39.00', status: 'Pending', payment: 'PayPal', date: '2024-01-13' },
    { id: 'ORD-005', customer: 'Charlie Brown', amount: '$69.00', status: 'Completed', payment: 'Stripe', date: '2024-01-13' },
    { id: 'ORD-006', customer: 'Diana Prince', amount: '$128.00', status: 'Completed', payment: 'Stripe', date: '2024-01-12' },
  ])

  const [filterStatus, setFilterStatus] = useState('all')

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter((o) => o.status === filterStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-600'
      case 'Processing':
        return 'bg-yellow-600'
      case 'Pending':
        return 'bg-gray-600'
      default:
        return 'bg-gray-600'
    }
  }

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 ml-64 bg-black min-h-screen">
        {/* Header */}
        <div className="bg-gray-950 border-b border-gray-800 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold">Orders</h1>
            <p className="text-gray-400">Manage customer orders</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="mb-6 flex gap-4">
              {['all', 'Completed', 'Processing', 'Pending'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded transition ${
                    filterStatus === status
                      ? 'bg-lime-300 text-black font-semibold'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {status === 'all' ? 'All Orders' : status}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="card overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-800">
                  <tr>
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Payment</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-800">
                      <td className="py-3 px-4 font-semibold text-lime-300">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4 font-semibold">{order.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`${getStatusColor(order.status)} px-3 py-1 rounded text-xs font-semibold text-white`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{order.payment}</td>
                      <td className="py-3 px-4 text-gray-400">{order.date}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-400 hover:text-blue-300">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
