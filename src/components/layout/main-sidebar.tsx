
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookDashed,
  LayoutDashboard,
  BookCopy,
  User,
  Settings,
  LifeBuoy,
  Swords,
} from "lucide-react";
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/firebase";
import { useEffect, useState } from "react";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/courses",
    label: "Courses",
    icon: BookCopy,
  },
  {
    href: "/challenges",
    label: "Challenges",
    icon: Swords,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
  },
  {
    href: "/support",
    label: "Support",
    icon: LifeBuoy,
  },
];

const agentLinks = [
    {
      href: "/support-dashboard",
      label: "Support Dashboard",
      icon: LayoutDashboard,
    }
]

export function MainSidebar() {
  const pathname = usePathname();
  const { isSupportAgent } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <BookDashed className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline text-foreground group-data-[collapsible=icon]:hidden">
            EduCore
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(link.href)}
                tooltip={link.label}
              >
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        {mounted && isSupportAgent && (
          <>
            <Separator className="my-4" />
            <p className="px-4 text-xs text-muted-foreground font-semibold uppercase group-data-[collapsible=icon]:hidden">Support Agent</p>
            <SidebarMenu>
              {agentLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(link.href)}
                    tooltip={link.label}
                  >
                    <Link href={link.href}>
                      <link.icon />
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </>
        )}
      </SidebarContent>

      <SidebarFooter>
        <Separator className="my-2" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="#">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
