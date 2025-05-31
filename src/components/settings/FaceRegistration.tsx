import React, { useState, useRef } from 'react';
import { CameraIcon, SaveIcon, TrashIcon, UserPlusIcon } from 'lucide-react';
interface FaceData {
  employeeId: string;
  faceDescriptor: Float32Array;
  captureDate: Date;
  angles: string[]; // front, left45, right45
}
const FaceRegistration = () => {
  const [capturing, setCapturing] = useState(false);
  const [currentAngle, setCurrentAngle] = useState<string>('front');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [captures, setCaptures] = useState<FaceData[]>([]);
  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user'
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCapturing(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
  const captureFrame = () => {
    // In a real implementation, this would:
    // 1. Capture the current frame
    // 2. Extract face descriptor using face-api.js
    // 3. Store the face data
    console.log('Capturing frame for angle:', currentAngle);
  };
  const angles = ['front', 'left45', 'right45'];
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Face Registration
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center" onClick={startCapture}>
          <UserPlusIcon className="h-4 w-4 mr-2" />
          New Registration
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Camera Capture</h2>
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
            {!capturing ? <div className="absolute inset-0 flex items-center justify-center">
                <CameraIcon className="h-12 w-12 text-gray-600" />
              </div> : <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />}
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex justify-center space-x-4">
              {angles.map(angle => <button key={angle} className={`px-4 py-2 rounded ${currentAngle === angle ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setCurrentAngle(angle)}>
                  {angle.charAt(0).toUpperCase() + angle.slice(1)}
                </button>)}
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center" onClick={captureFrame} disabled={!capturing}>
              <CameraIcon className="h-4 w-4 mr-2" />
              Capture {currentAngle}
            </button>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Registration Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Employee ID
              </label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" placeholder="Enter Employee ID" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Capture Progress
              </label>
              <div className="mt-2 space-y-2">
                {angles.map(angle => <div key={angle} className="flex items-center justify-between text-sm">
                    <span>
                      {angle.charAt(0).toUpperCase() + angle.slice(1)}
                    </span>
                    <span className="text-green-600">✓ Captured</span>
                  </div>)}
              </div>
            </div>
            <div className="pt-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                <SaveIcon className="h-4 w-4 mr-2" />
                Save Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default FaceRegistration;