
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GadgetType, GadgetStatus } from '@/src/types';

interface User {
  id: string;
  name: string;
}

export default function CreateGadgetPage() {
  const [name, setName] = useState('');
  const [type, setType] = useState<GadgetType |''>('');
  const [status, setStatus] = useState<GadgetStatus |''>('');
  const [assignedTo, setAssignedTo] = useState<string |''>('');
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/gadgets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, type, status, assignedTo }),
    });

    if (res.ok) {
      router.push('/gadgets');
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to create gadget');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Create Gadget</h1>
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
            onChange={(e) => setType(e.target.value as GadgetType)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            required
          >
            <option value="">Select a type</option>
            {Object.values(GadgetType).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as GadgetStatus)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            required
          >
            <option value="">Select a status</option>
            {Object.values(GadgetStatus).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="assignedTo" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Assigned To</label>
          <select
            id="assignedTo"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
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
