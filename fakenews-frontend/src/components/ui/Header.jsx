import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <header className="sticky-top bg-body shadow-sm">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <div className="d-flex align-items-center gap-2">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="rounded-circle"
            style={{ width: '32px', height: '32px' }}
          />
          <h1 className="m-0 fs-5 fw-bold text-body">
            FakeNews Detector
          </h1>
        </div>
        {/* <button 
          onClick={() => setDarkMode(!darkMode)}
          className="btn btn-sm btn-outline-secondary rounded-circle p-2"
        >
          {darkMode ? <FiSun className="text-warning" /> : <FiMoon />}
        </button> */}
      </div>
    </header>
  );
}