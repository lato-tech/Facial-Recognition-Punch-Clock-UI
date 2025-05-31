import React, { useState } from 'react';
import { ERPNextConfig } from '../../utils/types';
import { SaveIcon, RefreshCwIcon } from 'lucide-react';
const ERPNextSettings = () => {
  const [config, setConfig] = useState<ERPNextConfig>({
    url: 'https://erp.company.com',
    apiKey: '',
    secretKey: '',
    company: 'Your Company',
    syncInterval: 5
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle saving ERPNext configuration
    console.log('Saving ERPNext config:', config);
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          ERPNext Configuration
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center" onClick={() => console.log('Test connection')}>
          <RefreshCwIcon className="h-4 w-4 mr-2" />
          Test Connection
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                ERPNext Server URL
              </label>
              <input type="url" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:text-white" value={config.url} onChange={e => setConfig({
              ...config,
              url: e.target.value
            })} placeholder="https://erp.company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                API Key
              </label>
              <input type="text" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:text-white" value={config.apiKey} onChange={e => setConfig({
              ...config,
              apiKey: e.target.value
            })} placeholder="Enter API key" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                API Secret
              </label>
              <input type="password" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:text-white" value={config.secretKey} onChange={e => setConfig({
              ...config,
              secretKey: e.target.value
            })} placeholder="Enter API secret" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Company Name
              </label>
              <input type="text" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:text-white" value={config.company} onChange={e => setConfig({
              ...config,
              company: e.target.value
            })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Sync Interval (minutes)
              </label>
              <input type="number" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:text-white" value={config.syncInterval} onChange={e => setConfig({
              ...config,
              syncInterval: parseInt(e.target.value)
            })} min="1" max="60" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <SaveIcon className="h-4 w-4 mr-2" />
            Save Settings
          </button>
        </div>
      </form>
    </div>;
};
export default ERPNextSettings;