# 🏗️ Architecture Documentation

Comprehensive technical documentation of the Professional ChatGPT Clone.

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (React + Vite)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              React Components                        │   │
│  │  - Sidebar (Navigation)                             │   │
│  │  - ChatWindow (Message Display)                     │   │
│  │  - InputBox (User Input)                            │   │
│  │  - Message (Single Message Renderer)                │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            ChatContext (State Management)           │   │
│  │  - Messages state                                   │   │
│  │  - Loading state                                    │   │
│  │  - Error handling                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              API Service Layer                       │   │
│  │  - chatService.streamChat()                         │   │
│  │  - chatService.checkHealth()                        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                  SERVER (Express.js)                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │               Request Pipeline                       │   │
│  │  1. Helmet (Security)                               │   │
│  │  2. CORS Middleware                                 │   │
│  │  3. Body Parser                                     │   │
│  │  4. Request Logger                                  │   │
│  │  5. Rate Limiter                                    │   │
│  │  6. Route Handler                                   │   │
│  │  7. Error Handler                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Chat Routes                             │   │
│  │  - POST /api/chat (streaming)                       │   │
│  │  - GET /api/health (status check)                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Ollama Service Layer                      │   │
│  │  - streamChat()                                      │   │
│  │  - checkHealth()                                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓ HTTP
┌─────────────────────────────────────────────────────────────┐
│                   OLLAMA LOCAL SERVER                       │
│              (AI Model - Llama3, etc)                        │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### Chat Message Flow

1. **User Input** → React Component
2. **Send Message** → ChatContext.sendMessage()
3. **API Call** → api.js streamChat()
4. **HTTP Request** → Express Server
5. **Validation** → Middleware validation
6. **Ollama Request** → OllamaService.streamChat()
7. **Stream Response** → Server streams chunks to client
8. **Update State** → ChatContext updates messages
9. **Display** → React re-renders Message components

### Request/Response Lifecycle

```
Client                    Server                Ollama
  │                         │                      │
  ├─POST /api/chat─────────>│                      │
  │                         ├─POST /api/chat──────>│
  │                         │                      │
  │<─Stream chunk 1─────────┤<─Stream chunk 1─────┤
  │<─Stream chunk 2─────────┤<─Stream chunk 2─────┤
  │<─Stream chunk 3─────────┤<─Stream chunk 3─────┤
  │                         │      ...             │
  │<─End stream─────────────┤<─End stream────────┤
  │                         │                      │
```

## 📦 Component Architecture

### Frontend Components

#### App.jsx (Root)
- Manages overall app state
- Server health checking
- Layout orchestration
- Error boundary

#### Sidebar.jsx
- Navigation and controls
- Conversation management
- Model information display
- Tips and guidance

#### ChatWindow.jsx
- Message display container
- Auto-scrolling to latest message
- Empty state handling
- Loading indicator

#### InputBox.jsx
- Textarea with auto-resize
- Message submission
- Stop generation button
- Keyboard shortcuts

#### Message.jsx
- Individual message rendering
- Markdown support with syntax highlighting
- Edit/Delete/Copy actions
- Message metadata

### Backend Routes

#### `/api/chat` (POST)
**Middleware:**
1. `validateChatMessages` - Validates request body
2. `requestLogger` - Logs request details
3. `rateLimiter` - Prevents abuse

**Handler:**
- Streams response from Ollama
- Handles errors gracefully
- Returns Server-Sent Events

#### `/api/health` (GET)
**Returns:**
```json
{
  "success": true,
  "server": { ... },
  "ollama": { ... }
}
```

## 🔐 Security Architecture

### Frontend Security
- **CORS** - Configured to accept requests only from trusted origins
- **Input Validation** - Client-side validation before sending
- **XSS Prevention** - React's built-in XSS protection
- **Error Handling** - Graceful error messages without sensitive info

### Backend Security
- **Helmet.js** - Secure HTTP headers
- **CORS Middleware** - Restricted origin access
- **Rate Limiting** - Prevents DoS attacks
- **Input Validation** - Server-side validation
- **Error Handling** - No stack traces in production
- **Environment Variables** - Sensitive data in .env

### Data Protection
- **No User Data Stored** - Conversations not persisted
- **HTTPS Ready** - Can be deployed with SSL/TLS
- **Memory Isolation** - Each request isolated

