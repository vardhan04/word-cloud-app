import React, { useState } from 'react';
import axios from 'axios';
import WordCloud from './components/WordCloud';
import './App.css';

const SAMPLE_URLS = [
  {
    url: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
    label: 'Wikipedia - AI'
  },
  {
    url: 'https://simple.wikipedia.org/wiki/Climate_change',
    label: 'Wikipedia - Climate'
  },
  {
    url: 'https://en.wikipedia.org/wiki/Space_exploration',
    label: 'Wikipedia - Space'
  },
  {
    url: 'https://simple.wikipedia.org/wiki/Technology',
    label: 'Wikipedia - Tech'
  }
];

function App() {
  const [url, setUrl] = useState('');
  const [wordData, setWordData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setAnalyzed(false);

    try {
      const response = await axios.post('http://localhost:8000/analyze', {
        url: url.trim()
      });

      if (response.data.success && response.data.words.length > 0) {
        setWordData(response.data.words);
        setAnalyzed(true);
      } else {
        setError('No words extracted from the article');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(
        err.response?.data?.detail || 
        'Failed to analyze article. Make sure the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (sampleUrl) => {
    setUrl(sampleUrl);
  };

  const stats = wordData.length > 0 ? {
    totalWords: wordData.length,
    topWord: wordData[0]?.word,
    topWeight: (wordData[0]?.weight * 100).toFixed(1),
    avgWeight: (wordData.reduce((sum, w) => sum + w.weight, 0) / wordData.length * 100).toFixed(1)
  } : null;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAnalyze();
    }
  };

  return (
    <div className="app">
      <div className="controls-panel">
        <h1 className="title">3D Word Cloud Analyzer</h1>
        <p className="subtitle">Visualize news article topics in 3D</p>

        <div className="input-section">
          <input
            type="text"
            className="url-input"
            placeholder="Enter article URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button 
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        <div className="sample-urls">
          <p className="sample-label">Try a sample article:</p>
          {SAMPLE_URLS.map((sample, index) => (
            <button
              key={index}
              className="sample-btn"
              onClick={() => handleSampleClick(sample.url)}
              disabled={loading}
              title={sample.url}
            >
              {sample.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {analyzed && wordData.length > 0 && (
          <div className="info-message">
            Extracted {wordData.length} keywords. Hover over words for details!
          </div>
        )}
      </div>

      <div className="canvas-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <div className="loading-text">
              <h3>Analyzing Article...</h3>
              <p>Fetching content</p>
              <p>Extracting topics</p>
              <p>Building visualization</p>
            </div>
          </div>
        ) : analyzed && wordData.length > 0 ? (
          <>
            <WordCloud words={wordData} />
            {stats && (
              <div className="stats-panel">
                <h3>Analysis Stats</h3>
                <div className="stat-item">
                  <span className="stat-label">Total Keywords:</span>
                  <span className="stat-value">{stats.totalWords}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Top Keyword:</span>
                  <span className="stat-value highlight">{stats.topWord}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Top Relevance:</span>
                  <span className="stat-value">{stats.topWeight}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Avg Relevance:</span>
                  <span className="stat-value">{stats.avgWeight}%</span>
                </div>
                <div className="stat-hint">
                  Hover over words to see their relevance score
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">3D</div>
              <h2>3D Word Cloud Analyzer</h2>
              <p>Enter a news article URL above to visualize its key topics</p>
              <div className="placeholder-features">
                <span>Interactive 3D visualization</span>
                <span>AI-powered topic extraction</span>
                <span>Real-time analysis</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
