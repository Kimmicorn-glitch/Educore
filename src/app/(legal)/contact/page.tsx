
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
    return (
      <div className="not-prose space-y-8">
        <div className="text-center">
            <h1 className="text-4xl font-bold font-headline">Contact Us</h1>
            <p className="text-muted-foreground mt-2">
                Have a question, feedback, or a partnership inquiry? We'd love to hear from you.
            </p>
        </div>
        <form className="space-y-6 max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Question about a course" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={6} placeholder="Please describe your inquiry in detail..."/>
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </div>
    );
}
