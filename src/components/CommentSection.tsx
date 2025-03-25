
import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Comment } from '@/data/dummyData';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string, author: string) => void;
}

const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(comments);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const authorName = author.trim() ? author.trim() : 'Anonymous';
      onAddComment(newComment.trim(), authorName);
      
      // Add to local state for immediate UI update
      const newCommentObj: Comment = {
        id: `temp-${Date.now()}`,
        author: authorName,
        text: newComment.trim(),
        timestamp: new Date().toISOString(),
        likes: 0,
        dislikes: 0
      };
      setLocalComments([...localComments, newCommentObj]);
      
      // Reset form
      setNewComment('');
      setAuthor('');
    }
  };

  const handleLike = (commentId: string) => {
    setLocalComments(localComments.map(comment => 
      comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  const handleDislike = (commentId: string) => {
    setLocalComments(localComments.map(comment => 
      comment.id === commentId ? { ...comment, dislikes: comment.dislikes + 1 } : comment
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      
      {localComments.length > 0 ? (
        <div className="space-y-4 mb-6">
          {localComments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{comment.author}</p>
                  <p className="text-sm text-gray-500">{formatDate(comment.timestamp)}</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleLike(comment.id)}
                    className="text-gray-500 hover:text-primary"
                  >
                    <ThumbsUp size={16} className="mr-1" />
                    <span>{comment.likes}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDislike(comment.id)}
                    className="text-gray-500 hover:text-destructive"
                  >
                    <ThumbsDown size={16} className="mr-1" />
                    <span>{comment.dislikes}</span>
                  </Button>
                </div>
              </div>
              <p className="mt-2">{comment.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-6">No comments yet. Be the first to comment!</p>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full"
          />
        </div>
        <div>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="w-full"
            required
          />
        </div>
        <Button type="submit" className="w-full sm:w-auto">
          Submit Comment
        </Button>
      </form>
    </div>
  );
};

export default CommentSection;
