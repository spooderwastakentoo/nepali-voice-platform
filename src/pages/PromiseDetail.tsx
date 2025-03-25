
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { User, Calendar, Tag, ExternalLink, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CommentSection from '@/components/CommentSection';
import { getPromiseById } from '@/data/dummyData';

const PromiseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [promise, setPromise] = useState(id ? getPromiseById(id) : undefined);

  useEffect(() => {
    if (id) {
      const foundPromise = getPromiseById(id);
      setPromise(foundPromise);
    }
  }, [id]);

  const handleAddComment = (text: string, author: string) => {
    console.log("Adding comment:", { text, author, promiseId: id });
    // In a real app, this would send a request to the backend
  };

  const getStatusClassName = (status: string): string => {
    switch(status) {
      case 'fulfilled':
        return 'status-fulfilled';
      case 'in-progress':
        return 'status-in-progress';
      case 'unfulfilled':
        return 'status-unfulfilled';
      default:
        return 'status-unknown';
    }
  };

  const formatStatus = (status: string): string => {
    return status.replace('-', ' ').charAt(0).toUpperCase() + status.replace('-', ' ').slice(1);
  };

  if (!promise) {
    return (
      <div className="container-content text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Promise Not Found</h1>
        <p className="mb-6">The promise you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/promises">Back to Promises</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="page-transition container-content">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6"
        onClick={() => navigate('/promises')}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Promises
      </Button>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold">{promise.title}</h1>
            <span className={getStatusClassName(promise.status)}>
              {formatStatus(promise.status)}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-y-2 text-sm text-gray-500 mb-6">
            <div className="flex items-center mr-6">
              <User size={16} className="mr-1" />
              <span>{promise.politician}</span>
            </div>
            <div className="flex items-center mr-6">
              <Calendar size={16} className="mr-1" />
              <span>{new Date(promise.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center">
              <Tag size={16} className="mr-1" />
              <span>{promise.category}</span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700">{promise.text}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Sources</h2>
            <ul className="space-y-2">
              {promise.sources.map((source, index) => (
                <li key={index} className="flex items-center">
                  <ExternalLink size={16} className="mr-2 text-primary" />
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <CommentSection 
            comments={promise.comments} 
            onAddComment={handleAddComment} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PromiseDetail;
