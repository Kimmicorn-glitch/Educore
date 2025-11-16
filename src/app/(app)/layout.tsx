
'use client';

import Header from "@/components/layout/header";
import { MainSidebar } from "@/components/layout/main-sidebar";
import {
    SidebarProvider,
    Sidebar,
    SidebarInset,
    SidebarRail,
} from "@/components/ui/sidebar";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { TranslationProvider } from "@/context/translation-context";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <FirebaseClientProvider>
            <TranslationProvider>
                <SidebarProvider>
                    <Sidebar collapsible="icon">
                        <MainSidebar />
                        <SidebarRail />
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
            </TranslationProvider>
        </FirebaseClientProvider>
    );
}
