import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './ui/Header';
import Tags from './ui/Tags';
import NewsGrid from './NewsGrid';

export default function Layout() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/news?q=${searchQuery}`);
        setNews(res.data.articles);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [searchQuery]);

  return (
    <div className="min-vh-100 bg-body-tertiary">
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <main className="container py-4">
        {/* Search and Filter Section */}
        <div className="card mb-4">
          <div className="card-body">
            <Tags setSearchQuery={setSearchQuery} />
          </div>
        </div>

        {/* News Grid */}
        <div className="card">
          <div className="card-body">
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '256px' }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <NewsGrid news={news} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}