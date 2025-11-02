# 3D Word Cloud News Analyzer

A full-stack web application that extracts topics from news articles using NLP and visualizes them as an interactive 3D word cloud.

## Overview

This project demonstrates integration of a modern web UI with a backend data mining pipeline. Users input a news article URL, and the system extracts key topics using natural language processing, then visualizes them in 3D space using WebGL.

## Technology Stack

### Frontend
- React 18.2.0 with React Three Fiber for 3D rendering
- Three.js 0.158.0 for graphics
- Vite 5.0.2 for build tooling
- Axios for API communication

### Backend
- Python 3.10+ with FastAPI framework
- BeautifulSoup4 for web scraping
- scikit-learn for TF-IDF vectorization
- NLTK for text processing and POS tagging

### NLP Pipeline
- Web scraping and text extraction
- Text preprocessing and tokenization
- Part-of-Speech tagging for noun extraction
- TF-IDF scoring for keyword importance
- Stopword filtering

## Setup and Installation

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

Backend runs on http://localhost:8000

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173

## Usage

1. Open http://localhost:5173
2. Enter a news article URL or select a sample
3. Click "Analyze" to process the article
4. Interact with the 3D word cloud (drag to rotate, scroll to zoom)
5. Hover over words to see relevance scores

## API Endpoints

### POST /analyze
Analyzes article and returns topic data.

**Request:**
```json
{
  "url": "https://example.com/article"
}
```

**Response:**
```json
{
  "words": [
    {"word": "Technology", "weight": 1.0},
    {"word": "Research", "weight": 0.85}
  ],
  "success": true,
  "message": "Successfully extracted 30 keywords"
}
```

### GET /
Health check endpoint.

## Project Structure

```
word-cloud-app/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── scraper.py           # Web scraping
│   ├── topic_modeling.py    # NLP pipeline
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main component
│   │   └── components/
│   │       └── WordCloud.jsx # 3D visualization
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Features

- Real-time article analysis with NLP
- Interactive 3D word cloud with WebGL
- Words sized by relevance (TF-IDF scores)
- Hover tooltips showing keyword importance
- Auto-rotation with manual controls
- Statistics panel with analysis metrics
- Loading states and error handling
- Responsive design

## Dependencies

**Backend:**
```
fastapi==0.104.1
uvicorn==0.24.0
beautifulsoup4==4.12.2
requests==2.31.0
scikit-learn==1.3.2
nltk==3.8.1
lxml==4.9.3
```

**Frontend:**
```
react@18.2.0
@react-three/fiber@8.15.8
@react-three/drei@9.88.13
three@0.158.0
axios@1.6.2
vite@5.0.2
```

## Technical Implementation

- Fibonacci sphere algorithm for word positioning
- TF-IDF vectorization for keyword extraction
- POS tagging to identify meaningful nouns
- Dynamic font sizing based on relevance scores

## Screenshots

![App Screenshot 1](screenshots/ss1.png)
![App Screenshot 2](screenshots/ss2.png)
![App Screenshot 3](screenshots/ss3.png)
