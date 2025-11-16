
"use client"

import { useState } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LifeBuoy, Send } from 'lucide-react';
import type { SupportTicket } from '@/lib/types';
import { format } from 'date-fns';

export default function SupportPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const ticketsCollectionRef = useMemoFirebase(() => user ? collection(firestore, 'users', user.uid, 'supportTickets') : null, [user, firestore]);
    const { data: tickets, isLoading } = useCollection<SupportTicket>(ticketsCollectionRef);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !ticketsCollectionRef) return;

        const newTicket: Omit<SupportTicket, 'id'> = {
            userId: user.uid,
            subject,
            description,
            status: 'Open',
            submissionDate: new Date().toISOString(),
        };

        addDocumentNonBlocking(ticketsCollectionRef, newTicket);

        setSubject('');
        setDescription('');
    };

    if (isUserLoading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <LifeBuoy className="h-16 w-16 mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-bold">Please Log In</h2>
                <p className="text-muted-foreground">You need to be logged in to access the support page.</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Support Center</h1>
                <p className="text-muted-foreground">Submit a new support ticket or view your existing ones.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Create New Ticket</CardTitle>
                                <CardDescription>Our support team will get back to you shortly.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input 
                                        id="subject" 
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="e.g., Issue with Python lesson"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Please describe your issue in detail..."
                                        required
                                        rows={5}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full">
                                    <Send className="mr-2" /> Submit Ticket
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Support Tickets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading && <p>Loading tickets...</p>}
                            {!isLoading && (!tickets || tickets.length === 0) && (
                                <p className="text-muted-foreground">You haven't submitted any tickets yet.</p>
                            )}
                            {tickets && tickets.length > 0 && (
                                <div className="space-y-4">
                                    {tickets.sort((a,b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()).map(ticket => (
                                        <div key={ticket.id} className="border p-4 rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold">{ticket.subject}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        Submitted on {format(new Date(ticket.submissionDate), "PPP")}
                                                    </p>
                                                </div>
                                                <Badge variant={ticket.status === 'Closed' ? 'secondary' : 'default'}>
                                                    {ticket.status}
                                                </Badge>
                                            </div>
                                            <p className="text-sm mt-2">{ticket.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

    