# 🚀 Professional ChatGPT Clone

> Enterprise-grade AI chatbot application with Ollama integration, built with React, Express, and modern web technologies.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Development Guide](#development-guide)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Frontend
- **Modern React UI** - Built with React 18 and Vite
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Real-time Streaming** - Chat responses stream in real-time
- **Rich Markdown Support** - Syntax highlighting for code blocks
- **Message Management** - Edit, delete, and copy messages
- **Dark Mode Support** - Automatic theme switching
- **Accessibility** - WCAG 2.1 AA compliant
- **Error Handling** - Graceful error handling with user feedback

### Backend
- **Express.js Server** - Robust and scalable backend
- **Ollama Integration** - Local AI model support
- **Rate Limiting** - Request rate limiting to prevent abuse
- **Security Headers** - Helmet.js for security
- **Error Handling** - Comprehensive error handling middleware
- **Logging** - Winston-based structured logging
- **CORS Support** - Cross-origin resource sharing configured
- **Health Checks** - Server and model health endpoints

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Markdown** - Markdown rendering
- **Highlight.js** - Code syntax highlighting
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Winston** - Logging library
- **Helmet** - Security middleware
- **CORS** - Cross-origin support
- **dotenv** - Environment configuration

### Tools & Services
- **Ollama** - Local AI model server
- **Git** - Version control

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18.0.0 or higher)
   ```bash
   node --version  # Should be v18.0.0+
   ```

2. **npm** (v9.0.0 or higher)
   ```bash
   npm --version  # Should be v9.0.0+
   ```

3. **Ollama** (for AI model)
   - Download from: https://ollama.ai
   - Install and start the Ollama service
   - Pull a model: `ollama pull llama3`

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/professional-chatgpt-clone.git
cd professional-chatgpt-clone
```

### 2. Setup Environment Variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Install Dependencies

**Install all dependencies at once:**
```bash
npm run install-all
```

Or install manually:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=3000
LOG_LEVEL=info

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Ollama Configuration
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3
OLLAMA_TIMEOUT=30000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Vite Frontend Configuration

The frontend is configured in `client/vite.config.js`:
- Development server port: `5173`
- API proxy: `/api` → `http://localhost:3000`

## 🎯 Running the Application

### Prerequisites Check
Before running, ensure:
1. Ollama is installed and running
2. A model is downloaded: `ollama pull llama3`

### Option 1: Run Everything (Recommended)

Terminal 1 - Start Backend:
```bash
npm run dev
# or for production
npm start
```

Terminal 2 - Start Frontend:
```bash
npm run client
```

Then open http://localhost:5173 in your browser.

### Option 2: Run Backend Only
```bash
npm start
```

Access the API at http://localhost:3000/api

### Option 3: Run Frontend Only
```bash
cd client
npm run dev
```

## 📁 Project Structure

```
professional-chatgpt-clone/
├── server/
│   └── src/
│       ├── index.js              # Main server entry point
│       ├── config/               # Configuration files
│       ├── middleware/           # Express middleware
│       │   ├── errorHandler.js   # Error handling
│       │   └── validation.js     # Request validation
│       ├── routes/
│       │   └── chat.js           # Chat routes
│       ├── utils/
│       │   ├── logger.js         # Logging utility
│       │   └── ollama.js         # Ollama integration
│       └── tests/                # Test files
│
├── client/
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── InputBox.jsx
│   │   │   ├── Message.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── context/              # React context
│   │   │   └── ChatContext.jsx
│   │   ├── hooks/                # Custom hooks
│   │   │   └── useChat.js
│   │   ├── styles/               # Global styles
│   │   │   └── globals.css
│   │   ├── utils/                # Utility functions
│   │   │   └── api.js
│   │   ├── App.jsx               # Root component
│   │   └── main.jsx              # Entry point
│   ├── index.html                # HTML template
│   ├── vite.config.js            # Vite configuration
│   └── package.json
│
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── package.json                  # Root package.json
└── README.md                     # This file
```

## 📡 API Documentation

### Health Check
```
GET /api/health
```

Response:
```json
{
  "success": true,
  "server": {
    "status": "operational",
    "uptime": 1234.56,
    "memory": { ... }
  },
  "ollama": {
    "healthy": true,
    "models": ["llama3"],
    "activeModel": "llama3"
  }
}
```

### Chat Endpoint
```
POST /api/chat
Content-Type: application/json

{
  "messages": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Hi there! How can I help?" }
  ]
}
```

Response: Server-Sent Events (Streaming)

## 🔧 Development Guide

### Frontend Development

1. **Hot Module Replacement (HMR)**
   ```bash
   cd client
   npm run dev
   ```

2. **Building for Production**
   ```bash
   cd client
   npm run build
   ```

3. **Preview Production Build**
   ```bash
   cd client
   npm run preview
   ```

### Backend Development

1. **Development Mode (with auto-reload)**
   ```bash
   npm run dev
   ```

2. **Production Mode**
   ```bash
   npm start
   ```

3. **Run Tests**
   ```bash
   npm test
   ```

### Code Quality

**Format Code:**
```bash
npm run format
```

**Lint Code:**
```bash
npm run lint
```

## 🐛 Troubleshooting

### Issue: "Cannot connect to Ollama"

**Solution:**
1. Verify Ollama is running:
   ```bash
   ollama serve  # or use the Ollama app
   ```

2. Check Ollama URL in `.env`:
   ```
   OLLAMA_URL=http://localhost:11434
   ```

3. Verify model is downloaded:
   ```bash
   ollama list
   ```

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Change PORT in .env
PORT=3001

# Or find and kill process using port 3000
lsof -i :3000
kill -9 <PID>
```

### Issue: CORS errors

**Solution:**
1. Check `CORS_ORIGIN` in `.env`:
   ```
   CORS_ORIGIN=http://localhost:5173
   ```

2. Clear browser cache and cookies

3. Restart both servers

### Issue: Frontend won't connect to backend

**Solution:**
1. Ensure backend is running on port 3000
2. Check Vite proxy config in `client/vite.config.js`
3. Verify `CORS_ORIGIN` matches frontend URL
4. Check browser console for specific errors

### Issue: High memory usage

**Solution:**
1. Reduce `OLLAMA_TIMEOUT`
2. Restart Ollama service
3. Check system resources:
   ```bash
   # macOS
   top
   
   # Linux
   htop
   ```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Vite Documentation](https://vitejs.dev)
- [Ollama Documentation](https://github.com/ollama/ollama)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Organization**
- GitHub: [@yourusername](https://github.com/yourusername)

---

## 🙋 Support

For support, email support@example.com or open an issue on GitHub.

## 📊 Project Status

- ✅ MVP Complete
- ✅ Core Features
- ✅ Error Handling
- ✅ Documentation
- 🚧 Advanced Features (In Development)
- 📋 User Authentication (Planned)
- 📋 Conversation History (Planned)
- 📋 Model Selection UI (Planned)

---

**Made with ❤️ by Professional Developers**
