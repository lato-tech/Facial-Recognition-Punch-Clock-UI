export interface Employee {
  id: string;
  name: string;
  department: string;
  photo: string;
  active: boolean;
  joinDate: string;
}
export interface AttendanceLog {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'check-in' | 'check-out';
  timestamp: string;
  status: 'valid' | 'modified' | 'error';
  modified?: {
    by: string;
    reason: string;
    originalTimestamp: string;
  };
}
export interface CameraConfig {
  type: 'onvif' | 'raspicam';
  url?: string;
  username?: string;
  password?: string;
  resolution: string;
  fps: number;
}
export interface ERPNextConfig {
  url: string;
  apiKey: string;
  secretKey: string;
  company: string;
  syncInterval: number;
}