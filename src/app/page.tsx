
"use client";

import { BookDashed, BrainCircuit, GraduationCap, Languages } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EvervaultCard } from "@/components/ui/evervault-card";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookDashed className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">EduCore</span>
          </Link>
          <div className="flex-1"></div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 text-center sm:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                The Smarter Way to Learn
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                An adaptive, AI-powered platform that makes mastering new skills intuitive and fun. Join us and unlock your potential.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg">
                    <Link href="/signup">Get Started for Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/courses">Explore Courses</Link>
                </Button>
              </div>
          </div>
        </section>

        <section className="bg-muted py-12 sm:py-24 lg:py-32">
            <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-48 h-48">
                        <EvervaultCard>
                            <BrainCircuit className="h-24 w-24 text-primary" />
                        </EvervaultCard>
                    </div>
                    <h3 className="text-xl font-bold font-headline">AI-Powered Adaptation</h3>
                    <p className="text-muted-foreground">Our intelligent system analyzes your performance and adjusts lesson difficulty in real-time, ensuring you're always challenged but never overwhelmed.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                     <div className="w-48 h-48">
                        <EvervaultCard>
                            <GraduationCap className="h-24 w-24 text-primary" />
                        </EvervaultCard>
                    </div>
                    <h3 className="text-xl font-bold font-headline">Curated for All Ages</h3>
                    <p className="text-muted-foreground">With dedicated learning paths for children, teenagers, and adults, everyone can find content that resonates with their learning style and goals.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                     <div className="w-48 h-48">
                        <EvervaultCard>
                            <Languages className="h-24 w-24 text-primary" />
                        </EvervaultCard>
                    </div>
                    <h3 className="text-xl font-bold font-headline">Interactive Learning</h3>
                    <p className="text-muted-foreground">Engage with hands-on coding exercises, get instant feedback with our auto-grader, and clarify doubts with an AI assistant available 24/7.</p>
                </div>
            </div>
        </section>

      </main>

      <footer className="border-t">
          <div className="container flex flex-col md:flex-row items-center justify-between py-6 gap-4">
              <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} EduCore. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                </Link>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                </Link>
              </div>
          </div>
      </footer>
    </div>
  );
}

    
