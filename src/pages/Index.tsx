
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, BarChart2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SearchBar from '@/components/SearchBar';
import { statements, promises } from '@/data/dummyData';

const Index = () => {
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // In a real app, this would redirect to search results
    // For now, let's redirect to statements as an example
    navigate(`/statements?search=${encodeURIComponent(query)}`);
  };

  // Get trending statements (in a real app, these would be sorted by view count or engagement)
  const trendingStatements = statements.slice(0, 3);
  // Get latest promise updates (in a real app, these would be sorted by date)
  const latestPromises = promises.slice(0, 3);

  return (
    <div className="page-transition">
      <div className="bg-primary text-white py-16">
        <div className="container-content">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Empowering Nepali Citizens with Political Transparency
          </h1>
          <p className="text-xl text-center mb-8 max-w-2xl mx-auto">
            Track political statements, promises, and hold leaders accountable through verified information.
          </p>
          
          <div className="mt-10">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search statements, promises, or politicians..."
            />
          </div>
        </div>
      </div>

      <div className="container-content py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Trending Claims"
            description="Explore the most discussed political statements."
            icon={<TrendingUp size={24} />}
            linkTo="/statements"
            buttonText="View Statements"
          >
            <div className="space-y-3 mt-4">
              {trendingStatements.map(statement => (
                <div key={statement.id} className="border rounded-lg p-3 text-sm">
                  <Link to={`/statements/${statement.id}`} className="font-medium hover:text-primary">
                    "{statement.text.substring(0, 70)}..."
                  </Link>
                  <p className="text-gray-500 mt-1">- {statement.speaker}</p>
                </div>
              ))}
            </div>
          </FeatureCard>

          <FeatureCard 
            title="Latest Promise Updates"
            description="Stay informed on the latest updates on political promises."
            icon={<BarChart2 size={24} />}
            linkTo="/promises"
            buttonText="View Promises"
          >
            <div className="space-y-3 mt-4">
              {latestPromises.map(promise => (
                <div key={promise.id} className="border rounded-lg p-3 text-sm">
                  <Link to={`/promises/${promise.id}`} className="font-medium hover:text-primary">
                    {promise.title}
                  </Link>
                  <div className="flex justify-between mt-1">
                    <span className="text-gray-500">{promise.politician}</span>
                    <span className={`
                      ${promise.status === 'fulfilled' ? 'status-fulfilled' : 
                        promise.status === 'in-progress' ? 'status-in-progress' : 
                        promise.status === 'unfulfilled' ? 'status-unfulfilled' : 
                        'status-unknown'}
                    `}>
                      {promise.status.replace('-', ' ').charAt(0).toUpperCase() + promise.status.replace('-', ' ').slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </FeatureCard>

          <FeatureCard 
            title="Submit a Claim or Promise"
            description="Help build our database by submitting political statements or promises."
            icon={<PlusCircle size={24} />}
            linkTo="/submit"
            buttonText="Submit Now"
          >
            <div className="text-sm mt-4">
              <p>
                NepFacto relies on community contributions to maintain a comprehensive 
                database of political statements and promises.
              </p>
              <p className="mt-2">
                Your submissions help hold politicians accountable and provide 
                valuable information to fellow citizens.
              </p>
            </div>
          </FeatureCard>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  buttonText: string;
  children?: React.ReactNode;
}

const FeatureCard = ({ title, description, icon, linkTo, buttonText, children }: FeatureCardProps) => {
  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full mr-3 text-primary">
            {icon}
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        {children}
        <div className="mt-6">
          <Button asChild>
            <Link to={linkTo}>{buttonText}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;
