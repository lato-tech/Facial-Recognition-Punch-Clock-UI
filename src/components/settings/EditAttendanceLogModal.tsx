import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { AttendanceLog } from '../../utils/types';
interface EditAttendanceLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (logData: AttendanceLog) => void;
  log: AttendanceLog;
}
const EditAttendanceLogModal = ({
  isOpen,
  onClose,
  onSubmit,
  log
}: EditAttendanceLogModalProps) => {
  const [formData, setFormData] = useState({
    ...log,
    modified: {
      by: 'Admin',
      reason: '',
      originalTimestamp: log.timestamp
    }
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: 'modified'
    });
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Edit Attendance Log
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Employee
            </label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={`${formData.employeeName} (${formData.employeeId})`} disabled />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Type
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.type} onChange={e => setFormData({
            ...formData,
            type: e.target.value as 'check-in' | 'check-out'
          })}>
              <option value="check-in">Check In</option>
              <option value="check-out">Check Out</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Timestamp
            </label>
            <input type="datetime-local" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.timestamp.slice(0, 16)} onChange={e => setFormData({
            ...formData,
            timestamp: e.target.value
          })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Modification Reason
            </label>
            <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.modified?.reason || ''} onChange={e => setFormData({
            ...formData,
            modified: {
              ...formData.modified!,
              reason: e.target.value
            }
          })} required rows={3} />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default EditAttendanceLogModal;