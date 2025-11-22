
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getRooms() {
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
      const res = await fetch(`${baseUrl}/api/rooms`);
      if (!res.ok) {
        console.error('Failed to fetch rooms');
        return;
      }
      const data = await res.json();
      setRooms(data.rooms);
    }
    getRooms();
  }, []);

  const handleDelete = async (roomId: string) => {
    if (confirm('Are you sure you want to delete this room?')) {
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
      const res = await fetch(`${baseUrl}/api/rooms/${roomId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setRooms(rooms.filter((room: any) => room.id !== roomId));
      } else {
        console.error('Failed to delete room');
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Rooms</h1>
        <Link href="/rooms/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
          Create Room
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
                Capacity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Floor
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {Array.isArray(rooms) && rooms.map((room: any) => (
              <tr key={room.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {room.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {room.capacity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {room.floor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/rooms/${room.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(room.id)} className="text-red-600 hover:text-red-900">
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
