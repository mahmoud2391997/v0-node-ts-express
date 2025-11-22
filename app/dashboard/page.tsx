
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    {
      label: 'Total Rooms',
      value: '0',
      icon: '🏠',
      color: 'bg-blue-500',
      href: '/rooms',
    },
    {
      label: 'Active Bookings',
      value: '0',
      icon: '📅',
      color: 'bg-green-500',
      href: '/bookings',
    },
    {
      label: 'Smart Devices',
      value: '0',
      icon: '🔌',
      color: 'bg-purple-500',
      href: '/devices',
    },
    {
      label: 'Gadgets',
      value: '0',
      icon: '⚙️',
      color: 'bg-orange-500',
      href: '/gadgets',
    },
    {
      label: 'Users',
      value: '0',
      icon: '👥',
      color: 'bg-pink-500',
      href: '/users',
    },
    {
      label: 'Pending Maintenance',
      value: '0',
      icon: '🔧',
      color: 'bg-red-500',
      href: '/maintenances',
    },
  ]);

  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [roomsRes, bookingsRes, devicesRes, gadgetsRes, usersRes, maintenancesRes, auditsRes] = await Promise.all([
        fetch('/api/rooms'),
        fetch('/api/bookings'),
        fetch('/api/devices'),
        fetch('/api/gadgets'),
        fetch('/api/users'),
        fetch('/api/maintenances'),
        fetch('/api/audits?limit=5'),
      ]);

      const [rooms, bookings, devices, gadgets, users, maintenances, audits] = await Promise.all([
        roomsRes.json(),
        bookingsRes.json(),
        devicesRes.json(),
        gadgetsRes.json(),
        usersRes.json(),
        maintenancesRes.json(),
        auditsRes.json(),
      ]);

      setStats([
        { ...stats[0], value: rooms.rooms.length },
        { ...stats[1], value: bookings.bookings.length },
        { ...stats[2], value: devices.devices.length },
        { ...stats[3], value: gadgets.gadgets.length },
        { ...stats[4], value: users.users.length },
        { ...stats[5], value: maintenances.maintenances.length },
      ]);

      setRecentActivities(audits.audits);
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Smart Room Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening in your smart room system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} rounded-lg p-4 text-white text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Activities
            </h2>
            <Link
              href="/audits"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.entity}
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-500 whitespace-nowrap ml-4">
                  {new Date(activity.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/rooms/create"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition"
            >
              + Create Room
            </Link>
            <Link
              href="/bookings/create"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg text-center transition"
            >
              + Book Room
            </Link>
            <Link
              href="/users/create"
              className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg text-center transition"
            >
              + Add User
            </Link>
            <Link
              href="/devices/create"
              className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg text-center transition"
            >
              + Add Device
            </Link>
          </div>
        </div>
      </div>
      <footer className="text-center text-gray-500 dark:text-gray-400 mt-8">
        © 2025 Smart Room Management System
      </footer>
    </div>
  );
}
