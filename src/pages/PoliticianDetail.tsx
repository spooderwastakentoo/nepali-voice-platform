
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { User, Building, MapPin, MessageSquare, CheckSquare, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getPoliticianById, 
  getStatementsByPolitician, 
  getPromisesByPolitician, 
  Statement, 
  Promise 
} from '@/data/dummyData';

const PoliticianDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [politician, setPolitician] = useState(id ? getPoliticianById(id) : undefined);
  const [statements, setStatements] = useState<Statement[]>([]);
  const [promises, setPromises] = useState<Promise[]>([]);

  useEffect(() => {
    if (id) {
      const foundPolitician = getPoliticianById(id);
      setPolitician(foundPolitician);
      
      if (foundPolitician) {
        setStatements(getStatementsByPolitician(id));
        setPromises(getPromisesByPolitician(id));
      }
    }
  }, [id]);

  if (!politician) {
    return (
      <div className="container-content text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Politician Not Found</h1>
        <p className="mb-6">The politician profile you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/politicians">Back to Politicians</Link>
        </Button>
      </div>
    );
  }

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

  return (
    <div className="page-transition container-content">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6"
        onClick={() => navigate('/politicians')}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Politicians
      </Button>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="bg-primary/10 p-4 rounded-full mr-4 text-primary mb-4 md:mb-0">
              <User size={40} />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">{politician.name}</h1>
              
              <div className="flex flex-wrap gap-y-2 text-sm text-gray-500">
                <div className="flex items-center mr-6">
                  <Building size={16} className="mr-1" />
                  <span>{politician.party}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span>{politician.province}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Biography</h2>
            <p className="text-gray-700">{politician.bio}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="statements">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="statements" className="flex items-center">
            <MessageSquare size={16} className="mr-2" />
            Statements ({statements.length})
          </TabsTrigger>
          <TabsTrigger value="promises" className="flex items-center">
            <CheckSquare size={16} className="mr-2" />
            Promises ({promises.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="statements" className="mt-0">
          {statements.length > 0 ? (
            <div className="space-y-4">
              {statements.map(statement => (
                <Card key={statement.id} className="card-hover">
                  <CardContent className="p-4">
                    <Link to={`/statements/${statement.id}`} className="block">
                      <p className="font-medium mb-2">"{statement.text}"</p>
                      <div className="text-sm text-gray-500">
                        {new Date(statement.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                No statements recorded for this politician.
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="promises" className="mt-0">
          {promises.length > 0 ? (
            <div className="space-y-4">
              {promises.map(promise => (
                <Card key={promise.id} className="card-hover">
                  <CardContent className="p-4">
                    <Link to={`/promises/${promise.id}`} className="block">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium">{promise.title}</p>
                        <span className={getStatusClassName(promise.status)}>
                          {formatStatus(promise.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{promise.text}</p>
                      <div className="text-sm text-gray-500">
                        {new Date(promise.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                No promises recorded for this politician.
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PoliticianDetail;
