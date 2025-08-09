import { useState } from 'react';

export default function Tags({ setSearchQuery }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  return (
    <div className="mb-4">
      {/* Tag Filters */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        {['All', 'News', 'Politics', 'Technology', 'Sports'].map((tag) => (
          <button
            key={tag}
            onClick={() => setSearchQuery(tag)}
            className="btn btn-sm btn-outline-secondary rounded-pill"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="position-relative">
        <div className="input-group">
          <span className="input-group-text">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search news..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="form-control"
          />
        </div>
      </form>
    </div>
  );
}