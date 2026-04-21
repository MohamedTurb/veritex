import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import TestingDashboard from './pages/TestingDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<TestingDashboard />} />
          <Route path="*" element={<TestingDashboard />} />
        </Routes>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'font-medium text-sm',
            duration: 3000,
            style: { borderRadius: '12px', padding: '12px 16px' },
          }}
        />
      </ThemeProvider>
    </BrowserRouter>
  );
}
