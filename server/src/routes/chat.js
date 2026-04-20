import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger.js';
import ollamaService from '../utils/ollama.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateChatMessages } from '../middleware/validation.js';

const router = express.Router();

/**
 * POST /api/chat
 * Stream chat response from AI model
 */
router.post(
  '/chat',
  validateChatMessages,
  asyncHandler(async (req, res) => {
    const { messages } = req.body;
    const sessionId = uuidv4();

    logger.info(`[Session: ${sessionId}] Starting chat stream`);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
      await ollamaService.streamChat(messages, (chunk) => {
        if (chunk) {
          res.write(chunk);
        }
      });

      logger.info(`[Session: ${sessionId}] Chat completed successfully`);
      res.end();
    } catch (error) {
      logger.error(`[Session: ${sessionId}] Error: ${error.message}`);
      res.write(`[ERROR] ${error.message}`);
      res.end();
    }
  })
);

/**
 * GET /api/health
 * Check server and Ollama health
 */
router.get(
  '/health',
  asyncHandler(async (req, res) => {
    const ollamaHealth = await ollamaService.checkHealth();

    res.json({
      success: true,
      server: {
        status: 'operational',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
      },
      ollama: ollamaHealth,
      timestamp: new Date().toISOString(),
    });
  })
);

export default router;
