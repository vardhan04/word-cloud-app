import requests
from bs4 import BeautifulSoup
import re

def fetch_article_text(url: str) -> str:
    """
    Fetch and extract text content from a news article URL.
    
    Args:
        url: The URL of the article to fetch
        
    Returns:
        Cleaned article text as a string
    """
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'lxml')
        
        for script in soup(["script", "style", "nav", "header", "footer", "aside"]):
            script.decompose()
        
        article_selectors = [
            'article',
            '[role="article"]',
            '.article-content',
            '.post-content',
            '.entry-content',
            'main',
            '.story-body',
            '#article-body'
        ]
        
        text = ""
        for selector in article_selectors:
            content = soup.select_one(selector)
            if content:
                text = content.get_text(separator=' ', strip=True)
                break
        
        if not text or len(text) < 200:
            paragraphs = soup.find_all('p')
            text = ' '.join([p.get_text(strip=True) for p in paragraphs])
        
        text = clean_text(text)
        
        return text
        
    except requests.RequestException as e:
        raise Exception(f"Failed to fetch article: {str(e)}")
    except Exception as e:
        raise Exception(f"Error processing article: {str(e)}")

def clean_text(text: str) -> str:
    """
    Clean extracted text by removing extra whitespace and special characters.
    
    Args:
        text: Raw text string
        
    Returns:
        Cleaned text string
    """
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s.,!?-]', '', text)
    
    return text.strip()
