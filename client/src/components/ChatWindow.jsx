import React, { useEffect, useRef } from 'react';
import { useChat } from '../hooks/useChat';
import Message from './Message';
import './ChatWindow.css';

/**
 * ChatWindow Component
 * Displays chat messages and handles scrolling
 */
export const ChatWindow = () => {
  const { messages, isLoading, error, deleteMessage, editMessage, sendMessage } = useChat();
  const messagesEndRef = useRef(null);
  const [editingIndex, setEditingIndex] = React.useState(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSaveEdit = (index, newContent) => {
    editMessage(index, newContent);
    setEditingIndex(null);

    // If edited message is user message, regenerate assistant response
    if (messages[index].role === 'user' && index === messages.length - 2) {
      // Delete the old assistant response
      if (messages[index + 1]?.role === 'assistant') {
        deleteMessage(index + 1);
      }
      // Send the new message
      sendMessage(newContent);
    }
  };

  return (
    <div className="chat-window">
      {messages.length === 0 ? (
        <div className="chat-window__empty">
          <div className="chat-window__empty-icon">💬</div>
          <h2>Start a Conversation</h2>
          <p>Ask anything and get instant AI responses powered by Ollama</p>
        </div>
      ) : (
        <div className="chat-window__messages">
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <Message
                message={message}
                index={index}
                onDelete={deleteMessage}
                onEdit={() => setEditingIndex(editingIndex === index ? null : index)}
                isEditing={editingIndex === index}
                onSaveEdit={handleSaveEdit}
              />
            </React.Fragment>
          ))}

          {isLoading && (
            <div className="message message--assistant">
              <div className="message__container">
                <div className="message__header">
                  <span className="message__role">🤖 Assistant</span>
                </div>
                <div className="message__content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="chat-window__error">
              <div className="error-icon">⚠️</div>
              <div className="error-message">
                <strong>Error:</strong> {error}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
