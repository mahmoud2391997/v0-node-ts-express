
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Smart Room Management
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Seamlessly manage and monitor your smart rooms with our intuitive platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/rooms" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Rooms</h2>
            <p className="text-gray-600 dark:text-gray-400">View and manage all available rooms.</p>
          </Link>
          <Link href="/bookings" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Bookings</h2>
            <p className="text-gray-600 dark:text-gray-400">Create and manage room bookings.</p>
          </Link>
          <Link href="/users" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Users</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage users and their permissions.</p>
          </Link>
          <Link href="/devices" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Devices</h2>
            <p className="text-gray-600 dark:text-gray-400">Monitor and control smart devices.</p>
          </Link>
          <Link href="/gadgets" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Gadgets</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage and track company gadgets.</p>
          </Link>
          <Link href="/maintenances" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Maintenances</h2>
            <p className="text-gray-600 dark:text-gray-400">Track and schedule maintenance tasks.</p>
          </Link>
          <Link href="/admin/audits" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Audits</h2>
            <p className="text-gray-600 dark:text-gray-400">View audit logs and system events.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
