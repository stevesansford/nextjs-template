'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import AuthGuard from '@/components/auth/AuthGuard';
import { useAuth } from '@/hooks/useAuth';

// Time zone options
const timeZoneOptions = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'GMT/BST (UK)' },
  { value: 'Europe/Paris', label: 'Central European Time (CET)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
];

// Country options
const countryOptions = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'JP', label: 'Japan' },
  { value: 'CN', label: 'China' },
  { value: 'IN', label: 'India' },
  { value: 'BR', label: 'Brazil' },
  // Add more countries as needed
];

function SettingsPageContent() {
  const { session, update, isAuthenticated } = useAuth();
  const toast = useToast();

  // Form state
  const [timeZone, setTimeZone] = useState('UTC');
  const [country, setCountry] = useState('US');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user settings
  useEffect(() => {
    if (isAuthenticated && session?.user) {
      // Load settings from the session
      if (session.user.timeZone) {
        setTimeZone(session.user.timeZone);
      }
      
      if (session.user.country) {
        setCountry(session.user.country);
      }
    }
  }, [session, isAuthenticated]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get current theme from session (to preserve it)
      const currentTheme = session?.user?.theme || 'light';

      // Save settings to the database
      const response = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          timeZone, 
          country, 
          theme: currentTheme // Keep the existing theme value
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save settings');
      }
      
      // Update the session
      if (data.success && session?.user) {
        await update({
          ...session,
          user: {
            ...session.user,
            timeZone,
            country,
            // Keep the existing theme
            theme: session.user.theme
          }
        });
      }

      toast.success({
        title: 'Settings saved',
        description: 'Your preferences have been updated successfully.',
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save settings',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetDefaults = () => {
    // Reset to default values
    setTimeZone('UTC');
    setCountry('US');
    
    toast.info({
      title: 'Settings reset',
      description: 'Your settings have been reset to defaults. Click Save to apply.',
    });
  };

  return (
    <DashboardLayout title="Settings" description="Manage your account settings and preferences">
      <Card>
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <h3 className="text-lg font-medium mb-4">Regional Settings</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="timeZone" className="block text-sm font-medium">
                Time Zone
              </label>
              <select
                id="timeZone"
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {timeZoneOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-sm text-muted-foreground">
                Choose your local time zone for accurate time display
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium">
                Country
              </label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-sm text-muted-foreground">
                Your location helps us provide relevant content
              </p>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleResetDefaults}
            >
              Reset to Defaults
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Save Settings
            </Button>
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
}

// Wrap the component with AuthGuard for client-side authentication
export default function SettingsPage() {
  return (
    <AuthGuard>
      <SettingsPageContent />
    </AuthGuard>
  );
} 