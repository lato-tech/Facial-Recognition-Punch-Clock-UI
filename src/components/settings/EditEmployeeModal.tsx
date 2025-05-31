import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { Employee } from '../../utils/types';
interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (employeeData: Employee) => void;
  employee: Employee;
}
const EditEmployeeModal = ({
  isOpen,
  onClose,
  onSubmit,
  employee
}: EditEmployeeModalProps) => {
  const [formData, setFormData] = useState(employee);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Edit Employee
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Employee ID
            </label>
            <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.id} onChange={e => setFormData({
            ...formData,
            id: e.target.value
          })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Full Name
            </label>
            <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.name} onChange={e => setFormData({
            ...formData,
            name: e.target.value
          })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Department
            </label>
            <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.department} onChange={e => setFormData({
            ...formData,
            department: e.target.value
          })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Photo URL
            </label>
            <input type="url" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.photo} onChange={e => setFormData({
            ...formData,
            photo: e.target.value
          })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Status
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input type="checkbox" checked={formData.active} onChange={e => setFormData({
                ...formData,
                active: e.target.checked
              })} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-200">
                  Active
                </span>
              </label>
            </div>
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
export default EditEmployeeModal;