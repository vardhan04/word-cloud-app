from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk import pos_tag
from nltk.chunk import ne_chunk
import re
import os

def download_nltk_data():
    """Download required NLTK data if not already present."""
    required_data = [
        ('tokenizers/punkt', 'punkt'),
        ('corpora/stopwords', 'stopwords'),
        ('taggers/averaged_perceptron_tagger', 'averaged_perceptron_tagger'),
        ('chunkers/maxent_ne_chunker', 'maxent_ne_chunker'),
        ('corpora/words', 'words')
    ]
    
    for path, name in required_data:
        try:
            nltk.data.find(path)
        except LookupError:
            nltk.download(name, quiet=True)

download_nltk_data()

def preprocess_text(text: str) -> str:
    """
    Preprocess text for topic modeling.
    
    Args:
        text: Raw text string
        
    Returns:
        Preprocessed text string
    """
    text = text.lower()
    text = re.sub(r'http\S+|www\S+', '', text)
    text = re.sub(r'\S+@\S+', '', text)
    text = re.sub(r'\d+', '', text)
    text = re.sub(r'[^a-z\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text

def extract_nouns(text: str) -> list:
    """
    Extract meaningful single nouns from text.
    
    Args:
        text: Preprocessed text
        
    Returns:
        List of important single nouns
    """
    tokens = word_tokenize(text)
    pos_tags = pos_tag(tokens)
    
    nouns = []
    
    for word, tag in pos_tags:
        if tag in ['NN', 'NNS', 'NNP', 'NNPS'] and len(word) > 2:
            nouns.append(word)
    
    return nouns

def extract_topics(text: str, n_words: int = 30) -> list:
    """
    Extract important single-word topics from text using NLP.
    Focuses on meaningful nouns only.
    
    Args:
        text: Article text
        n_words: Number of top words to return
        
    Returns:
        List of dictionaries with word and weight (single words only, no underscores)
    """
    try:
        processed_text = preprocess_text(text)
        
        if len(processed_text) < 50:
            raise ValueError("Text too short after preprocessing")
        
        nouns = extract_nouns(processed_text)
        
        if not nouns:
            raise ValueError("No nouns could be extracted from text")
        
        stop_words = set(stopwords.words('english'))
        
        custom_stops = {
            'said', 'also', 'would', 'could', 'one', 'two', 'three', 'may', 
            'including', 'according', 'new', 'first', 'last', 'year', 'years',
            'will', 'use', 'used', 'make', 'get', 'go', 'see', 'way', 'time',
            'people', 'thing', 'things', 'day', 'much', 'many', 'part', 'number',
            'know', 'say', 'tell', 'ask', 'think', 'come', 'want', 'look',
            'take', 'give', 'work', 'call', 'try', 'need', 'feel', 'become',
            'leave', 'put', 'mean', 'keep', 'let', 'begin', 'seem', 'help',
            'talk', 'turn', 'start', 'show', 'hear', 'play', 'run', 'move',
            'like', 'live', 'believe', 'hold', 'bring', 'happen', 'must',
            'write', 'provide', 'sit', 'stand', 'lose', 'pay', 'meet',
            'include', 'continue', 'set', 'learn', 'change', 'lead', 'understand',
            'watch', 'follow', 'stop', 'create', 'speak', 'read', 'allow',
            'add', 'spend', 'grow', 'open', 'walk', 'win', 'offer', 'remember',
            'love', 'consider', 'appear', 'buy', 'wait', 'serve', 'die',
            'send', 'expect', 'build', 'stay', 'fall', 'cut', 'reach', 'kill',
            'remain', 'suggest', 'raise', 'pass', 'sell', 'require', 'report',
            'decide', 'pull', 'back', 'case', 'example', 'lot', 'fact', 'today',
            'yesterday', 'tomorrow', 'week', 'month', 'report', 'article',
            'news', 'website', 'page', 'link', 'content', 'share', 'post',
            'comment', 'view', 'click', 'video', 'image', 'photo', 'picture'
        }
        stop_words.update(custom_stops)
        
        filtered_nouns = [
            noun for noun in nouns 
            if noun.lower() not in stop_words and len(noun) > 2
        ]
        
        if not filtered_nouns:
            raise ValueError("No meaningful nouns after filtering")
        
        noun_text = ' '.join(filtered_nouns)
        
        vectorizer = TfidfVectorizer(
            max_features=100,
            stop_words=list(stop_words),
            ngram_range=(1, 1),
        )
        
        tfidf_matrix = vectorizer.fit_transform([noun_text])
        feature_names = vectorizer.get_feature_names_out()
        tfidf_scores = tfidf_matrix.toarray()[0]
        
        word_scores = list(zip(feature_names, tfidf_scores))
        word_scores.sort(key=lambda x: x[1], reverse=True)
        top_words = word_scores[:n_words]
        
        if top_words:
            max_weight = top_words[0][1]
            min_weight = top_words[-1][1] if len(top_words) > 1 else max_weight
            weight_range = max_weight - min_weight if max_weight != min_weight else 1
            
            result = [
                {
                    "word": word.capitalize(),
                    "weight": float((weight - min_weight) / weight_range * 0.8 + 0.2)
                }
                for word, weight in top_words
                if len(word) > 2 and ' ' not in word
            ]
        else:
            result = []
        
        return result
        
    except Exception as e:
        raise Exception(f"Error extracting topics: {str(e)}")
