import React, { useState } from 'react';
import { SaveIcon, RefreshCwIcon, HardDriveIcon, CpuIcon, ThermometerIcon, DatabaseIcon } from 'lucide-react';
const SystemSettings = () => {
  const [settings, setSettings] = useState({
    autoUpdate: true,
    debugMode: false,
    logRetention: 30,
    backupEnabled: true,
    backupInterval: 24
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle saving system settings
    console.log('Saving system settings:', settings);
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          System Settings
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center" onClick={() => console.log('Check for updates')}>
          <RefreshCwIcon className="h-4 w-4 mr-2" />
          Check for Updates
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            System Status
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CpuIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">
                  CPU Usage
                </span>
              </div>
              <span className="text-gray-900 dark:text-white">32%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ThermometerIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">
                  Temperature
                </span>
              </div>
              <span className="text-gray-900 dark:text-white">45°C</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <HardDriveIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">
                  Storage
                </span>
              </div>
              <span className="text-gray-900 dark:text-white">
                23.5 GB free
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DatabaseIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">
                  Database Size
                </span>
              </div>
              <span className="text-gray-900 dark:text-white">156 MB</span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            System Configuration
          </h2>
          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" checked={settings.autoUpdate} onChange={e => setSettings({
                ...settings,
                autoUpdate: e.target.checked
              })} />
                <span className="ml-2 text-gray-700 dark:text-gray-200">
                  Enable automatic updates
                </span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" checked={settings.debugMode} onChange={e => setSettings({
                ...settings,
                debugMode: e.target.checked
              })} />
                <span className="ml-2 text-gray-700 dark:text-gray-200">
                  Debug mode
                </span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Log Retention (days)
              </label>
              <input type="number" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:text-white" value={settings.logRetention} onChange={e => setSettings({
              ...settings,
              logRetention: parseInt(e.target.value)
            })} min="1" max="365" />
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" checked={settings.backupEnabled} onChange={e => setSettings({
                ...settings,
                backupEnabled: e.target.checked
              })} />
                <span className="ml-2 text-gray-700 dark:text-gray-200">
                  Enable automatic backups
                </span>
              </label>
            </div>
            {settings.backupEnabled && <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Backup Interval (hours)
                </label>
                <input type="number" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:text-white" value={settings.backupInterval} onChange={e => setSettings({
              ...settings,
              backupInterval: parseInt(e.target.value)
            })} min="1" max="168" />
              </div>}
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center">
              <SaveIcon className="h-4 w-4 mr-2" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default SystemSettings;