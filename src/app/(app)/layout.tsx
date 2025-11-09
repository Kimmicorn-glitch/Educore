
'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/layout/header";
import { MainSidebar } from "@/components/layout/main-sidebar";
import OnboardingTutorial from "@/components/tutorial/onboarding-tutorial";
import {
    SidebarProvider,
    Sidebar,
    SidebarInset,
} from "@/components/ui/sidebar";
import { FirebaseClientProvider } from "@/firebase/client-provider";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted) {
        return (
             <FirebaseClientProvider>
                <SidebarProvider>
                    <Sidebar>
                        <MainSidebar />
                    </Sidebar>
                    <SidebarInset>
                        <div className="flex h-full flex-col">
                            <Header />
                            <main className="flex-1 overflow-y-auto p-4 pt-6 md:p-8">
                                {/* You can add a skeleton loader here if you want */}
                            </main>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </FirebaseClientProvider>
        )
    }
    
    return (
        <FirebaseClientProvider>
            <SidebarProvider>
                <Sidebar>
                    <MainSidebar />
                </Sidebar>
                <SidebarInset>
                    <div className="flex h-full flex-col">
                        <Header />
                        <main className="flex-1 overflow-y-auto p-4 pt-6 md:p-8">
                            {children}
                        </main>
                    </div>
                </SidebarInset>
            </SidebarProvider>
            <OnboardingTutorial />
        </FirebaseClientProvider>
    );
}
