
import { BookDashed } from 'lucide-react';
import Link from 'next/link';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookDashed className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">EduCore</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-12">
            <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
                {children}
            </div>
        </div>
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
