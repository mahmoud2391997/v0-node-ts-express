'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateMaintenancePage() {
  const [assetType, setAssetType] = useState('device');
  const [assetId, setAssetId] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [devices, setDevices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [gadgets, setGadgets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAssets = async () => {
      const [devicesRes, roomsRes, gadgetsRes] = await Promise.all([
        fetch(`/api/devices`),
        fetch(`/api/rooms`),
        fetch(`/api/gadgets`)
      ]);

      if (devicesRes.ok) {
        const data = await devicesRes.json();
        setDevices(data.devices);
      }

      if (roomsRes.ok) {
        const data = await roomsRes.json();
        setRooms(data.rooms);
      }

      if (gadgetsRes.ok) {
        const data = await gadgetsRes.json();
        setGadgets(data.gadgets);
      }
    };
    fetchAssets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!assetId) {
      alert('Please select an asset.');
      return;
    }

    const newMaintenance: any = {
      description,
      status,
      date,
    };

    if (assetType === 'device') {
      newMaintenance.device = assetId;
    } else if (assetType === 'room') {
      newMaintenance.room = assetId;
    } else if (assetType === 'gadget') {
      newMaintenance.gadget = assetId;
    }

    const res = await fetch(`/api/maintenances`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMaintenance),
    });

    if (res.ok) {
      router.push('/maintenances');
    } else {
      const error = await res.json();
      console.error('Error creating maintenance:', error);
      alert(`Failed to create maintenance: ${error.error}`);
    }
  };

  let assets: any[] = [];
  if (assetType === 'device') {
    assets = devices;
  } else if (assetType === 'room') {
    assets = rooms;
  } else if (assetType === 'gadget') {
    assets = gadgets;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Create Maintenance</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <div className="mb-4">
          <label htmlFor="assetType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Asset Type</label>
          <select
            id="assetType"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="device">Device</option>
            <option value="room">Room</option>
            <option value="gadget">Gadget</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="assetId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Asset</label>
          <select
            id="assetId"
            value={assetId}
            onChange={(e) => setAssetId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select a {assetType}</option>
            {assets.map((asset: any) => {
              const assetId = asset._id || asset.id;
              return <option key={assetId} value={assetId}>{asset.name}</option>;
            })}
          </select>
        </div>

        <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
            <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
            />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
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
