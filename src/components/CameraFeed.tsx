import React, { useEffect, useState, useRef } from 'react';
import { CameraIcon, RefreshCwIcon } from 'lucide-react';
import { loadModels, detectFace, verifyLiveness, drawFaceDetection } from '../utils/faceDetection';
const CameraFeed = ({
  status,
  onStartRecognition
}) => {
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  useEffect(() => {
    loadModels().catch(console.error);
  }, []);
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user'
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please make sure you have granted camera permissions.');
    }
  };
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };
  useEffect(() => {
    let animationFrame: number;
    const updateCanvas = async () => {
      if (videoRef.current && canvasRef.current && cameraActive) {
        await drawFaceDetection(videoRef.current, canvasRef.current);
        animationFrame = requestAnimationFrame(updateCanvas);
      }
    };
    if (cameraActive) {
      updateCanvas();
    }
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [cameraActive]);
  return <div className="relative">
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
        {!cameraActive ? <div className="absolute inset-0 flex flex-col items-center justify-center">
            <CameraIcon className="h-12 w-12 text-gray-400 mb-2" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg" onClick={startCamera}>
              Start Camera
            </button>
            <p className="text-gray-500 mt-2 text-sm">Camera access required</p>
          </div> : <>
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" onPlay={() => {
          if (videoRef.current) {
            const {
              videoWidth,
              videoHeight
            } = videoRef.current;
            if (canvasRef.current) {
              canvasRef.current.width = videoWidth;
              canvasRef.current.height = videoHeight;
            }
          }
        }} />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <div className={`absolute inset-0 ${status === 'scanning' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
              <div className="w-full h-1 bg-blue-500 animate-scan" />
            </div>
            {/* Status indicators */}
            {status === 'success' && <div className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full animate-pulse">
                <div className="h-3 w-3" />
              </div>}
            {status === 'error' && <div className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full animate-pulse">
                <div className="h-3 w-3" />
              </div>}
            {status === 'spoofing' && <div className="absolute top-2 right-2 bg-yellow-500 text-white p-2 rounded-full animate-pulse">
                <div className="h-3 w-3" />
              </div>}
          </>}
      </div>
      <div className="mt-4 flex justify-between">
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded flex items-center" onClick={stopCamera}>
          <RefreshCwIcon className="h-4 w-4 mr-2" />
          Reset Camera
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={onStartRecognition} disabled={!cameraActive || status === 'scanning'}>
          {status === 'scanning' ? 'Scanning...' : 'Start Recognition'}
        </button>
      </div>
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>;
};
export default CameraFeed;