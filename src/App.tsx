import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FaceRecognitionSystem from './components/FaceRecognitionSystem';
import Settings from './pages/Settings';
import Sidebar from './components/layout/Sidebar';
import { ThemeProvider } from './utils/theme';
export function App() {
  return <ThemeProvider>
      <BrowserRouter>
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex">
          <Sidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<FaceRecognitionSystem />} />
              <Route path="/settings/*" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>;
}