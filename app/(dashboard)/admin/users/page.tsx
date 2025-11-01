'use client'

import { useState } from 'react'
import AdminSidebar from '@/components/Admin/Sidebar'

export default function AdminUsersPage() {
  const [users] = useState([
    { id: 1, email: 'john@example.com', name: 'John Doe', purchases: 2, spent: '$128.00', status: 'Active', joined: '2024-01-01' },
    { id: 2, email: 'jane@example.com', name: 'Jane Smith', purchases: 1, spent: '$79.00', status: 'Active', joined: '2024-01-05' },
    { id: 3, email: 'bob@example.com', name: 'Bob Johnson', purchases: 3, spent: '$187.00', status: 'Active', joined: '2023-12-15' },
    { id: 4, email: 'alice@example.com', name: 'Alice Williams', purchases: 0, spent: '$0.00', status: 'Inactive', joined: '2023-11-20' },
    { id: 5, email: 'charlie@example.com', name: 'Charlie Brown', purchases: 5, spent: '$345.00', status: 'Active', joined: '2023-10-10' },
  ])

  const [searchQuery, setSearchQuery] = useState('')

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 ml-64 bg-black min-h-screen">
        {/* Header */}
        <div className="bg-gray-950 border-b border-gray-800 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold">Users</h1>
            <p className="text-gray-400">Manage customer accounts</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Table */}
            <div className="card overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-800">
                  <tr>
                    <th className="text-left py-3 px-4">User ID</th>
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Purchases</th>
                    <th className="text-left py-3 px-4">Total Spent</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Joined</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-800">
                      <td className="py-3 px-4 text-gray-400">#{user.id}</td>
                      <td className="py-3 px-4 font-semibold">{user.name}</td>
                      <td className="py-3 px-4 text-gray-400">{user.email}</td>
                      <td className="py-3 px-4">{user.purchases}</td>
                      <td className="py-3 px-4 text-lime-300 font-semibold">{user.spent}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded text-xs font-semibold ${
                          user.status === 'Active' ? 'bg-green-600' : 'bg-gray-600'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{user.joined}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="text-blue-400 hover:text-blue-300">View</button>
                          <button className="text-yellow-400 hover:text-yellow-300">Edit</button>
                        </div>
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
