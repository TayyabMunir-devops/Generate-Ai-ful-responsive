import logger from '../utils/logger.js';
import { AppError } from './errorHandler.js';

/**
 * Validate chat messages
 */
export const validateChatMessages = (req, res, next) => {
  const { messages } = req.body;

  if (!messages) {
    logger.warn('Chat request missing messages field');
    throw new AppError('Messages field is required', 400);
  }

  if (!Array.isArray(messages)) {
    logger.warn('Chat messages is not an array');
    throw new AppError('Messages must be an array', 400);
  }

  if (messages.length === 0) {
    logger.warn('Chat messages array is empty');
    throw new AppError('Messages array cannot be empty', 400);
  }

  // Validate message structure
  for (const msg of messages) {
    if (!msg.role || !msg.content) {
      logger.warn('Invalid message structure');
      throw new AppError('Each message must have role and content', 400);
    }

    if (!['user', 'assistant', 'system'].includes(msg.role)) {
      logger.warn(`Invalid message role: ${msg.role}`);
      throw new AppError('Invalid message role', 400);
    }

    if (typeof msg.content !== 'string') {
      logger.warn('Message content is not a string');
      throw new AppError('Message content must be a string', 400);
    }

    if (msg.content.length > 10000) {
      logger.warn('Message content exceeds max length');
      throw new AppError('Message content exceeds maximum length (10000)', 400);
    }
  }

  next();
};

/**
 * Request logging middleware
 */
export const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.http(
      `${req.method} ${req.path} - Status: ${res.statusCode} - Duration: ${duration}ms`
    );
  });

  next();
};
