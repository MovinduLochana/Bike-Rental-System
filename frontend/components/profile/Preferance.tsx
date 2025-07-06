import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Preferance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>
          Manage your account preferences and settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* This would contain preferences UI */}
          <p className="text-sm text-gray-500">
            Preference settings coming soon. Here you&apos;ll be able to manage
            your notification preferences, payment methods, and other account
            settings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
