
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Room {
  id: string;
  name: string;
}

export default function CreateDevicePage() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [roomIds, setRoomIds] = useState<string[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetch('/api/rooms');
      const data = await res.json();
      setRooms(data.rooms);
    };
    fetchRooms();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/devices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, type, status, location, roomIds }),
    });

    if (res.ok) {
      router.push('/devices');
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to create device');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Create Device</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            required
          >
            <option value="">Select a type</option>
            <option value="light">Light</option>
            <option value="ac">AC</option>
            <option value="door_lock">Door Lock</option>
            <option value="sensor">Sensor</option>
            <option value="projector">Projector</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            required
          >
            <option value="">Select a status</option>
            <option value="on">On</option>
            <option value="off">Off</option>
            <option value="error">Error</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rooms" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Rooms</label>
          <select
            id="rooms"
            multiple
            value={roomIds}
            onChange={(e) => setRoomIds(Array.from(e.target.selectedOptions, option => option.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
          >
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>{room.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Create
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
