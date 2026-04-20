import React from 'react';
import { useChat } from '../hooks/useChat';
import './Sidebar.css';

/**
 * Sidebar Component
 * Navigation and controls
 */
export const Sidebar = ({ isOpen, onToggle }) => {
  const { messages, clearConversation } = useChat();

  const handleClearConversation = () => {
    if (messages.length > 0) {
      if (window.confirm('Are you sure you want to clear the conversation?')) {
        clearConversation();
      }
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="sidebar__overlay"
          onClick={() => onToggle(false)}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <h1 className="sidebar__title">
            <span className="sidebar__icon">💬</span>
            ChatGPT
          </h1>
          <button
            className="sidebar__close"
            onClick={() => onToggle(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <div className="sidebar__content">
          <div className="sidebar__section">
            <h2 className="sidebar__section-title">Conversation</h2>
            <button
              className="sidebar__btn sidebar__btn--primary"
              onClick={handleClearConversation}
              disabled={messages.length === 0}
            >
              <span className="btn-icon">🗑️</span>
              <span>New Conversation</span>
            </button>
          </div>

          <div className="sidebar__section">
            <h3 className="sidebar__section-title">Model Info</h3>
            <div className="sidebar__info">
              <div className="info-item">
                <span className="info-label">Model:</span>
                <span className="info-value">Ollama Llama3</span>
              </div>
              <div className="info-item">
                <span className="info-label">Messages:</span>
                <span className="info-value">{messages.length}</span>
              </div>
            </div>
          </div>

          <div className="sidebar__section">
            <h3 className="sidebar__section-title">Quick Tips</h3>
            <ul className="sidebar__tips">
              <li>💡 Be specific in your questions</li>
              <li>📋 Use code formatting for code snippets</li>
              <li>🔄 Ctrl+Enter to send quickly</li>
              <li>✏️ Edit messages to regenerate responses</li>
            </ul>
          </div>
        </div>

        <div className="sidebar__footer">
          <div className="footer-info">
            <p className="footer-text">
              Professional ChatGPT v1.0.0
            </p>
            <p className="footer-text footer-text--secondary">
              Powered by O My Yes 
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
