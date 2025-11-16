
"use client";

import { useState, useEffect, useMemo } from 'react';
import { useFirestore, useCollection, useMemoFirebase, useUser } from '@/firebase';
import { collectionGroup, query, where, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { SupportTicket, UserAccount } from '@/lib/types';
import { format } from 'date-fns';
import { useDoc } from '@/firebase/firestore/use-doc';
import { useRouter } from 'next/navigation';

type EnrichedSupportTicket = SupportTicket & { user?: UserAccount, originalId: string };

function UserProfileCell({ userId }: { userId: string }) {
    const firestore = useFirestore();
    const userDocRef = useMemoFirebase(() => doc(firestore, 'users', userId), [firestore, userId]);
    const { data: userProfile } = useDoc<UserAccount>(userDocRef);

    if (!userProfile) return <div className="text-muted-foreground text-xs">Loading user...</div>;

    return (
        <div className="flex flex-col">
            <span className="font-medium">{userProfile.name}</span>
            <span className="text-xs text-muted-foreground">{userProfile.email}</span>
        </div>
    );
}

export default function SupportDashboardPage() {
    const firestore = useFirestore();
    const router = useRouter();
    const { isSupportAgent, isUserLoading } = useUser();
    const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'In Progress' | 'Closed'>('All');

    useEffect(() => {
        if (!isUserLoading && !isSupportAgent) {
            router.push('/dashboard');
        }
    }, [isUserLoading, isSupportAgent, router]);

    const ticketsQuery = useMemoFirebase(() => {
        const baseQuery = query(collectionGroup(firestore, 'supportTickets'));
        if (statusFilter === 'All') {
            return baseQuery;
        }
        return query(baseQuery, where('status', '==', statusFilter));
    }, [firestore, statusFilter]);

    const { data: tickets, isLoading } = useCollection<SupportTicket>(ticketsQuery);

    const handleStatusChange = async (ticketId: string, newStatus: string) => {
        if (!tickets) return;
        
        // Find the full path to the ticket to update it. This is a limitation of collectionGroup queries.
        // For a real app, you might store the full path or user ID on the ticket itself.
        // For this demo, we'll assume we can find it. A better approach would be needed for production.
        const ticketToUpdate = tickets.find(t => t.id === ticketId);
        if(ticketToUpdate) {
            try {
                // To update, we need a full path reference, not from collectionGroup
                const ticketRef = doc(firestore, 'users', ticketToUpdate.userId, 'supportTickets', ticketId);
                await updateDoc(ticketRef, { status: newStatus });
            } catch (error) {
                console.error("Failed to update ticket status: ", error);
            }
        }
    };

    const sortedTickets = tickets?.sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());
    
    if (isUserLoading || !isSupportAgent) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Loading or unauthorized...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Support Dashboard</h1>
                <p className="text-muted-foreground">Manage all user support tickets.</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>All Tickets</CardTitle>
                        <div className="w-[180px]">
                            <Select onValueChange={(value) => setStatusFilter(value as any)} defaultValue="All">
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Statuses</SelectItem>
                                    <SelectItem value="Open">Open</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Closed">Closed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading && <p>Loading tickets...</p>}
                    {!isLoading && (!sortedTickets || sortedTickets.length === 0) && (
                        <p className="text-center text-muted-foreground py-8">No tickets found for the selected filter.</p>
                    )}
                    {sortedTickets && sortedTickets.length > 0 && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Submitted</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedTickets.map(ticket => (
                                    <TableRow key={ticket.id}>
                                        <TableCell>
                                            <UserProfileCell userId={ticket.userId} />
                                        </TableCell>
                                        <TableCell>
                                            <p className="font-medium">{ticket.subject}</p>
                                            <p className="text-xs text-muted-foreground truncate max-w-xs">{ticket.description}</p>
                                        </TableCell>
                                        <TableCell>{format(new Date(ticket.submissionDate), "PPp")}</TableCell>
                                        <TableCell>
                                            <Badge variant={ticket.status === 'Closed' ? 'secondary' : 'default'}>
                                                {ticket.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Select onValueChange={(newStatus) => handleStatusChange(ticket.id, newStatus)} value={ticket.status}>
                                                <SelectTrigger className="w-[150px]">
                                                    <SelectValue placeholder="Change status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Open">Open</SelectItem>
                                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                                    <SelectItem value="Closed">Closed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
