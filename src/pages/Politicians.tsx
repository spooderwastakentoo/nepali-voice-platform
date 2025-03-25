
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Building, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SearchBar from '@/components/SearchBar';
import { politicians } from '@/data/dummyData';

const Politicians = () => {
  const [filteredPoliticians, setFilteredPoliticians] = useState(politicians);
  const [searchQuery, setSearchQuery] = useState('');

  const filterPoliticians = (query: string) => {
    if (!query.trim()) {
      setFilteredPoliticians(politicians);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = politicians.filter(
      politician => 
        politician.name.toLowerCase().includes(lowercaseQuery) ||
        politician.party.toLowerCase().includes(lowercaseQuery) ||
        politician.province.toLowerCase().includes(lowercaseQuery) ||
        politician.bio.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredPoliticians(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterPoliticians(query);
  };

  return (
    <div className="page-transition container-content">
      <h1 className="page-title">Politician Directory</h1>
      <p className="page-subtitle">
        Explore profiles of Nepali politicians and track their statements and promises.
      </p>

      <div className="mb-8">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search politicians by name, party, or province..."
        />
      </div>

      {searchQuery && (
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Showing results for: <span className="font-medium text-primary">{searchQuery}</span>
            {filteredPoliticians.length === 0 ? (
              <span className="ml-2">- No results found</span>
            ) : (
              <span className="ml-2">- {filteredPoliticians.length} results found</span>
            )}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPoliticians.length > 0 ? (
          filteredPoliticians.map(politician => (
            <Card key={politician.id} className="card-hover">
              <CardContent className="p-6">
                <Link to={`/politicians/${politician.id}`} className="block">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary/10 p-3 rounded-full mr-3 text-primary">
                      <User size={24} />
                    </div>
                    <h2 className="text-lg font-semibold">{politician.name}</h2>
                  </div>
                  
                  <div className="flex flex-wrap gap-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center mr-6">
                      <Building size={16} className="mr-1" />
                      <span>{politician.party}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      <span>{politician.province}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 line-clamp-3 mb-3">{politician.bio}</p>
                  
                  <div className="flex justify-between text-sm">
                    <span>{politician.statementIds.length} Statements</span>
                    <span>{politician.promiseIds.length} Promises</span>
                  </div>
                  
                  <p className="text-primary mt-3 hover:underline">View profile →</p>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center py-10">
            <p className="text-gray-500">No politicians found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Politicians;
