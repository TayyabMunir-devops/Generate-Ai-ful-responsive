import logger from '../utils/logger.js';
import { AppError } from '../middleware/errorHandler.js';

class OllamaService {
  constructor() {
    this.baseUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
    this.model = process.env.OLLAMA_MODEL || 'llama3';
    this.timeout = parseInt(process.env.OLLAMA_TIMEOUT || '30000', 10);
  }

  /**
   * Check Ollama health
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.statusText}`);
      }

      const data = await response.json();
      logger.info('✓ Ollama service is healthy');
      return {
        healthy: true,
        models: data.models?.map(m => m.name) || [],
        activeModel: this.model,
      };
    } catch (error) {
      logger.error(`✗ Ollama health check failed: ${error.message}`);
      return {
        healthy: false,
        error: error.message,
      };
    }
  }

  /**
   * Stream chat response from Ollama
   */
  async streamChat(messages, onChunk) {
    try {
      logger.info(`Streaming chat with model: ${this.model}`);

      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.model,
          messages,
          stream: true,
        }),
        signal: AbortSignal.timeout(this.timeout),
      });

      if (!response.ok) {
        const errorText = await response.text();
        logger.error(`Ollama error: ${response.status} - ${errorText}`);
        throw new AppError(
          `Ollama service error: ${response.statusText}`,
          response.status
        );
      }

      if (!response.body) {
        throw new AppError('No response body from Ollama', 500);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.trim()) {
            try {
              const json = JSON.parse(line);
              const text = json?.message?.content;

              if (text) {
                onChunk(text);
              }

              if (json?.done) {
                logger.info('Chat streaming completed');
              }
            } catch (parseError) {
              logger.debug(`Failed to parse line: ${line}`);
            }
          }
        }
      }

      // Process remaining buffer
      if (buffer.trim()) {
        try {
          const json = JSON.parse(buffer);
          const text = json?.message?.content;
          if (text) {
            onChunk(text);
          }
        } catch (parseError) {
          logger.debug(`Failed to parse final buffer: ${buffer}`);
        }
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error(`Streaming error: ${error.message}`);
      throw new AppError(`Streaming failed: ${error.message}`, 500);
    }
  }
}

export default new OllamaService();
