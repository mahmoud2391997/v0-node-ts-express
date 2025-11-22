
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AssociatedGadgetsPopup from '@/components/AssociatedGadgetsPopup';
import AssociatedRoomsPopup from '@/components/AssociatedRoomsPopup';
import AssociatedBookingsPopup from '@/components/AssociatedBookingsPopup';

interface Room {
  id: string;
  name: string;
}

export default function EditDevicePage() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [roomIds, setRoomIds] = useState<string[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState('');
  const [showGadgetsPopup, setShowGadgetsPopup] = useState(false);
  const [showRoomsPopup, setShowRoomsPopup] = useState(false);
  const [showBookingsPopup, setShowBookingsPopup] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetch('/api/rooms');
      const data = await res.json();
      setRooms(data.rooms);
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    async function getDevice() {
      const res = await fetch(`/api/devices/${id}`);
      if (!res.ok) {
        setError('Failed to fetch device');
        return;
      }
      const data = await res.json();
      setName(data.name);
      setType(data.type);
      setStatus(data.status);
      setLocation(data.location);
      setRoomIds(data.roomIds || []);
    }
    if (id) {
      getDevice();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch(`/api/devices/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, type, status, location, roomIds }),
    });

    if (res.ok) {
      router.push('/devices');
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to update device');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Edit Device</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {/* Form fields ... */}
        <div className="flex items-center justify-between mt-8">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Update
          </button>
          <button type="button" onClick={() => setShowGadgetsPopup(true)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Associated Gadgets
          </button>
          <button type="button" onClick={() => setShowRoomsPopup(true)} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Associated Rooms
          </button>
          <button type="button" onClick={() => setShowBookingsPopup(true)} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Associated Bookings
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
        </div>
      </form>
      {showGadgetsPopup && <AssociatedGadgetsPopup deviceId={id} onClose={() => setShowGadgetsPopup(false)} />}
      {showRoomsPopup && <AssociatedRoomsPopup deviceId={id} onClose={() => setShowRoomsPopup(false)} />}
      {showBookingsPopup && <AssociatedBookingsPopup deviceId={id} onClose={() => setShowBookingsPopup(false)} />}
    </div>
  );
}
