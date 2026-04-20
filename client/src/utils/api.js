import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      return Promise.reject(new Error('Too many requests. Please wait a moment.'));
    }
    if (error.response?.status === 500) {
      return Promise.reject(new Error('Server error. Please try again later.'));
    }
    if (!error.response && error.message === 'Network Error') {
      return Promise.reject(new Error('Cannot connect to server. Make sure the backend is running.'));
    }
    return Promise.reject(error);
  }
);

/**
 * Chat Service
 */
export const chatService = {
  /**
   * Stream chat response
   * @param {Array} messages - Chat messages
   * @param {Function} onChunk - Callback for each streamed chunk
   */
  async streamChat(messages, onChunk) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || `Server error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        if (chunk && onChunk) {
          onChunk(chunk);
        }
      }
    } catch (error) {
      throw error;
    }
  },

  /**
   * Check server health
   */
  async checkHealth() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Failed to check server health');
    }
  },
};

export default apiClient;
