import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, SettingsIcon, UsersIcon, ClockIcon, SunIcon, MoonIcon, CameraIcon, ServerIcon, BuildingIcon, GraduationCapIcon, StethoscopeIcon, HardHatIcon } from 'lucide-react';
import { useTheme } from '../../utils/theme';
const Sidebar = () => {
  const location = useLocation();
  const {
    theme,
    toggleTheme
  } = useTheme();
  const menuItems = [{
    path: '/',
    icon: HomeIcon,
    label: 'Home'
  }, {
    path: '/settings/employees',
    icon: UsersIcon,
    label: 'Employees'
  }, {
    path: '/settings/logs',
    icon: ClockIcon,
    label: 'Attendance Logs'
  }, {
    path: '/settings/camera',
    icon: CameraIcon,
    label: 'Camera Setup'
  }, {
    path: '/settings/erpnext',
    icon: ServerIcon,
    label: 'ERPNext Config'
  }, {
    path: '/settings/system',
    icon: SettingsIcon,
    label: 'System Settings'
  }];
  return <div className="w-64 min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 text-white flex flex-col">
      <div className="p-6 border-b border-indigo-700">
        <h1 className="text-2xl font-bold">Face it!</h1>
        <p className="text-sm text-indigo-200 mt-1">v1.0</p>
      </div>
      <nav className="mt-6 flex-1">
        {menuItems.map(item => <Link key={item.path} to={item.path} className={`flex items-center px-6 py-3 text-indigo-100 hover:bg-indigo-700 transition-colors ${location.pathname === item.path ? 'bg-indigo-700' : ''}`}>
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </Link>)}
      </nav>
      <div className="p-4 border-t border-indigo-700 bg-indigo-900">
        <a href="https://www.getlato.com" target="_blank" rel="noopener noreferrer" className="block text-xs text-indigo-200 hover:text-white transition-colors mb-3">
          <p>Powered by</p>
          <p className="font-semibold">Lato Technologies</p>
        </a>
        <button onClick={toggleTheme} className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-800 hover:bg-indigo-700 text-indigo-100 transition-colors">
          {theme === 'light' ? <>
              <MoonIcon className="h-4 w-4 mr-2" />
              Dark Mode
            </> : <>
              <SunIcon className="h-4 w-4 mr-2" />
              Light Mode
            </>}
        </button>
      </div>
    </div>;
};
export default Sidebar;