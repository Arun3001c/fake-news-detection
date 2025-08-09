export default function Section({ article }) {
  if (!article) return null;

  return (
    <div className="container py-4">
      <article className="card">
        <div className="card-body">
          <h1 className="card-title mb-3">{article.title}</h1>
          
          <div className="d-flex align-items-center gap-3 mb-4 text-body-secondary small">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.source?.title}</span>
          </div>

          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="img-fluid rounded mb-4"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          )}

          <div className="card-text">
            {article.body.split('\n').map((para, i) => (
              <p key={i} className="mb-3">{para}</p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}