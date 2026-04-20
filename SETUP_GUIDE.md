# 🚀 Professional ChatGPT Clone - Setup Guide

Complete step-by-step guide to set up and run the application.

## 📋 Prerequisites

### Required Software
- **Node.js 18+** - [Download](https://nodejs.org)
- **npm 9+** - Usually comes with Node.js
- **Git** - [Download](https://git-scm.com)
- **Ollama** - [Download](https://ollama.ai)

### System Requirements
- **RAM**: 8GB minimum (16GB recommended for models)
- **Disk Space**: 20GB (for AI models)
- **OS**: Windows, macOS, or Linux

## 🔧 Step-by-Step Installation

### Step 1: Install Ollama

1. Download Ollama from https://ollama.ai
2. Install and run the application
3. Open terminal/command prompt and pull a model:
   ```bash
   ollama pull llama3
   ```
4. Verify it's running (you should see output):
   ```bash
   curl http://localhost:11434/api/tags
   ```

### Step 2: Extract and Navigate to Project

```bash
# On Windows
cd C:\Users\YourUsername\path\to\professional-chatgpt-clone

# On macOS/Linux
cd ~/path/to/professional-chatgpt-clone
```

### Step 3: Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit .env file with your preferred editor
# Default values should work fine for local development
```

**Important `.env` settings:**
```env
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3
```

### Step 4: Install Dependencies

```bash
# Install all dependencies (backend + frontend)
npm run install-all

# Or manually:
# Install backend
npm install

# Install frontend
cd client
npm install
cd ..
```

### Step 5: Start the Application

**Option A: Run Both Servers (Recommended for Development)**

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
npm run dev
```
Expected output:
```
═══════════════════════════════════════════
🚀 Professional ChatGPT Clone
═══════════════════════════════════════════
📡 Server running on http://localhost:3000
🔧 Environment: development
🤖 Ollama URL: http://localhost:11434
📦 Model: llama3
═══════════════════════════════════════════
```

**Terminal 2 - Frontend Server:**
```bash
npm run client
```
Expected output:
```
  VITE v5.0.8  ready in 245 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Option B: Run Production Mode**

```bash
# Build frontend
npm run build

# Start server (serves frontend from dist/)
npm start
```

### Step 6: Access the Application

Open your browser and go to:
```
http://localhost:5173
```

You should see the ChatGPT Clone interface!

## ✅ Verification Checklist

Before you start chatting, verify:

- [ ] Ollama is running
- [ ] Model is downloaded (`ollama list` shows llama3)
- [ ] Backend server is running on :3000
- [ ] Frontend server is running on :5173
- [ ] No errors in either terminal
- [ ] Browser shows the chat interface
- [ ] Server status indicator shows "Connected"

## 🧪 Test the Application

1. Type a message: "Hello, how are you?"
2. Press `Ctrl+Enter` (Windows/Linux) or `Cmd+Enter` (macOS)
3. You should see a response streaming in real-time
4. Try different queries to test functionality

## 🐛 Common Setup Issues

### Ollama Not Running
```bash
# Verify Ollama is running
curl http://localhost:11434/api/tags

# If not running, start it
ollama serve
```

### Model Not Downloaded
```bash
# List available models
ollama list

# Download llama3 if missing
ollama pull llama3
```

### Port Already in Use
```bash
# Change port in .env
PORT=3001

# Or kill the process using the port
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### CORS Errors
- Ensure `.env` has: `CORS_ORIGIN=http://localhost:5173`
- Clear browser cache (Ctrl+Shift+Delete)
- Restart both servers

### High Memory Usage
- Reduce `OLLAMA_TIMEOUT` in `.env`
- Close other applications
- Restart Ollama service

## 📊 Monitoring the Application

### Check Server Health
```bash
curl http://localhost:3000/api/health
```

### View Server Logs
Logs are saved in `logs/` directory:
- `logs/all.log` - All logs
- `logs/error.log` - Errors only

### Monitor Resource Usage
```bash
# macOS
top

# Linux
htop

# Windows
taskmgr
```

## 🔄 Development Workflow

### Making Changes

1. **Frontend Changes:**
   - Edit files in `client/src/`
   - Changes hot-reload automatically
   - No restart needed

2. **Backend Changes:**
   - Edit files in `server/src/`
   - Restart with: `npm run dev`
   - Automatic restart on file changes

### Code Quality

```bash
# Format code
npm run format

# Run linter
npm run lint

# Run tests
npm run test
```

## 📦 Building for Production

```bash
# Build frontend
cd client
npm run build
cd ..

# Start production server
npm start

# Server will serve frontend from client/dist/
```

## 🚀 Deployment

### Docker (Optional)
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t chatgpt-clone .
docker run -p 3000:3000 chatgpt-clone
```

## 📚 Next Steps

1. **Explore the Code** - Check `ARCHITECTURE.md` for details
2. **Customize UI** - Edit styles in `client/src/styles/`
3. **Add Features** - Follow the development guide
4. **Deploy** - See deployment section above

## 💡 Tips & Tricks

1. **Performance**: Use `llama3` for speed or `neural-chat` for better quality
2. **Debugging**: Open browser DevTools (F12) to see API calls
3. **Terminal Tips**: Use `npm run client` and `npm run dev` in separate tabs
4. **Git**: Initialize git repo and track your changes

## 🆘 Need Help?

1. Check the main **README.md**
2. See **TROUBLESHOOTING.md** for common issues
3. Review server logs: `logs/error.log`
4. Check browser console: F12 → Console tab

---

**Ready to chat? Start coding! 🎉**
