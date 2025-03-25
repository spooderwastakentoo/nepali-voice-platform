
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SearchBar from '@/components/SearchBar';
import { promises } from '@/data/dummyData';

const Promises = () => {
  const [filteredPromises, setFilteredPromises] = useState(promises);
  const [searchQuery, setSearchQuery] = useState('');

  const filterPromises = (query: string) => {
    if (!query.trim()) {
      setFilteredPromises(promises);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = promises.filter(
      promise => 
        promise.title.toLowerCase().includes(lowercaseQuery) ||
        promise.text.toLowerCase().includes(lowercaseQuery) ||
        promise.politician.toLowerCase().includes(lowercaseQuery) ||
        promise.party.toLowerCase().includes(lowercaseQuery) ||
        promise.category.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredPromises(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterPromises(query);
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

  return (
    <div className="page-transition container-content">
      <h1 className="page-title">Promise Tracker</h1>
      <p className="page-subtitle">
        Track political promises made by Nepali politicians and monitor their progress.
      </p>

      <div className="mb-8">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search promises by title, politician, or category..."
        />
      </div>

      {searchQuery && (
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Showing results for: <span className="font-medium text-primary">{searchQuery}</span>
            {filteredPromises.length === 0 ? (
              <span className="ml-2">- No results found</span>
            ) : (
              <span className="ml-2">- {filteredPromises.length} results found</span>
            )}
          </p>
        </div>
      )}

      <div className="space-y-6">
        {filteredPromises.length > 0 ? (
          filteredPromises.map(promise => (
            <Card key={promise.id} className="card-hover">
              <CardContent className="p-6">
                <Link to={`/promises/${promise.id}`} className="block">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-semibold">{promise.title}</h2>
                    <span className={getStatusClassName(promise.status)}>
                      {formatStatus(promise.status)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-2">{promise.text}</p>
                  
                  <div className="flex flex-wrap gap-y-2 text-sm text-gray-500">
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
                  
                  <p className="text-primary mt-4 hover:underline">View details →</p>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No promises found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Promises;
