
"use client"
import { useState } from 'react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award, Code, GraduationCap, HardHat, Palette, ZoomIn, ZoomOut } from "lucide-react";
import { badges as allBadges, userProgress } from "@/lib/mock-data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const iconMap: { [key: string]: React.ElementType } = {
  Award,
  Code,
  GraduationCap,
  HardHat,
};

export default function ProfilePage() {
    const { theme, setTheme } = useTheme();
    const [fontSize, setFontSize] = useState(16);
    const [highContrast, setHighContrast] = useState(false);

    const earnedBadges = allBadges.filter(badge => userProgress.badges.includes(badge.id));

    const handleFontSizeChange = (size: number) => {
      const newSize = Math.max(12, Math.min(24, size));
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}px`;
    }

    const toggleHighContrast = (isHighContrast: boolean) => {
        setHighContrast(isHighContrast);
        document.documentElement.classList.toggle('high-contrast', isHighContrast);
    }
    
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Your Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="https://picsum.photos/seed/user-avatar/80/80" alt="@guest" data-ai-hint="person portrait" />
                            <AvatarFallback>G</AvatarFallback>
                        </Avatar>
                        <Button variant="outline">Change Photo</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="Guest User" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="guest@example.com" disabled />
                        </div>
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility Settings</CardTitle>
                <CardDescription>Make the app more comfortable for you to use.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size">Font Size</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleFontSizeChange(fontSize - 1)}><ZoomOut/></Button>
                    <span className="w-12 text-center font-bold">{fontSize}px</span>
                    <Button variant="outline" size="icon" onClick={() => handleFontSizeChange(fontSize + 1)}><ZoomIn/></Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="theme-selector">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-contrast" className="flex items-center gap-2">
                    <Palette /> High Contrast Mode
                  </Label>
                  <Switch id="high-contrast" checked={highContrast} onCheckedChange={toggleHighContrast} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
                <CardDescription>Achievements you've unlocked.</CardDescription>
              </CardHeader>
              <CardContent>
                {earnedBadges.length > 0 ? (
                  <TooltipProvider>
                    <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-4">
                      {earnedBadges.map((badge) => {
                        const Icon = iconMap[badge.icon];
                        return (
                          <Tooltip key={badge.id}>
                            <TooltipTrigger asChild>
                              <div className="aspect-square flex items-center justify-center bg-muted rounded-lg p-3 transition-transform hover:scale-110">
                                {Icon && <Icon className="h-8 w-8 text-muted-foreground" />}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-bold">{badge.title}</p>
                              <p className="text-sm text-muted-foreground">{badge.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </TooltipProvider>
                ) : (
                  <p className="text-sm text-muted-foreground">No badges earned yet. Keep learning!</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  