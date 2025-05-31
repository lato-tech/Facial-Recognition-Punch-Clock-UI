import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EmployeeList from '../components/settings/EmployeeList';
import AttendanceLogs from '../components/settings/AttendanceLogs';
import CameraSettings from '../components/settings/CameraSettings';
import ERPNextSettings from '../components/settings/ERPNextSettings';
import SystemSettings from '../components/settings/SystemSettings';
import FaceRegistration from '../components/settings/FaceRegistration';
import IndustrySettings from '../components/settings/IndustrySettings';
// Update industry-specific imports with correct paths
import SchoolSettings from '../components/settings/industries/SchoolSettings';
import HospitalSettings from '../components/settings/industries/HospitalSettings';
import GovernmentSettings from '../components/settings/industries/GovernmentSettings';
import ConstructionSettings from '../components/settings/industries/ConstructionSettings';
const Settings = () => {
  return <div className="p-6">
      <Routes>
        <Route path="employees" element={<EmployeeList />} />
        <Route path="face-registration" element={<FaceRegistration />} />
        <Route path="logs" element={<AttendanceLogs />} />
        <Route path="camera" element={<CameraSettings />} />
        <Route path="erpnext" element={<ERPNextSettings />} />
        <Route path="system" element={<SystemSettings />} />
        <Route path="industry" element={<IndustrySettings />}>
          <Route path="school" element={<SchoolSettings />} />
          <Route path="hospital" element={<HospitalSettings />} />
          <Route path="government" element={<GovernmentSettings />} />
          <Route path="construction" element={<ConstructionSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="employees" replace />} />
      </Routes>
    </div>;
};
export default Settings;