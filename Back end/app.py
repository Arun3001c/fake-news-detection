"""
Fake News Detection API
Complete Single-File Implementation
"""

# ======================
# 1. IMPORTS & SETUP
# ======================
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import requests
import numpy as np
import logging
from datetime import datetime
import sys
import os

# ======================
# 2. APPLICATION INIT
# ======================
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# ======================
# 3. CONFIGURATION
# ======================
class Config:
    # Model paths
    TFIDF_VECTORIZER = 'tfidf_vectorizer.pkl'
    MODEL = 'fake_news_model.pkl'
    
    # API settings
    EVENT_REGISTRY_URL = "https://eventregistry.org/api/v1/article/getArticles"
    API_KEY = "29f8e3c1-573f-4fe8-94ef-593b9dafb04a"  # Replace with your key
    MAX_ARTICLES = 50

# ======================
# 4. LOGGING SETUP
# ======================
def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler('api.log'),
            logging.StreamHandler(sys.stdout)
        ]
    )
    return logging.getLogger(__name__)

logger = setup_logging()

# ======================
# 5. MODEL LOADING
# ======================
def load_models():
    """Load ML models with error handling"""
    try:
        logger.info("Loading ML models...")
        tfidf = joblib.load(Config.TFIDF_VECTORIZER)
        model = joblib.load(Config.MODEL)
        logger.info("Models loaded successfully")
        return tfidf, model
    except Exception as e:
        logger.error(f"Model loading failed: {str(e)}")
        sys.exit(1)

tfidf_vectorizer, model = load_models()

# ======================
# 6. CORE FUNCTIONS
# ======================
def predict_news(text):
    """Predict if news is fake (1) or real (0)"""
    try:
        vectorized = tfidf_vectorizer.transform([text])
        return model.predict(vectorized)[0]
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise

def fetch_articles(params):
    """Fetch articles from Event Registry API"""
    try:
        response = requests.get(
            Config.EVENT_REGISTRY_URL,
            params=params,
            timeout=10
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        logger.error(f"API request failed: {str(e)}")
        raise

# ======================
# 7. API ENDPOINTS
# ======================
@app.route('/')
def home():
    """Root endpoint with API documentation"""
    return jsonify({
        "service": "Fake News Detection API",
        "status": "running",
        "endpoints": {
            "/api/health": "GET - Service health check",
            "/api/news": "GET - Fetch news articles",
            "/api/predict": "POST - Analyze single news item"
        },
        "timestamp": datetime.utcnow().isoformat()
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "model_loaded": bool(model),
        "timestamp": datetime.utcnow().isoformat()
    })

@app.route('/api/news', methods=['GET'])
def get_news():
    """Fetch news articles with predictions"""
    try:
        # Get query parameters
        query = request.args.get('q', '')
        count = min(int(request.args.get('count', 20)), Config.MAX_ARTICLES)
        
        logger.info(f"Fetching {count} articles for: '{query}'")
        
        # Prepare API request
        params = {
            "apiKey": Config.API_KEY,
            "keyword": query,
            "articlesCount": count,
            "lang": "eng",
            "sortBy": "date",
            "ignoreSourceUri": "paywall/paywalled_sources"
        }
        
        # Fetch and process articles
        data = fetch_articles(params)
        articles = data.get('articles', {}).get('results', [])
        
        results = []
        for article in articles:
            try:
                is_fake = predict_news(article.get('body', ''))
                results.append({
                    "title": article.get('title', 'No title'),
                    "url": article.get('url', '#'),
                    "source": article.get('source', {}).get('title', 'Unknown'),
                    "date": article.get('date', ''),
                    "is_fake": bool(is_fake),
                    "body_preview": article.get('body', '')[:200] + '...' if article.get('body') else ''
                })
            except Exception as e:
                logger.warning(f"Skipping article: {str(e)}")
                continue
                
        return jsonify({
            "status": "success",
            "count": len(results),
            "articles": results,
            "query": query,
            "timestamp": datetime.utcnow().isoformat()
        })
        
    except Exception as e:
        logger.error(f"News fetch failed: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "Failed to fetch news",
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat()
        }), 500

@app.route('/api/predict', methods=['POST'])
def predict():
    """Analyze single news item"""
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            raise ValueError("Missing 'text' in request")
            
        is_fake = predict_news(data['text'])
        
        return jsonify({
            "status": "success",
            "prediction": "fake" if is_fake else "real",
            "text_preview": data['text'][:100] + '...',
            "timestamp": datetime.utcnow().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "Prediction failed",
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat()
        }), 400

# ======================
# 8. PRODUCTION SETUP
# ======================
def run_server():
    """Run the application with appropriate server"""
    if os.environ.get('FLASK_ENV') == 'production':
        from waitress import serve
        logger.info("Starting production server...")
        serve(app, host="0.0.0.0", port=5000)
    else:
        logger.info("Starting development server...")
        app.run(host="0.0.0.0", port=5000, debug=True)

if __name__ == "__main__":
    run_server()