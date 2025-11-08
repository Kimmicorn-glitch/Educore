import Image from 'next/image';
import Link from 'next/link';
import { BookDashed } from 'lucide-react';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FirebaseClientProvider>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
          <div className="w-full max-w-md">
            <div className="mb-8 flex justify-center">
                <Link href="/" className="flex items-center gap-2">
                    <BookDashed className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold font-headline text-foreground">EduCore</span>
                </Link>
            </div>
            {children}
          </div>
        </div>
    </FirebaseClientProvider>
  )
}
