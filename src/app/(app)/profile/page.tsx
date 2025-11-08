import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Your Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        
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
      </div>
    );
  }
  