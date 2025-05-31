import React, { useState } from 'react';
import { CameraConfig } from '../../utils/types';
import { SaveIcon, RefreshCwIcon } from 'lucide-react';
const CameraSettings = () => {
  const [config, setConfig] = useState<CameraConfig>({
    type: 'onvif',
    url: 'rtsp://camera.local:554/stream',
    username: 'admin',
    password: '******',
    resolution: '1920x1080',
    fps: 30
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle saving camera configuration
    console.log('Saving camera config:', config);
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Camera Settings
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
                Camera Type
              </label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" value={config.type} onChange={e => setConfig({
              ...config,
              type: e.target.value as 'onvif' | 'raspicam'
            })}>
                <option value="onvif">ONVIF IP Camera</option>
                <option value="raspicam">Raspberry Pi Camera</option>
              </select>
            </div>
            {config.type === 'onvif' && <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Camera URL
                  </label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:text-white" value={config.url} onChange={e => setConfig({
                ...config,
                url: e.target.value
              })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Username
                  </label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:text-white" value={config.username} onChange={e => setConfig({
                ...config,
                username: e.target.value
              })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Password
                  </label>
                  <input type="password" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:text-white" value={config.password} onChange={e => setConfig({
                ...config,
                password: e.target.value
              })} />
                </div>
              </>}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Resolution
              </label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" value={config.resolution} onChange={e => setConfig({
              ...config,
              resolution: e.target.value
            })}>
                <option value="1920x1080">1920x1080 (FHD)</option>
                <option value="1280x720">1280x720 (HD)</option>
                <option value="640x480">640x480 (VGA)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Frame Rate (FPS)
              </label>
              <input type="number" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 dark:bg-gray-700 dark:text-white" value={config.fps} onChange={e => setConfig({
              ...config,
              fps: parseInt(e.target.value)
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
export default CameraSettings;