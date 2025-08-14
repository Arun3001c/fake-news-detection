export default function NewsCard({ title, url, source, isFake, preview, imageUrl }) {
  const defaultImage = '/default-news.jpg';
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
      <div className="card h-100 border border-secondary-subtle card-hover">
        {/* Status Badge */}
        <span className={`badge ${isFake ? 'bg-danger' : 'bg-success'} status-badge`}>
          {isFake ? 'Fake' : 'Verified'}
        </span>
        {/* News Image */}
        <img
          src={imageUrl && imageUrl.trim() !== '' ? imageUrl : defaultImage}
          alt={title}
          className="card-img-top"
          style={{ objectFit: 'cover', height: '180px', width: '100%' }}
          onError={e => { e.target.onerror = null; e.target.src = defaultImage; }}
        />
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