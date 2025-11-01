'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      items: 'React E-Commerce',
      total: '$49.00',
      status: 'Completed',
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      items: 'Next.js SaaS',
      total: '$79.00',
      status: 'Completed',
    },
  ]

  const downloads = [
    {
      name: 'React E-Commerce',
      downloadedAt: '2024-01-15',
      expires: '2025-01-15',
    },
    {
      name: 'Next.js SaaS',
      downloadedAt: '2024-01-10',
      expires: '2025-01-10',
    },
  ]

  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card space-y-2 sticky top-24">
              {[
                { id: 'profile', label: 'Profile' },
                { id: 'purchases', label: 'Purchases' },
                { id: 'downloads', label: 'Downloads' },
                { id: 'settings', label: 'Settings' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded transition ${
                    activeTab === tab.id
                      ? 'bg-lime-300 text-black font-semibold'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <button className="w-full text-left px-4 py-3 rounded text-red-500 hover:bg-gray-800 transition mt-4">
                Logout
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="card space-y-6">
                <h2 className="text-2xl font-bold">Profile Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 000-0000"
                    className="input-field"
                  />
                </div>

                <button className="btn-primary">Save Changes</button>
              </div>
            )}

            {/* Purchases Tab */}
            {activeTab === 'purchases' && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Purchase History</h2>

                {orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b border-gray-800">
                        <tr>
                          <th className="text-left py-3 px-2">Order ID</th>
                          <th className="text-left py-3 px-2">Date</th>
                          <th className="text-left py-3 px-2">Items</th>
                          <th className="text-left py-3 px-2">Total</th>
                          <th className="text-left py-3 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-800">
                            <td className="py-3 px-2 font-semibold text-lime-300">
                              {order.id}
                            </td>
                            <td className="py-3 px-2">{order.date}</td>
                            <td className="py-3 px-2">{order.items}</td>
                            <td className="py-3 px-2 font-semibold">{order.total}</td>
                            <td className="py-3 px-2">
                              <span className="bg-green-600 px-3 py-1 rounded text-xs">
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-400">No orders yet</p>
                )}
              </div>
            )}

            {/* Downloads Tab */}
            {activeTab === 'downloads' && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">My Downloads</h2>

                {downloads.length > 0 ? (
                  <div className="space-y-4">
                    {downloads.map((download, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-gray-900 rounded"
                      >
                        <div>
                          <p className="font-semibold">{download.name}</p>
                          <p className="text-gray-400 text-sm">
                            Downloaded: {download.downloadedAt}
                          </p>
                          <p className="text-gray-400 text-sm">
                            Expires: {download.expires}
                          </p>
                        </div>
                        <button className="btn-primary text-sm">Download</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No downloads yet</p>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-bold mb-6">Change Password</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="input-field"
                      />
                    </div>

                    <button className="btn-primary">Update Password</button>
                  </div>
                </div>

                <div className="card">
                  <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>

                  <div className="space-y-3">
                    {[
                      { label: 'Email notifications for new templates' },
                      { label: 'Newsletter updates' },
                      { label: 'Order confirmations' },
                    ].map((pref, idx) => (
                      <label key={idx} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>{pref.label}</span>
                      </label>
                    ))}
                  </div>

                  <button className="btn-primary mt-6">Save Preferences</button>
                </div>

                <div className="card border-red-900 bg-red-950 bg-opacity-20">
                  <h2 className="text-2xl font-bold mb-4 text-red-500">Danger Zone</h2>
                  <p className="text-gray-300 mb-4">
                    Once you delete your account, there is no going back. Be sure.
                  </p>
                  <button className="px-6 py-3 rounded font-semibold border-2 border-red-500 text-red-500 hover:bg-red-950 transition">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
