import Link from 'next/link';
import { connectDB } from "@/src/lib/mongodb";
import { MaintenanceModel } from "@/src/models/Maintenance";

async function getMaintenances() {
  await connectDB();
  const maintenances = await MaintenanceModel.find({}).populate('device room gadget');
  return maintenances;
}

export default async function MaintenancesPage() {
  const maintenances = await getMaintenances();

  const getAsset = (maintenance: any) => {
    if (maintenance.device) return maintenance.device;
    if (maintenance.room) return maintenance.room;
    if (maintenance.gadget) return maintenance.gadget;
    return null;
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Maintenances</h1>
        <Link href="/maintenances/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
          Create Maintenance
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Asset
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {Array.isArray(maintenances) && maintenances.map((maintenance: any) => {
              const asset = getAsset(maintenance);
              const maintenanceId = maintenance._id?.toString() || maintenance.id;
              return (
                <tr key={maintenanceId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {asset ? asset.name : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {maintenance.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(maintenance.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/maintenances/${maintenanceId}/edit`} className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
