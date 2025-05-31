import React, { useState } from 'react';
import { SaveIcon, HardDriveIcon, CpuIcon, ThermometerIcon, DatabaseIcon, GraduationCapIcon, StethoscopeIcon, HardHatIcon, LandmarkIcon, SlidersIcon, CameraIcon, BrainIcon, ZapIcon, LanguagesIcon, MicroscopeIcon, SparklesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../utils/i18n';
const SystemSettings = () => {
  const {
    language,
    setLanguage,
    t
  } = useLanguage();
  const [settings, setSettings] = useState({
    autoUpdate: true,
    debugMode: false,
    logRetention: 30,
    backupEnabled: true,
    backupInterval: 24,
    faceDetectionThreshold: 0.85,
    cameraResolution: '1080p',
    detectionSpeed: 'balanced',
    colorTone: 'natural',
    enhancedLighting: true,
    motionSensitivity: 0.7,
    // AI Features
    aiFeatures: {
      enhancedRecognition: true,
      multiPersonDetection: true,
      emotionDetection: false,
      ageEstimation: false,
      maskDetection: true,
      antispoofing: true,
      behaviorAnalysis: false
    },
    // AI Performance
    aiPerformance: {
      modelOptimization: 'balanced',
      processingUnit: 'auto',
      batchProcessing: false,
      confidenceThreshold: 0.85
    },
    // Language
    language: 'en',
    autoTranslate: false
  });
  const industries = [{
    id: 'school',
    name: 'School & College',
    icon: GraduationCapIcon,
    path: '/settings/industry/school'
  }, {
    id: 'hospital',
    name: 'Hospital & Clinic',
    icon: StethoscopeIcon,
    path: '/settings/industry/hospital'
  }, {
    id: 'government',
    name: 'Government',
    icon: LandmarkIcon,
    path: '/settings/industry/government'
  }, {
    id: 'construction',
    name: 'Construction',
    icon: HardHatIcon,
    path: '/settings/industry/construction'
  }];
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
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Status Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <CpuIcon className="h-5 w-5 mr-2 text-indigo-600" />
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
                  Database
                </span>
              </div>
              <span className="text-gray-900 dark:text-white">156 MB</span>
            </div>
          </div>
        </div>
        {/* Camera Settings Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <CameraIcon className="h-5 w-5 mr-2 text-indigo-600" />
            Camera Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Detection Threshold
              </label>
              <input type="range" min="0" max="1" step="0.05" value={settings.faceDetectionThreshold} onChange={e => setSettings({
              ...settings,
              faceDetectionThreshold: parseFloat(e.target.value)
            })} className="w-full mt-1" />
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {(settings.faceDetectionThreshold * 100).toFixed(0)}% accuracy
                required
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Resolution
              </label>
              <select value={settings.cameraResolution} onChange={e => setSettings({
              ...settings,
              cameraResolution: e.target.value
            })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <option value="720p">HD (720p)</option>
                <option value="1080p">Full HD (1080p)</option>
                <option value="1440p">2K (1440p)</option>
                <option value="2160p">4K (2160p)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Color Tone
              </label>
              <select value={settings.colorTone} onChange={e => setSettings({
              ...settings,
              colorTone: e.target.value
            })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <option value="natural">Natural</option>
                <option value="vivid">Vivid</option>
                <option value="grayscale">Grayscale</option>
                <option value="high-contrast">High Contrast</option>
              </select>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" checked={settings.enhancedLighting} onChange={e => setSettings({
                ...settings,
                enhancedLighting: e.target.checked
              })} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Enhanced Lighting
                </span>
              </label>
            </div>
          </div>
        </div>
        {/* Special Features Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <SlidersIcon className="h-5 w-5 mr-2 text-indigo-600" />
            Special Features
          </h2>
          <div className="grid gap-4">
            {industries.map(industry => {
            const Icon = industry.icon;
            return <Link key={industry.id} to={industry.path} className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Icon className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {industry.name}
                  </span>
                </Link>;
          })}
          </div>
        </div>
        {/* AI Features Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <BrainIcon className="h-5 w-5 mr-2 text-indigo-600" />
            AI Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(settings.aiFeatures).map(([feature, enabled]) => <div key={feature} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <SparklesIcon className="h-5 w-5 text-indigo-600 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={enabled} onChange={e => setSettings({
                ...settings,
                aiFeatures: {
                  ...settings.aiFeatures,
                  [feature]: e.target.checked
                }
              })} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>)}
          </div>
        </div>
        {/* AI Performance Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <ZapIcon className="h-5 w-5 mr-2 text-indigo-600" />
            AI Performance
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Model Optimization
              </label>
              <select value={settings.aiPerformance.modelOptimization} onChange={e => setSettings({
              ...settings,
              aiPerformance: {
                ...settings.aiPerformance,
                modelOptimization: e.target.value
              }
            })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <option value="speed">Speed Priority</option>
                <option value="balanced">Balanced</option>
                <option value="accuracy">Accuracy Priority</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Processing Unit
              </label>
              <select value={settings.aiPerformance.processingUnit} onChange={e => setSettings({
              ...settings,
              aiPerformance: {
                ...settings.aiPerformance,
                processingUnit: e.target.value
              }
            })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <option value="auto">Auto-detect</option>
                <option value="cpu">CPU Only</option>
                <option value="gpu">GPU Priority</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confidence Threshold
              </label>
              <input type="range" min="0" max="1" step="0.05" value={settings.aiPerformance.confidenceThreshold} onChange={e => setSettings({
              ...settings,
              aiPerformance: {
                ...settings.aiPerformance,
                confidenceThreshold: parseFloat(e.target.value)
              }
            })} className="w-full mt-1" />
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {(settings.aiPerformance.confidenceThreshold * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
        {/* Language Settings Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <LanguagesIcon className="h-5 w-5 mr-2 text-indigo-600" />
            Language Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Interface Language
              </label>
              <select value={settings.language} onChange={e => {
              setSettings({
                ...settings,
                language: e.target.value
              });
              setLanguage(e.target.value as any);
            }} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="hi">हिन्दी</option>
                <option value="zh">中文</option>
              </select>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" checked={settings.autoTranslate} onChange={e => setSettings({
                ...settings,
                autoTranslate: e.target.checked
              })} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Auto-translate employee names and departments
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center">
          <SaveIcon className="h-4 w-4 mr-2" />
          Save Settings
        </button>
      </div>
    </div>;
};
export default SystemSettings;