
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { User, Calendar, ExternalLink, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CommentSection from '@/components/CommentSection';
import { getStatementById } from '@/data/dummyData';

const StatementDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [statement, setStatement] = useState(id ? getStatementById(id) : undefined);

  useEffect(() => {
    if (id) {
      const foundStatement = getStatementById(id);
      setStatement(foundStatement);
    }
  }, [id]);

  const handleAddComment = (text: string, author: string) => {
    console.log("Adding comment:", { text, author, statementId: id });
    // In a real app, this would send a request to the backend
  };

  if (!statement) {
    return (
      <div className="container-content text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Statement Not Found</h1>
        <p className="mb-6">The statement you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/statements">Back to Statements</Link>
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
        onClick={() => navigate('/statements')}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Statements
      </Button>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">"{statement.text}"</h1>
          
          <div className="flex flex-wrap gap-y-2 text-sm text-gray-500 mb-6">
            <div className="flex items-center mr-6">
              <User size={16} className="mr-1" />
              <span>{statement.speaker}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>{new Date(statement.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Context</h2>
            <p className="text-gray-700">{statement.context}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Sources</h2>
            <ul className="space-y-2">
              {statement.sources.map((source, index) => (
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
            comments={statement.comments} 
            onAddComment={handleAddComment} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StatementDetail;
