import React, { useState, useEffect } from 'react';
import { ChatProvider } from './context/ChatContext';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';
import { chatService } from './utils/api';
import './styles/globals.css';
import './App.css';

/**
 * Main App Component
 */
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [serverStatus, setServerStatus] = useState('checking');

  // Check server health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        await chatService.checkHealth();
        setServerStatus('healthy');
      } catch (error) {
        console.error('Server health check failed:', error);
        setServerStatus('unhealthy');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ChatProvider>
      <div className="app">
        {serverStatus === 'unhealthy' && (
          <div className="server-warning">
            <div className="warning-icon">⚠️</div>
            <div className="warning-message">
              <strong>Server Connection Lost</strong>
              <p>Make sure the backend is running on http://localhost:3000</p>
            </div>
          </div>
        )}

        <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />

        <main className="main-content">
          <header className="app-header">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
            <h1 className="app-title">Professional ChatGPT</h1>
            <div className="server-status" title="Server status">
              <span className={`status-indicator status-${serverStatus}`}></span>
              {serverStatus === 'healthy' ? 'Connected' : 'Disconnected'}
            </div>
          </header>

          <ChatWindow />
          <InputBox />
        </main>
      </div>
    </ChatProvider>
  );
}

export default App;
