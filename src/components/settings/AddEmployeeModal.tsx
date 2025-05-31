import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { useLanguage } from '../../utils/i18n';
import FaceRegistration from './FaceRegistration';
interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (employeeData: any) => void;
}
const AddEmployeeModal = ({
  isOpen,
  onClose,
  onSubmit
}: AddEmployeeModalProps) => {
  const {
    t
  } = useLanguage();
  const [step, setStep] = useState<'info' | 'face'>('info');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department: '',
    photo: '',
    joinDate: '',
    faceData: null
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      active: true
    });
    onClose();
  };
  const handleFaceCapture = (faceData: any) => {
    setFormData({
      ...formData,
      faceData
    });
    setStep('info');
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {step === 'info' ? t('addEmployee') : t('faceRegistration')}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        {step === 'info' ? <form onSubmit={handleSubmit} className="space-y-4">
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
                Join Date
              </label>
              <input type="date" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={formData.joinDate} onChange={e => setFormData({
            ...formData,
            joinDate: e.target.value
          })} />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button type="button" onClick={() => setStep('face')} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                {t('registerFace')}
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" disabled={!formData.faceData}>
                {t('addEmployee')}
              </button>
            </div>
          </form> : <FaceRegistration onCapture={handleFaceCapture} onCancel={() => setStep('info')} />}
      </div>
    </div>;
};
export default AddEmployeeModal;