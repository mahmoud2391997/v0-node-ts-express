
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateBookingPage() {
  const [roomId, setRoomId] = useState('');
  const [userId, setUserId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBooking = {
      roomId,
      userId,
      startTime,
      endTime,
    };

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBooking),
    });

    if (res.ok) {
      router.push('/bookings');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Create Booking</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <div className="mb-4">
          <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Room</label>
          <select
            id="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
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
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Time</label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
