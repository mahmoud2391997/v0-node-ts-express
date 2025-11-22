
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditBookingPage() {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchBooking = async () => {
        try {
          const res = await fetch(`/api/bookings/${id}`);
          if (res.ok) {
            const data = await res.json();
            setBooking(data);
          } else {
            console.error("Failed to fetch booking");
            setBooking(null);
          }
        } catch (error) {
          console.error("Error fetching booking:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBooking();
    }

    async function fetchUsers() {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    }
    async function fetchRooms() {
      const res = await fetch('/api/rooms');
      if (res.ok) {
        const data = await res.json();
        setRooms(data.rooms);
      }
    }
    fetchUsers();
    fetchRooms();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;

    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    });

    if (res.ok) {
      router.push('/bookings');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBooking((prevBooking: any) => (prevBooking ? { ...prevBooking, [name]: value } : null));
  };

  if (loading) {
    return <div className="container mx-auto p-8 text-center">Loading...</div>;
  }

  if (!booking) {
    return <div className="container mx-auto p-8 text-center">Booking not found.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Edit Booking</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <div className="mb-4">
          <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Room</label>
          <select
            id="roomId"
            name="roomId"
            value={booking.roomId || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select a room</option>
            {rooms.map((room: any) => (
              <option key={room.id} value={room.id}>{room.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">User</label>
          <select
            id="userId"
            name="userId"
            value={booking.userId || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select a user</option>
            {users.map((user: any) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Time</label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={booking.startTime ? new Date(booking.startTime).toISOString().slice(0, 16) : ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Time</label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={booking.endTime ? new Date(booking.endTime).toISOString().slice(0, 16) : ''}
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
