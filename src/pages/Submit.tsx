
import { useState } from 'react';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const categories = [
  'Economy',
  'Education',
  'Environment',
  'Healthcare',
  'Infrastructure',
  'Governance',
  'Foreign Policy',
  'Technology',
  'Agriculture',
  'Social Welfare'
];

interface FormData {
  type: 'claim' | 'promise';
  text: string;
  date: string;
  speaker: string;
  party: string;
  category: string;
  sources: string;
  notes: string;
}

const Submit = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    type: 'claim',
    text: '',
    date: '',
    speaker: '',
    party: '',
    category: '',
    sources: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.text.trim()) newErrors.text = 'Text is required';
    if (!formData.date.trim()) newErrors.date = 'Date is required';
    if (!formData.speaker.trim()) newErrors.speaker = 'Speaker or Party is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Submission received",
        description: "Thank you for your contribution to NepFacto!",
      });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="page-transition container-content py-10">
        <Card className="max-w-lg mx-auto">
          <CardContent className="p-8 text-center">
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Thank You For Your Submission!</h1>
            <p className="text-gray-600 mb-6">
              Your contribution helps keep our database accurate and up-to-date. Our team will review your submission shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setIsSubmitted(false)}>
                Submit Another
              </Button>
              <Button variant="outline" asChild>
                <a href="/">Return to Home</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-transition container-content py-10">
      <h1 className="page-title">Submit a Claim or Promise</h1>
      <p className="page-subtitle max-w-xl mx-auto">
        Help us track political statements and promises by submitting information with sources.
      </p>

      <Card className="max-w-xl mx-auto">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Submission Type</Label>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="claim"
                    name="type"
                    value="claim"
                    checked={formData.type === 'claim'}
                    onChange={() => setFormData(prev => ({ ...prev, type: 'claim' }))}
                    className="mr-2"
                  />
                  <Label htmlFor="claim" className="cursor-pointer">Statement/Claim</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="promise"
                    name="type"
                    value="promise"
                    checked={formData.type === 'promise'}
                    onChange={() => setFormData(prev => ({ ...prev, type: 'promise' }))}
                    className="mr-2"
                  />
                  <Label htmlFor="promise" className="cursor-pointer">Promise</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text" className="required">Text</Label>
              <Textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                placeholder="Enter the exact statement or promise..."
                className={errors.text ? "border-destructive" : ""}
                required
              />
              {errors.text && <p className="text-sm text-destructive">{errors.text}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="required">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className={errors.date ? "border-destructive" : ""}
                required
              />
              {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="speaker" className="required">Speaker/Politician</Label>
                <Input
                  id="speaker"
                  name="speaker"
                  value={formData.speaker}
                  onChange={handleChange}
                  placeholder="Who made this statement/promise?"
                  className={errors.speaker ? "border-destructive" : ""}
                  required
                />
                {errors.speaker && <p className="text-sm text-destructive">{errors.speaker}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="party">Political Party</Label>
                <Input
                  id="party"
                  name="party"
                  value={formData.party}
                  onChange={handleChange}
                  placeholder="Party affiliation (if applicable)"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sources">Source Link(s)</Label>
              <Textarea
                id="sources"
                name="sources"
                value={formData.sources}
                onChange={handleChange}
                placeholder="Enter URLs or references to sources (one per line)"
                rows={3}
              />
              <p className="text-sm text-gray-500">Add URLs to news articles, videos, or official documents.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any additional context or details..."
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Submit;
