
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MaintenancesPage() {
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    async function getMaintenances() {
      const res = await fetch('/api/maintenances');
      if (!res.ok) {
        console.error('Failed to fetch maintenances');
        return;
      }
      const data = await res.json();
      setMaintenances(data.maintenances);
    }
    getMaintenances();
  }, []);

  const handleDelete = async (maintenanceId: string) => {
    const res = await fetch(`/api/maintenances/${maintenanceId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setMaintenances(maintenances.filter((maintenance: any) => (maintenance._id || maintenance.id) !== maintenanceId));
    } else {
      console.error('Failed to delete maintenance');
    }
  };

  const getAsset = (maintenance: any) => {
    if (maintenance.device) return maintenance.device;
    if (maintenance.room) return maintenance.room;
    if (maintenance.gadget) return maintenance.gadget;
    return null;
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Maintenances</h1>
        <Link href="/maintenances/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
          Create Maintenance
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Asset
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {Array.isArray(maintenances) && maintenances.map((maintenance: any) => {
              const asset = getAsset(maintenance);
              const maintenanceId = maintenance._id?.toString() || maintenance.id;
              return (
                <tr key={maintenanceId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {asset ? asset.name : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {maintenance.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(maintenance.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/maintenances/${maintenanceId}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(maintenanceId)} className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
