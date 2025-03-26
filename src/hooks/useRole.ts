
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

export type UserRole = 'user' | 'admin';

export function useRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserRole() {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user role:', error);
          setRole(null);
        } else {
          setRole(data.role as UserRole);
        }
      } catch (error) {
        console.error('Failed to fetch role:', error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUserRole();
  }, [user]);

  const isAdmin = (): boolean => role === 'admin';
  const isUser = (): boolean => role === 'user';
  const hasRole = (requiredRole: UserRole): boolean => role === requiredRole;

  // Function to publish a submission to the appropriate live content table
  const publishSubmission = async (submissionId: string, targetTable: 'politicians' | 'statements' | 'promises') => {
    try {
      console.log(`Publishing submission ${submissionId} to ${targetTable} table`);
      
      // Call the database function to publish the submission
      const { data, error } = await supabase.rpc('publish_submission', {
        submission_id: submissionId,
        target_table: targetTable
      });
      
      if (error) {
        console.error('Error in publish_submission RPC call:', error);
        throw error;
      }
      
      console.log('Publish successful, new record ID:', data);
      return { success: true, id: data };
    } catch (error: any) {
      console.error('Error publishing submission:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    role,
    loading,
    isAdmin,
    isUser,
    hasRole,
    publishSubmission
  };
}
