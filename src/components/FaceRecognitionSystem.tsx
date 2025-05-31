import React, { useEffect, useState } from 'react';
import CameraFeed from './CameraFeed';
import RecognitionStatus from './RecognitionStatus';
import UserInterface from './UserInterface';
import { checkIn } from '../utils/api';
import { detectFace, verifyLiveness } from '../utils/faceDetection';
import { ClockIcon, CheckCircleIcon, XCircleIcon, UserIcon } from 'lucide-react';
const FaceRecognitionSystem = () => {
  const [status, setStatus] = useState('waiting'); // waiting, scanning, success, error, spoofing
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('Please position your face in the frame');
  const [isCheckIn, setIsCheckIn] = useState(true);
  const [lastAction, setLastAction] = useState(null);
  // Simulate face detection process when camera is active
  const handleStartRecognition = () => {
    setStatus('scanning');
    setMessage('Scanning face...');
    // Simulate processing time
    setTimeout(() => {
      const faceDetected = detectFace();
      if (!faceDetected) {
        setStatus('error');
        setMessage('No face detected. Please try again.');
        return;
      }
      const isReal = verifyLiveness();
      if (!isReal) {
        setStatus('spoofing');
        setMessage('Liveness check failed. Please use a real face.');
        return;
      }
      // Simulate successful recognition
      const userData = {
        id: 'EMP001',
        name: 'Alex Johnson',
        department: 'Engineering',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
      };
      setUser(userData);
      setStatus('success');
      // Send attendance data to ERPNext
      checkIn(userData.id, isCheckIn).then(response => {
        setLastAction({
          type: isCheckIn ? 'check-in' : 'check-out',
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString()
        });
        setMessage(isCheckIn ? 'Check-in successful! Have a great day.' : 'Check-out successful! See you tomorrow.');
        // Reset after 5 seconds
        setTimeout(() => {
          setStatus('waiting');
          setUser(null);
          setMessage('Please position your face in the frame');
        }, 5000);
      });
    }, 2000);
  };
  const toggleCheckInMode = () => {
    setIsCheckIn(!isCheckIn);
  };
  return <div className="max-w-4xl mx-auto p-4 pt-8">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Face Recognition Attendance System
        </h1>
        <p className="text-gray-600">
          Secure biometric attendance tracking for ERPNext
        </p>
      </header>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4">
            <CameraFeed status={status} onStartRecognition={handleStartRecognition} />
          </div>
          <div className="p-4 bg-gray-50">
            <RecognitionStatus status={status} message={message} user={user} lastAction={lastAction} />
            <UserInterface isCheckIn={isCheckIn} toggleCheckInMode={toggleCheckInMode} status={status} />
          </div>
        </div>
        <div className="p-4 bg-gray-800 text-white text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-2" />
              <span>System Status: Active</span>
            </div>
            <div>
              <span className="text-green-400">Connected to ERPNext</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default FaceRecognitionSystem;