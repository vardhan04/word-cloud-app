# Backend - 3D Word Cloud API

FastAPI backend for analyzing news articles and extracting topics.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
```

2. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
python main.py
```

Server will start on http://localhost:8000

## API Endpoints

### GET /
Health check endpoint

### POST /analyze
Analyze an article URL and return word cloud data

**Request Body:**
```json
{
  "url": "https://example.com/article"
}
```

**Response:**
```json
{
  "words": [
    {"word": "technology", "weight": 1.0},
    {"word": "innovation", "weight": 0.85}
  ],
  "success": true,
  "message": "Successfully extracted N keywords"
}
```

## Modules

- **main.py** - FastAPI application and endpoints
- **scraper.py** - Web scraping and text extraction
- **topic_modeling.py** - NLP topic extraction using TF-IDF

## Technologies

- FastAPI - Modern web framework
- BeautifulSoup4 - HTML parsing
- scikit-learn - TF-IDF vectorization
- NLTK - Natural language processing
