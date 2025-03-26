
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useRole } from '@/hooks/useRole';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Admin = () => {
  const { toast } = useToast();
  const { publishSubmission } = useRole();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [politicians, setPoliticians] = useState<any[]>([]);
  const [statements, setStatements] = useState<any[]>([]);
  const [promises, setPromises] = useState<any[]>([]);
  const [loading, setLoading] = useState({
    submissions: true,
    politicians: true,
    statements: true,
    promises: true
  });
  const [activeTab, setActiveTab] = useState('submissions');

  useEffect(() => {
    if (activeTab === 'submissions') {
      fetchSubmissions();
    } else if (activeTab === 'politicians') {
      fetchPoliticians();
    } else if (activeTab === 'statements') {
      fetchStatements();
    } else if (activeTab === 'promises') {
      fetchPromises();
    }
  }, [activeTab]);

  const fetchSubmissions = async () => {
    setLoading(prev => ({ ...prev, submissions: true }));
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
      setLoading(prev => ({ ...prev, submissions: false }));
    }
  };

  const fetchPoliticians = async () => {
    setLoading(prev => ({ ...prev, politicians: true }));
    try {
      const { data, error } = await supabase
        .from('politicians')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPoliticians(data || []);
    } catch (error: any) {
      console.error('Error fetching politicians:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load politicians',
        variant: 'destructive',
      });
    } finally {
      setLoading(prev => ({ ...prev, politicians: false }));
    }
  };

  const fetchStatements = async () => {
    setLoading(prev => ({ ...prev, statements: true }));
    try {
      const { data, error } = await supabase
        .from('statements')
        .select('*, politicians(name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStatements(data || []);
    } catch (error: any) {
      console.error('Error fetching statements:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load statements',
        variant: 'destructive',
      });
    } finally {
      setLoading(prev => ({ ...prev, statements: false }));
    }
  };

  const fetchPromises = async () => {
    setLoading(prev => ({ ...prev, promises: true }));
    try {
      const { data, error } = await supabase
        .from('promises')
        .select('*, politicians(name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPromises(data || []);
    } catch (error: any) {
      console.error('Error fetching promises:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load promises',
        variant: 'destructive',
      });
    } finally {
      setLoading(prev => ({ ...prev, promises: false }));
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

  const handlePublish = async (submissionId: string, type: string) => {
    let targetTable: 'politicians' | 'statements' | 'promises';
    
    // Map submission type to target table
    if (type === 'politician') {
      targetTable = 'politicians';
    } else if (type === 'claim') {
      targetTable = 'statements';
    } else if (type === 'promise') {
      targetTable = 'promises';
    } else {
      toast({
        title: 'Error',
        description: `Unknown submission type: ${type}`,
        variant: 'destructive',
      });
      return;
    }
    
    // Call the publish function
    const result = await publishSubmission(submissionId, targetTable);
    
    if (result.success) {
      toast({
        title: 'Success',
        description: `Successfully published to ${targetTable}`,
      });
      
      // Refresh the submissions list
      fetchSubmissions();
      
      // Also refresh the relevant content table
      if (targetTable === 'politicians') {
        fetchPoliticians();
      } else if (targetTable === 'statements') {
        fetchStatements();
      } else if (targetTable === 'promises') {
        fetchPromises();
      }
    } else {
      toast({
        title: 'Error',
        description: result.error || `Failed to publish to ${targetTable}`,
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="page-transition container-content py-8">
      <h1 className="page-title">Admin Dashboard</h1>
      <p className="page-subtitle">Manage content and user submissions</p>

      <Tabs defaultValue="submissions" className="w-full mt-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="politicians">Politicians</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
          <TabsTrigger value="promises">Promises</TabsTrigger>
        </TabsList>

        {/* Submissions Tab */}
        <TabsContent value="submissions">
          <Card>
            <CardHeader>
              <CardTitle>User Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {loading.submissions ? (
                <p className="text-center py-4">Loading submissions...</p>
              ) : (
                <Tabs defaultValue="pending">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>
                  
                  {['pending', 'approved', 'rejected'].map(tab => (
                    <TabsContent key={tab} value={tab}>
                      <div className="space-y-4">
                        {submissions
                          .filter(sub => sub.status === tab)
                          .map(submission => (
                            <Card key={submission.id} className="overflow-hidden">
                              <CardHeader className="bg-muted/30">
                                <CardTitle className="flex justify-between items-center text-lg">
                                  <span>
                                    {submission.type === 'claim' 
                                      ? 'Statement' 
                                      : submission.type === 'politician'
                                        ? 'Politician'
                                        : 'Promise'}
                                  </span>
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
                                    {tab === 'approved' && (
                                      <Button 
                                        size="sm" 
                                        variant="default"
                                        onClick={() => handlePublish(submission.id, submission.type)}
                                      >
                                        <ArrowRight className="h-4 w-4 mr-1" />
                                        Publish
                                      </Button>
                                    )}
                                  </div>
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Content:</p>
                                    <p className="text-base">{submission.content}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Speaker:</p>
                                    <p className="text-base">{submission.speaker}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Date:</p>
                                    <p className="text-base">{new Date(submission.date).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Submitted by:</p>
                                    <p className="text-base">{submission.profiles?.username || 'Unknown'}</p>
                                  </div>
                                  {submission.notes && (
                                    <div className="col-span-2">
                                      <p className="text-sm font-medium text-gray-500">Notes:</p>
                                      <p className="text-base">{submission.notes}</p>
                                    </div>
                                  )}
                                  {submission.category && (
                                    <div>
                                      <p className="text-sm font-medium text-gray-500">Category:</p>
                                      <p className="text-base">{submission.category}</p>
                                    </div>
                                  )}
                                  {submission.source_links && submission.source_links.length > 0 && (
                                    <div className="col-span-2">
                                      <p className="text-sm font-medium text-gray-500">Sources:</p>
                                      <ul className="list-disc list-inside">
                                        {submission.source_links.map((source: string, index: number) => (
                                          <li key={index}>
                                            <a 
                                              href={source} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="text-primary hover:underline"
                                            >
                                              {source}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        {submissions.filter(sub => sub.status === tab).length === 0 && (
                          <p className="text-center py-8 text-gray-500">No {tab} submissions found</p>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Politicians Tab */}
        <TabsContent value="politicians">
          <Card>
            <CardHeader>
              <CardTitle>Politicians</CardTitle>
            </CardHeader>
            <CardContent>
              {loading.politicians ? (
                <p className="text-center py-4">Loading politicians...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Party</TableHead>
                      <TableHead>Province</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {politicians.map(politician => (
                      <TableRow key={politician.id}>
                        <TableCell className="font-medium">{politician.name}</TableCell>
                        <TableCell>{politician.party || 'N/A'}</TableCell>
                        <TableCell>{politician.province || 'N/A'}</TableCell>
                        <TableCell>{formatDate(politician.created_at)}</TableCell>
                      </TableRow>
                    ))}
                    {politicians.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-gray-500">No politicians found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statements Tab */}
        <TabsContent value="statements">
          <Card>
            <CardHeader>
              <CardTitle>Statements</CardTitle>
            </CardHeader>
            <CardContent>
              {loading.statements ? (
                <p className="text-center py-4">Loading statements...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Content</TableHead>
                      <TableHead>Politician</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statements.map(statement => (
                      <TableRow key={statement.id}>
                        <TableCell className="font-medium max-w-xs truncate">{statement.content}</TableCell>
                        <TableCell>{statement.politicians?.name || 'N/A'}</TableCell>
                        <TableCell>{new Date(statement.date).toLocaleDateString()}</TableCell>
                        <TableCell>{formatDate(statement.created_at)}</TableCell>
                      </TableRow>
                    ))}
                    {statements.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-gray-500">No statements found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Promises Tab */}
        <TabsContent value="promises">
          <Card>
            <CardHeader>
              <CardTitle>Promises</CardTitle>
            </CardHeader>
            <CardContent>
              {loading.promises ? (
                <p className="text-center py-4">Loading promises...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Politician</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {promises.map(promise => (
                      <TableRow key={promise.id}>
                        <TableCell className="font-medium max-w-xs truncate">{promise.title}</TableCell>
                        <TableCell>{promise.politicians?.name || 'N/A'}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                            ${promise.status === 'Fulfilled' ? 'bg-green-100 text-green-800' : 
                              promise.status === 'Violated' ? 'bg-red-100 text-red-800' :
                              promise.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'}`}>
                            {promise.status}
                          </span>
                        </TableCell>
                        <TableCell>{formatDate(promise.created_at)}</TableCell>
                      </TableRow>
                    ))}
                    {promises.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-gray-500">No promises found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
