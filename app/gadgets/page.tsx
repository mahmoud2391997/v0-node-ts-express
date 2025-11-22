
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GadgetsPage() {
  const [gadgets, setGadgets] = useState([]);

  useEffect(() => {
    async function getGadgets() {
      const res = await fetch('/api/gadgets');
      if (!res.ok) {
        console.error('Failed to fetch gadgets');
        return;
      }
      const data = await res.json();
      setGadgets(data.gadgets);
    }
    getGadgets();
  }, []);

  const handleDelete = async (gadgetId: string) => {
    const res = await fetch(`/api/gadgets/${gadgetId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setGadgets(gadgets.filter((gadget: any) => gadget.id !== gadgetId));
    } else {
      console.error('Failed to delete gadget');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Gadgets</h1>
        <Link href="/gadgets/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
          Create Gadget
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {Array.isArray(gadgets) && gadgets.map((gadget: any) => (
              <tr key={gadget.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {gadget.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {gadget.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {gadget.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {gadget.assignedTo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/gadgets/${gadget.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(gadget.id)} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
