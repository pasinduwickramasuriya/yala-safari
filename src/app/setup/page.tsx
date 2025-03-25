import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SetupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Setup</h1>
                <form action="/api/setup-admin" method="POST" className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="setupKey">Setup Key</Label>
                        <Input
                            type="password"
                            id="setupKey"
                            name="setupKey"
                            placeholder="Enter setup key"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Create Admin User
                    </Button>
                </form>
            </div>
        </div>
    );
} 