
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle } from 'lucide-react';

const Admin = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*, profiles(username)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error: any) {
      console.error('Error fetching submissions:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load submissions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSubmissionStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setSubmissions(submissions.map(sub => 
        sub.id === id ? { ...sub, status } : sub
      ));

      toast({
        title: 'Success',
        description: `Submission ${status}`,
      });
    } catch (error: any) {
      console.error('Error updating submission:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update submission',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="page-transition container-content py-8">
      <h1 className="page-title">Admin Dashboard</h1>
      <p className="page-subtitle">Manage submissions and user accounts</p>

      <Tabs defaultValue="pending" className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {['pending', 'approved', 'rejected'].map(tab => (
          <TabsContent key={tab} value={tab}>
            {loading ? (
              <p className="text-center py-8">Loading submissions...</p>
            ) : (
              <div className="grid gap-4">
                {submissions
                  .filter(sub => sub.status === tab)
                  .map(submission => (
                    <Card key={submission.id}>
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          <span>{submission.type === 'claim' ? 'Statement' : 'Promise'}</span>
                          <div className="space-x-2 flex">
                            {tab === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-green-600 border-green-600 hover:bg-green-50"
                                  onClick={() => updateSubmissionStatus(submission.id, 'approved')}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-destructive border-destructive hover:bg-red-50"
                                  onClick={() => updateSubmissionStatus(submission.id, 'rejected')}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p><strong>Content:</strong> {submission.content}</p>
                          <p><strong>Speaker:</strong> {submission.speaker}</p>
                          <p><strong>Category:</strong> {submission.category || 'Not specified'}</p>
                          <p><strong>Date:</strong> {new Date(submission.date).toLocaleDateString()}</p>
                          <p><strong>Submitted by:</strong> {submission.profiles?.username || 'Unknown'}</p>
                          {submission.notes && (
                            <p><strong>Notes:</strong> {submission.notes}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {submissions.filter(sub => sub.status === tab).length === 0 && (
                  <p className="text-center py-8 text-gray-500">No {tab} submissions found</p>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Admin;