## 🗄️ State Management

### Context API (ChatContext)
```javascript
{
  messages: Array,              // All chat messages
  isLoading: Boolean,           // Loading state
  error: String | null,         // Error message
  conversationId: String,       // Session ID
  sendMessage: Function,        // Send message handler
  clearConversation: Function,  // Clear all messages
  stopGeneration: Function,     // Stop streaming
  deleteMessage: Function,      // Delete specific message
  editMessage: Function,        // Edit specific message
}
```

### Local Component State
- **Sidebar**: Open/closed state (UI toggle)
- **InputBox**: Input text value
- **Message**: Edit mode state
- **App**: Server status

## 🔄 API Contract

### Request Format
```javascript
{
  "messages": [
    {
      "role": "user" | "assistant" | "system",
      "content": "string (max 10000 chars)"
    }
  ]
}
```

### Response Format
- Server-Sent Events (text/event-stream)
- Raw text chunks (not JSON)
- Concatenate chunks to build complete response

### Error Responses
```json
{
  "success": false,
  "status": 400,
  "message": "Error description",
  "timestamp": "ISO 8601 timestamp"
}
```

## 🚀 Performance Optimization

### Frontend
- **Code Splitting** - Vite automatic code splitting
- **Lazy Loading** - Components loaded on demand
- **Memoization** - React.memo for expensive components
- **Virtualization** - Could be added for large message lists
- **Caching** - Browser cache for static assets

### Backend
- **Streaming** - Stream responses instead of buffering
- **Connection Pooling** - Reuse connections to Ollama
- **Compression** - gzip compression for responses
- **Timeout Management** - Configurable request timeouts

### Network
- **HTTP/2** - Multiplexing requests
- **Compression** - gzip encoding
- **Caching Headers** - Cache busting for assets
- **CDN Ready** - Can be deployed behind CDN

## 🧪 Testing Architecture

### Unit Tests
```javascript
// test/services/ollama.test.js
// test/middleware/validation.test.js
// test/routes/chat.test.js
```

### Integration Tests
```javascript
// test/api/chat.integration.test.js
```

### E2E Tests (Optional)
- Cypress or Playwright for full flow testing

## 📊 Logging Strategy

### Log Levels
- **error** - Critical errors
- **warn** - Warnings
- **info** - General information
- **http** - HTTP request logging
- **debug** - Debug information

### Log Files
- `logs/error.log` - Errors only
- `logs/all.log` - All log levels

### Log Format
```
YYYY-MM-DD HH:mm:ss:ms LEVEL: message
```

## 🔌 Extension Points

### Adding New Features

#### 1. New API Endpoint
```javascript
// server/src/routes/chat.js
router.post('/new-endpoint', asyncHandler(async (req, res) => {
  // handler logic
}));
```

#### 2. New UI Component
```javascript
// client/src/components/NewComponent.jsx
export const NewComponent = () => {
  return <div>New Component</div>;
};
```

#### 3. New Middleware
```javascript
// server/src/middleware/newMiddleware.js
export const newMiddleware = (req, res, next) => {
  // middleware logic
  next();
};
```

#### 4. New Service
```javascript
// server/src/utils/newService.js
class NewService {
  async doSomething() {
    // service logic
  }
}
export default new NewService();
```

## 🔄 Development Best Practices

### Code Organization
- One component per file
- Shared components in `components/`
- Business logic in `utils/` or `services/`
- Styles in separate `.css` files

### Naming Conventions
- Components: PascalCase (Button.jsx)
- Files: camelCase (utils/api.js)
- Constants: UPPER_SNAKE_CASE
- Selectors: descriptive names

### Error Handling
- Try-catch in async functions
- Error boundary in React
- Winston logging in Node
- User-friendly error messages

### Performance
- Profile with DevTools
- Monitor bundle size
- Test on slower networks
- Optimize database queries

## 📈 Scalability Considerations

### Current Limitations
- Single user (no auth)
- No persistent storage
- No load balancing
- Single Ollama instance

### Future Improvements
- Add user authentication
- Implement conversation persistence
- Load balancing for multiple servers
- Model selection UI
- Conversation history
- Export functionality
- Plugin system

---

**For more details, see specific documentation files.**
