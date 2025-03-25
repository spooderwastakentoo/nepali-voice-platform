
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SearchBar from '@/components/SearchBar';
import { statements } from '@/data/dummyData';

const Statements = () => {
  const location = useLocation();
  const [filteredStatements, setFilteredStatements] = useState(statements);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract search query from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('search');
    if (queryParam) {
      setSearchQuery(queryParam);
      filterStatements(queryParam);
    }
  }, [location.search]);

  const filterStatements = (query: string) => {
    if (!query.trim()) {
      setFilteredStatements(statements);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = statements.filter(
      statement => 
        statement.text.toLowerCase().includes(lowercaseQuery) ||
        statement.speaker.toLowerCase().includes(lowercaseQuery) ||
        statement.context.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredStatements(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterStatements(query);
  };

  return (
    <div className="page-transition container-content">
      <h1 className="page-title">Statement Explorer</h1>
      <p className="page-subtitle">
        Explore political statements made by Nepali politicians and analyze their context.
      </p>

      <div className="mb-8">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search statements by text or speaker..."
        />
      </div>

      {searchQuery && (
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Showing results for: <span className="font-medium text-primary">{searchQuery}</span>
            {filteredStatements.length === 0 ? (
              <span className="ml-2">- No results found</span>
            ) : (
              <span className="ml-2">- {filteredStatements.length} results found</span>
            )}
          </p>
        </div>
      )}

      <div className="space-y-6">
        {filteredStatements.length > 0 ? (
          filteredStatements.map(statement => (
            <Card key={statement.id} className="card-hover">
              <CardContent className="p-6">
                <Link to={`/statements/${statement.id}`} className="block">
                  <p className="text-lg font-medium mb-3">"{statement.text}"</p>
                  <div className="flex flex-wrap gap-y-2 text-sm text-gray-500">
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
                  <div className="mt-4 text-sm">
                    <p className="text-gray-600 line-clamp-2">{statement.context}</p>
                    <p className="text-primary mt-2 hover:underline">Read more →</p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No statements found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statements;
