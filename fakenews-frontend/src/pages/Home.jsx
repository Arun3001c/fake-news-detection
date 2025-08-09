import Layout from '../components/Layout';
import NewsGrid from '../components/NewsGrid';
import Tags from '../components/ui/Tags';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Layout>
        <Tags />
        <NewsGrid />
      </Layout>
    </div>
  );
}