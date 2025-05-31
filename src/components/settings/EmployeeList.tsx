import React, { useState } from 'react';
import { Employee } from '../../utils/types';
import { PlusIcon, SearchIcon, EditIcon, TrashIcon } from 'lucide-react';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';
const mockEmployees: Employee[] = [{
  id: 'EMP001',
  name: 'Alex Johnson',
  department: 'Engineering',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  active: true,
  joinDate: '2023-01-15'
}];
const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const handleAddEmployee = (employeeData: Employee) => {
    setEmployees([...employees, employeeData]);
  };
  const handleDeleteEmployee = (employeeId: string) => {
    setEmployees(employees.filter(emp => emp.id !== employeeId));
  };
  const handleEditEmployee = (employeeData: Employee) => {
    setEmployees(employees.map(emp => emp.id === employeeData.id ? employeeData : emp));
    setEditingEmployee(null);
  };
  const filteredEmployees = employees.filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()) || emp.id.toLowerCase().includes(search.toLowerCase()) || emp.department.toLowerCase().includes(search.toLowerCase()));
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Employees
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center" onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Employee
        </button>
      </div>
      <AddEmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddEmployee} />
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input type="text" placeholder="Search employees..." className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Department
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
            {filteredEmployees.map(employee => <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full" src={employee.photo} alt={employee.name} />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {employee.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {employee.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {employee.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                    {employee.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3" onClick={() => setEditingEmployee(employee)}>
                    <EditIcon className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDeleteEmployee(employee.id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      {editingEmployee && <EditEmployeeModal isOpen={true} onClose={() => setEditingEmployee(null)} onSubmit={handleEditEmployee} employee={editingEmployee} />}
    </div>;
};
export default EmployeeList;