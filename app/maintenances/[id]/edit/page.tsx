'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditMaintenancePage() {
  const [maintenance, setMaintenance] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [devices, setDevices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [gadgets, setGadgets] = useState([]);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    let isMounted = true;

    const fetchMaintenanceAndAssets = async () => {
      if (id) {
        try {
          const maintenanceRes = await fetch(`/api/maintenances/${id}`);
          if (!isMounted) return;

          if (maintenanceRes.ok) {
            const maintenanceData = await maintenanceRes.json();
            if (isMounted) setMaintenance(maintenanceData.maintenance);
          } else {
            try {
              const errorData = await maintenanceRes.json();
              if (isMounted) setError(errorData.error || 'Maintenance not found');
            } catch {
              if (isMounted) setError('Maintenance not found');
            }
          }
        } catch (error) {
          console.error('Error fetching maintenance:', error);
          if (isMounted) setError('Failed to load maintenance record');
        }
      }

      const [devicesRes, roomsRes, gadgetsRes] = await Promise.all([
        fetch('/api/devices'),
        fetch('/api/rooms'),
        fetch('/api/gadgets'),
      ]);

      if (isMounted) {
        if (devicesRes.ok) {
          const devicesData = await devicesRes.json();
          setDevices(devicesData.devices);
        }
        if (roomsRes.ok) {
          const roomsData = await roomsRes.json();
          setRooms(roomsData.rooms);
        }
        if (gadgetsRes.ok) {
          const gadgetsData = await gadgetsRes.json();
          setGadgets(gadgetsData.gadgets);
        }
      }
    };

    fetchMaintenanceAndAssets();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateData = {
      description: maintenance.description,
      status: maintenance.status,
      date: maintenance.date,
    };

    const res = await fetch(`/api/maintenances/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (res.ok) {
      router.push('/maintenances');
    } else {
      try {
        const error = await res.json();
        console.error('Error updating maintenance:', error);
        alert(`Failed to update maintenance: ${error.error || 'Unknown error'}`);
      } catch {
        console.error('Error updating maintenance');
        alert('Failed to update maintenance');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMaintenance((prevMaintenance: any) => ({ ...prevMaintenance, [name]: value }));
  };

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-200 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!maintenance) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const assetType = maintenance.device ? 'device' : maintenance.room ? 'room' : 'gadget';
  const getAssetId = () => {
    if (maintenance.device) {
      return maintenance.device.id || maintenance.device._id;
    } else if (maintenance.room) {
      return maintenance.room.id || maintenance.room._id;
    } else if (maintenance.gadget) {
      return maintenance.gadget.id || maintenance.gadget._id;
    }
    return '';
  };
  const assetId = getAssetId();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Edit Maintenance</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <div className="mb-4">
          <label htmlFor="assetType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Asset Type</label>
          <input
            id="assetType"
            type="text"
            value={assetType}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
            disabled
          />
        </div>

        <div className="mb-4">
          <label htmlFor="assetId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Asset</label>
          <input
            id="assetId"
            type="text"
            value={maintenance[assetType]?.name}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
            disabled
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={maintenance.date ? new Date(maintenance.date).toISOString().split('T')[0] : ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            id="description"
            name="description"
            value={maintenance.description}
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
            value={maintenance.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
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
