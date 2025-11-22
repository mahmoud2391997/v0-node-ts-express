
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Room, RoomStatus } from '@/src/types';

export default function EditRoomPage() {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchRoom = async () => {
        try {
          const res = await fetch(`/api/rooms/${id}`);
          if (res.ok) {
            const data = await res.json();
            setRoom(data);
          } else {
            console.error("Failed to fetch room");
            setRoom(null);
          }
        } catch (error) {
          console.error("Error fetching room:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchRoom();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!room) return;

    const updatedRoom = {
      ...room,
      capacity: parseInt(room.capacity.toString(), 10),
      floor: parseInt(room.floor.toString(), 10),
    };

    const res = await fetch(`/api/rooms/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRoom),
    });

    if (res.ok) {
      router.push('/rooms');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => (prevRoom ? { ...prevRoom, [name]: value } : null));
  };

  if (loading) {
    return <div className="container mx-auto p-8 text-center">Loading...</div>;
  }

  if (!room) {
    return <div className="container mx-auto p-8 text-center">Room not found.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Edit Room</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={room.name || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <select
            id="status"
            name="status"
            value={room.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {Object.values(RoomStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={room.capacity || 0}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="floor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Floor</label>
          <input
            type="number"
            id="floor"
            name="floor"
            value={room.floor || 0}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
