import Header from "@/components/layout/header";
import { MainSidebar } from "@/components/layout/main-sidebar";
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
        </FirebaseClientProvider>
    );
}
