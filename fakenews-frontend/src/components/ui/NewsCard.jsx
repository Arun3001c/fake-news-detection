export default function NewsCard({ title, url, source, isFake, preview }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
      <div className="card h-100 border border-secondary-subtle card-hover">
        {/* Status Badge */}
        <span className={`badge ${isFake ? 'bg-danger' : 'bg-success'} status-badge`}>
          {isFake ? 'Fake' : 'Verified'}
        </span>
        
        {/* Content */}
        <div className="card-body">
          <h3 className="card-title fs-5 mb-2 text-body-emphasis text-truncate-2">
            {title}
          </h3>
          <p className="card-subtitle mb-2 text-body-secondary small">
            Source: {source}
          </p>
          <p className="card-text text-body-tertiary small text-truncate-3">
            {preview}
          </p>
        </div>
      </div>
    </a>
  );
}