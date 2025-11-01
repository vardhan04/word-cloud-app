from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
import uvicorn
from scraper import fetch_article_text
from topic_modeling import extract_topics

app = FastAPI(title="3D Word Cloud API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ArticleURL(BaseModel):
    url: HttpUrl

class WordCloudResponse(BaseModel):
    words: list
    success: bool
    message: str = ""

@app.get("/")
async def root():
    return {
        "message": "3D Word Cloud API is running",
        "endpoints": {
            "/analyze": "POST - Analyze article and return word cloud data"
        }
    }

@app.post("/analyze", response_model=WordCloudResponse)
async def analyze_article(article: ArticleURL):
    try:
        url_str = str(article.url)
        text = fetch_article_text(url_str)
        
        if not text or len(text) < 100:
            raise HTTPException(
                status_code=400,
                detail="Could not extract sufficient text from the article"
            )
        
        word_data = extract_topics(text)
        
        if not word_data:
            raise HTTPException(
                status_code=500,
                detail="Could not extract topics from the article"
            )
        
        return WordCloudResponse(
            words=word_data,
            success=True,
            message=f"Successfully extracted {len(word_data)} keywords"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing article: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
