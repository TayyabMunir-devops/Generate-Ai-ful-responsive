import React, { useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import './InputBox.css';

/**
 * InputBox Component
 * Handles user input and message submission
 */
export const InputBox = () => {
  const { sendMessage, isLoading, stopGeneration } = useChat();
  const [input, setInput] = React.useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 150) + 'px';
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    // Send on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleStopClick = () => {
    stopGeneration();
  };

  return (
    <div className="input-box">
      <form onSubmit={handleSubmit} className="input-box__form">
        <div className="input-box__input-wrapper">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Ctrl+Enter to send)"
            className="input-box__textarea"
            disabled={isLoading}
            rows={1}
          />
          {isLoading ? (
            <button
              type="button"
              onClick={handleStopClick}
              className="input-box__btn input-box__btn--stop"
              title="Stop generation"
            >
              <span className="btn-icon">⏹️</span>
              <span className="btn-label">Stop</span>
            </button>
          ) : (
            <button
              type="submit"
              className="input-box__btn input-box__btn--send"
              disabled={!input.trim()}
              title="Send message (Ctrl+Enter)"
            >
              <span className="btn-icon">➤</span>
              <span className="btn-label">Send</span>
            </button>
          )}
        </div>
        <div className="input-box__hint">
          {isLoading && <span className="hint-loading">⏳ Waiting for response...</span>}
          {!isLoading && (
            <span className="hint-default">Press <kbd>Ctrl</kbd>+<kbd>↵</kbd> to send</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default InputBox;
