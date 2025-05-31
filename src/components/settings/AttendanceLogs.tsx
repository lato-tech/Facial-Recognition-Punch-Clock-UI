import React, { useState } from 'react';
import { AttendanceLog } from '../../utils/types';
import { SearchIcon, EditIcon, AlertCircleIcon } from 'lucide-react';
import EditAttendanceLogModal from './EditAttendanceLogModal';
const mockLogs: AttendanceLog[] = [{
  id: 'LOG001',
  employeeId: 'EMP001',
  employeeName: 'Alex Johnson',
  type: 'check-in',
  timestamp: '2024-01-15T09:00:00',
  status: 'valid'
}, {
  id: 'LOG002',
  employeeId: 'EMP001',
  employeeName: 'Alex Johnson',
  type: 'check-out',
  timestamp: '2024-01-15T17:00:00',
  status: 'modified',
  modified: {
    by: 'Admin',
    reason: 'System error correction',
    originalTimestamp: '2024-01-15T16:55:00'
  }
}];
const AttendanceLogs = () => {
  const [logs, setLogs] = useState<AttendanceLog[]>(mockLogs);
  const [search, setSearch] = useState('');
  const [editingLog, setEditingLog] = useState<AttendanceLog | null>(null);
  const handleEditLog = (logData: AttendanceLog) => {
    setLogs(logs.map(log => log.id === logData.id ? logData : log));
    setEditingLog(null);
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Attendance Logs
        </h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input type="text" placeholder="Search logs..." className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {logs.map(log => <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {log.employeeName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {log.employeeId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {log.type === 'check-in' ? 'Check In' : 'Check Out'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.status === 'valid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3" onClick={() => setEditingLog(log)}>
                      <EditIcon className="h-4 w-4" />
                    </button>
                    {log.status === 'modified' && <button className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300">
                        <AlertCircleIcon className="h-4 w-4" />
                      </button>}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {editingLog && <EditAttendanceLogModal isOpen={true} onClose={() => setEditingLog(null)} onSubmit={handleEditLog} log={editingLog} />}
    </div>;
};
export default AttendanceLogs;