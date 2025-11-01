# Complete Setup and Run Guide

## Project Overview
This is a 3D Word Cloud News Analyzer built with:
- **Backend**: Python + FastAPI + scikit-learn
- **Frontend**: React + Three.js (React Three Fiber)

## Directory Structure
```
C:\Users\saiva\word-cloud-app\
â”œâ”€â”€ backend/          # Python FastAPI backend
â”œâ”€â”€ frontend/         # React Three Fiber frontend
â””â”€â”€ README.md
```

---

## Step-by-Step Setup Instructions

### 1. Backend Setup

#### Open Terminal 1 (PowerShell or CMD):

```bash
# Navigate to backend directory
cd C:\Users\saiva\word-cloud-app\backend

# Create virtual environment
python -m venv venv
venv\Scripts\Activate.ps1
# OR
venv\Scripts\activate.bat

pip install -r requirements.txt

# Run the backend server
python main.py
```

**Backend will run on:** http://localhost:8000

âœ… Keep this terminal running!

---

### 2. Frontend Setup

#### Open Terminal 2 (PowerShell or CMD):

```bash
# Navigate to frontend directory
cd C:\Users\saiva\word-cloud-app\frontend
npm install
npm run dev
```

**Frontend will run on:** http://localhost:5173

âœ… Keep this terminal running too!

---

## Using the Application

1. Open browser to http://localhost:5173
2. Enter a news article URL or click a sample link
3. Click "Analyze" button
4. Watch the 3D word cloud appear!
5. Use mouse to:
   - **Drag** to rotate
   - **Scroll** to zoom
   - Cloud auto-rotates slowly

---

### Troubleshooting:

**Backend Issues:**
- Make sure Python 3.8+ is installed: `python --version`
- Check if backend is running: http://localhost:8000
- Check terminal for error messages

**Frontend Issues:**
- Make sure Node.js is installed: `node --version`
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -r node_modules; npm install`

**CORS Issues:**
- Make sure both servers are running
- Backend should show CORS middleware in logs
- Check browser console for errors

---

## Tech Stack Details

### Backend:
- **FastAPI** - Modern Python web framework
- **BeautifulSoup4** - HTML parsing and text extraction
- **scikit-learn** - TF-IDF vectorization
- **NLTK** - Text preprocessing and stopwords
- **Uvicorn** - ASGI server

### Frontend:
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Three.js** - 3D graphics library
- **Axios** - HTTP client

---

## Next Steps / Enhancements

Ideas for improvement:
1. Add more NLP techniques (LDA, BERTopic)
2. Compare multiple articles
3. Deploy to cloud (AWS, Heroku, Vercel)


