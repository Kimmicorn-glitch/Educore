"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { MessageSquare, Send, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AiChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'bot', text: "Hello! How can I help you with this lesson?" }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessages = [...messages, { from: 'user', text: input }];
        newMessages.push({ from: 'bot', text: "I'm a demo bot. While I can't answer your question, a great tip for this topic is to break down the problem into smaller pieces!" });
        setMessages(newMessages);
        setInput('');
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
                                <div key={index} className={`flex items-end gap-2 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                                    {msg.from === 'bot' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback><Bot /></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={`rounded-lg px-3 py-2 max-w-xs ${msg.from === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask a question..."
                            />
                            <Button onClick={handleSend}><Send className="h-4 w-4" /></Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
