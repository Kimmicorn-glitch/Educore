
"use client"

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { MessageSquare, Send, Bot, Loader2, User as UserIcon, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getChatbotResponse } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

interface AiChatbotProps {
    lessonContent: string;
}

interface Message {
    from: 'user' | 'bot';
    text: string;
}

export default function AiChatbot({ lessonContent }: AiChatbotProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { from: 'bot', text: "Hello! Ask me anything about this lesson." }
    ]);
    const [input, setInput] = useState('');
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = { from: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        startTransition(async () => {
            const result = await getChatbotResponse({
                lessonContent,
                question: input,
            });

            if (result.success && result.data) {
                const botMessage: Message = { from: 'bot', text: result.data.answer };
                setMessages(prev => [...prev, botMessage]);
            } else {
                const errorMessage = result.error || 'Something went wrong.';
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: errorMessage,
                });
                const botMessage: Message = { from: 'bot', text: "Sorry, I ran into a problem. Please try again." };
                setMessages(prev => [...prev, botMessage]);
            }
        });
    }

    return (
        <>
            <div className="fixed bottom-8 right-8 z-50">
                <Button
                    size="icon"
                    className="rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90"
                    onClick={() => setIsOpen(true)}
                >
                    <MessageSquare className="w-8 h-8" />
                </Button>
            </div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="font-headline flex items-center gap-2 text-xl">
                            <Bot /> AI Assistant
                        </SheetTitle>
                        <SheetDescription>
                            Ask questions about the lesson, get explanations, or request examples.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col h-[calc(100%-8rem)] mt-4">
                        <div className="flex-grow space-y-4 overflow-y-auto pr-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-start gap-2.5 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                                    {msg.from === 'bot' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback><Bot /></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={`rounded-lg px-3 py-2 max-w-sm break-words ${msg.from === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                    {msg.from === 'user' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback><UserIcon /></AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                             {isPending && (
                                <div className="flex items-start gap-2.5">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback><Bot /></AvatarFallback>
                                    </Avatar>
                                    <div className="rounded-lg px-3 py-2 max-w-sm bg-muted flex items-center">
                                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mt-4 flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && !isPending && handleSend()}
                                placeholder="Ask a question..."
                                disabled={isPending}
                            />
                            <Button onClick={handleSend} disabled={isPending}>
                                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
