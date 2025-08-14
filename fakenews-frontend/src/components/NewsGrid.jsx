import NewsCard from './ui/NewsCard';

export default function NewsGrid({ news }) {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {news.map((article, index) => (
        <div className="col" key={index}>
          <NewsCard 
            title={article.title}
            url={article.url}
            source={article.source}
            isFake={article.is_fake}
            preview={article.body_preview}
            imageUrl={article.image_url}
          />
        </div>
      ))}
    </div>
  );
}