import React, { createContext, useCallback, useState, useRef } from 'react';
import { chatService } from '../utils/api';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationId] = useState(() => `conv-${Date.now()}`);
  const abortControllerRef = useRef(null);

  /**
   * Send a message and stream response
   */
  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim()) return;

    setError(null);
    const newUserMessage = { role: 'user', content: userMessage };
    
    // Add user message immediately
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      let assistantMessage = '';

      await chatService.streamChat([...messages, newUserMessage], (chunk) => {
        assistantMessage += chunk;
        // Update the last message (assistant response) as we stream
        setMessages((prev) => {
          const updated = [...prev];
          if (updated[updated.length - 1]?.role === 'assistant') {
            updated[updated.length - 1].content = assistantMessage;
          } else {
            updated.push({ role: 'assistant', content: assistantMessage });
          }
          return updated;
        });
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      
      if (err.name === 'AbortError') {
        setError('Message generation cancelled');
      } else {
        const errorMessage = err.message || 'Failed to get response from AI';
        setError(errorMessage);
        console.error('Chat error:', err);
      }
      
      // Remove the incomplete assistant message on error
      setMessages((prev) => {
        if (prev[prev.length - 1]?.role === 'assistant') {
          return prev.slice(0, -1);
        }
        return prev;
      });
    }
  }, [messages]);

  /**
   * Clear conversation
   */
  const clearConversation = useCallback(() => {
    setMessages([]);
    setError(null);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  /**
   * Stop generation
   */
  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  /**
   * Delete a message
   */
  const deleteMessage = useCallback((index) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  /**
   * Edit a message
   */
  const editMessage = useCallback((index, newContent) => {
    setMessages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], content: newContent };
      return updated;
    });
  }, []);

  const value = {
    messages,
    isLoading,
    error,
    conversationId,
    sendMessage,
    clearConversation,
    stopGeneration,
    deleteMessage,
    editMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};
