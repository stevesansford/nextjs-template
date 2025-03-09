'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Grid, GridItem } from '@/components/ui/Grid';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

// PLACEHOLDER CONFIGURATION
// Set these to true to enable the corresponding feature section
const ENABLE_AVATAR_UPLOAD = true;     // Enable avatar upload functionality
const ENABLE_NOTIFICATIONS = true;     // Enable notification preferences
const ENABLE_TWO_FACTOR = true;        // Enable two-factor authentication
const ENABLE_ACCOUNT_LINKING = true;   // Enable social account linking
const ENABLE_ACTIVITY_LOG = true;      // Enable activity log

export default function AccountPage() {
  const { session, update, isAuthenticated } = useAuth();
  const router = useRouter();
  const toast = useToast();

  // Profile form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');  // Placeholder for additional field
  const [isUpdating, setIsUpdating] = useState(false);

  // Avatar placeholder state
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Notification preferences placeholder
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);

  // Two-factor authentication placeholder
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isEnablingTwoFactor, setIsEnablingTwoFactor] = useState(false);
  const [showTwoFactorQR, setShowTwoFactorQR] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  // Delete account state
  const [confirmDelete, setConfirmDelete] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Load user data when session is available
  useEffect(() => {
    if (isAuthenticated && session?.user) {
      if (session.user.name) setName(session.user.name);
      if (session.user.email) setEmail(session.user.email);
      if (session.user.image) setAvatarUrl(session.user.image);
    }
  }, [session, isAuthenticated]);

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, bio }), // Added bio
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      // Update session data
      await update({ name });
      
      toast.success({
        title: 'Profile updated',
        description: 'Your profile information has been updated successfully.',
      });
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'An error occurred while updating your profile.',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Placeholder for avatar upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploadingAvatar(true);
    
    try {
      // Placeholder for avatar upload logic
      // In a real implementation, you would upload the file to your server or a storage service
      
      // Simulating upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success
      const mockUrl = URL.createObjectURL(files[0]);
      setAvatarUrl(mockUrl);
      
      toast.success({
        title: 'Avatar uploaded',
        description: 'Your profile picture has been updated successfully.',
      });
    } catch (error) {
      console.error('Avatar upload error:', error);
      toast.error({
        title: 'Upload failed',
        description: 'An error occurred while uploading your avatar.',
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error({
        title: 'Passwords do not match',
        description: 'Please make sure your new password and confirmation match.',
      });
      return;
    }
    
    setIsChangingPassword(true);
    
    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to change password');
      }
      
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      toast.success({
        title: 'Password changed',
        description: 'Your password has been changed successfully.',
      });
    } catch (error) {
      console.error('Password change error:', error);
      toast.error({
        title: 'Password change failed',
        description: error instanceof Error ? error.message : 'An error occurred while changing your password.',
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Placeholder for saving notification preferences
  const handleNotificationPreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingNotifications(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success({
        title: 'Preferences saved',
        description: 'Your notification preferences have been updated.',
      });
    } catch (error) {
      console.error('Notification preferences error:', error);
      toast.error({
        title: 'Failed to save preferences',
        description: 'An error occurred while saving your notification preferences.',
      });
    } finally {
      setIsSavingNotifications(false);
    }
  };

  // Placeholder for enabling two-factor authentication
  const handleEnableTwoFactor = async () => {
    setIsEnablingTwoFactor(true);
    
    try {
      // Simulating API call to get QR code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowTwoFactorQR(true);
    } catch (error) {
      console.error('Two-factor setup error:', error);
      toast.error({
        title: 'Two-factor setup failed',
        description: 'An error occurred while setting up two-factor authentication.',
      });
    } finally {
      setIsEnablingTwoFactor(false);
    }
  };

  // Placeholder for verifying two-factor authentication
  const handleVerifyTwoFactor = async () => {
    try {
      // Simulating API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTwoFactorEnabled(true);
      setShowTwoFactorQR(false);
      setTwoFactorCode('');
      
      toast.success({
        title: 'Two-factor enabled',
        description: 'Two-factor authentication has been enabled for your account.',
      });
    } catch (error) {
      console.error('Verification failed:', error);
      toast.error({
        title: 'Verification failed',
        description: 'The verification code is invalid or has expired.',
      });
    }
  };

  // Placeholder for disabling two-factor authentication
  const handleDisableTwoFactor = async () => {
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTwoFactorEnabled(false);
      
      toast.success({
        title: 'Two-factor disabled',
        description: 'Two-factor authentication has been disabled for your account.',
      });
    } catch (error) {
      console.error('Failed to disable 2FA:', error);
      toast.error({
        title: 'Failed to disable',
        description: 'An error occurred while disabling two-factor authentication.',
      });
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (confirmDelete !== 'DELETE') {
      toast.error({
        title: 'Confirmation required',
        description: 'Please type DELETE to confirm account deletion.',
      });
      return;
    }
    
    setIsDeleting(true);
    
    try {
      const response = await fetch('/api/user/account', {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete account');
      }
      
      // Sign out and redirect to home page
      router.push('/auth/signout?callbackUrl=/');
      
      toast.success({
        title: 'Account deleted',
        description: 'Your account has been deleted successfully.',
      });
    } catch (error) {
      toast.error({
        title: 'Delete failed',
        description: error instanceof Error ? error.message : 'An error occurred while deleting your account.',
      });
      setIsDeleting(false);
    }
  };

  // Loading state
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="w-16 h-16 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-muted">Loading...</p>
      </div>
    );
  }

  // Mock data for connected accounts
  const connectedAccounts = [
    { provider: 'google', connected: true, email: 'user@gmail.com' },
    { provider: 'github', connected: false, email: null },
    { provider: 'twitter', connected: false, email: null },
  ];

  // Mock data for activity log
  const activityLog = [
    { id: 1, action: 'Login', ip: '192.168.1.1', location: 'New York, USA', time: '2023-06-01T12:00:00Z', device: 'Chrome on Windows' },
    { id: 2, action: 'Password Changed', ip: '192.168.1.1', location: 'New York, USA', time: '2023-05-25T15:30:00Z', device: 'Chrome on Windows' },
    { id: 3, action: 'Profile Updated', ip: '192.168.1.1', location: 'New York, USA', time: '2023-05-20T09:15:00Z', device: 'Chrome on Windows' },
  ];

  // Format timestamp for activity log
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <DashboardLayout
      title="Account Settings"
      description="Manage your account details and preferences"
    >
      <Grid cols={{ sm: 1, lg: 2 }} gap={6}>
        {/* Profile Information */}
        <GridItem>
          <Card
            title="Profile Information"
            description="Update your account's profile information"
          >
            <form onSubmit={handleProfileUpdate} className="space-y-4 mt-4">
              {/* Avatar Upload Placeholder */}
              {ENABLE_AVATAR_UPLOAD && (
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center border border-border">
                      {avatarUrl ? (
                        <Image 
                          src={avatarUrl} 
                          alt="Profile" 
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl text-muted-foreground">
                          {name ? name[0].toUpperCase() : '?'}
                        </span>
                      )}
                    </div>
                    <label 
                      htmlFor="avatar-upload" 
                      className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                    </label>
                    <input 
                      id="avatar-upload" 
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                      disabled={isUploadingAvatar}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Profile Picture</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                    {isUploadingAvatar && (
                      <div className="text-xs text-primary mt-1">Uploading...</div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              {/* Bio - Additional Field Placeholder */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-foreground mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Tell us a little about yourself"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Brief description for your profile. URLs are hyperlinked.
                </p>
              </div>
              
              {/* Email (read-only) */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  readOnly
                  disabled
                  className="w-full p-2 border border-border rounded-md bg-muted"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Email cannot be changed. Please contact support if you need to update your email.
                </p>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" isLoading={isUpdating}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </GridItem>
        
        {/* Password Change */}
        <GridItem>
          <Card
            title="Change Password"
            description="Ensure your account is using a secure password"
          >
            <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
              {/* Current Password */}
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-foreground mb-1">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-foreground mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  minLength={8}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>
              
              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" isLoading={isChangingPassword}>
                  Change Password
                </Button>
              </div>
            </form>
          </Card>
        </GridItem>
      </Grid>
      
      {/* Notification Preferences Placeholder */}
      {ENABLE_NOTIFICATIONS && (
        <Card
          title="Notification Preferences"
          description="Manage how you receive notifications"
          className="mt-6"
        >
          <form onSubmit={handleNotificationPreferences} className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                </div>
                <div className="h-6 w-11 relative">
                  <input
                    type="checkbox"
                    id="email-notifications"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="email-notifications"
                    className={`
                      block w-11 h-6 rounded-full cursor-pointer transition-colors
                      ${emailNotifications ? 'bg-primary' : 'bg-muted'}
                    `}
                  >
                    <span
                      className={`
                        block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform
                        ${emailNotifications ? 'translate-x-5' : 'translate-x-1'}
                      `}
                    />
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Marketing Emails</h3>
                  <p className="text-xs text-muted-foreground">Receive updates on new features and promotions</p>
                </div>
                <div className="h-6 w-11 relative">
                  <input
                    type="checkbox"
                    id="marketing-emails"
                    checked={marketingEmails}
                    onChange={(e) => setMarketingEmails(e.target.checked)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="marketing-emails"
                    className={`
                      block w-11 h-6 rounded-full cursor-pointer transition-colors
                      ${marketingEmails ? 'bg-primary' : 'bg-muted'}
                    `}
                  >
                    <span
                      className={`
                        block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform
                        ${marketingEmails ? 'translate-x-5' : 'translate-x-1'}
                      `}
                    />
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" isLoading={isSavingNotifications}>
                Save Preferences
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      {/* Two-Factor Authentication Placeholder */}
      {ENABLE_TWO_FACTOR && (
        <Card
          title="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
          className="mt-6"
        >
          <div className="mt-4">
            {!twoFactorEnabled && !showTwoFactorQR ? (
              <div>
                <p className="text-muted-foreground mb-4">
                  Two-factor authentication adds an extra layer of security to your account by requiring more than just a password to sign in.
                </p>
                <Button
                  onClick={handleEnableTwoFactor}
                  isLoading={isEnablingTwoFactor}
                >
                  Enable Two-Factor Authentication
                </Button>
              </div>
            ) : showTwoFactorQR ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Scan this QR code with your authenticator app (like Google Authenticator or Authy), then enter the code below.
                </p>
                
                <div className="flex justify-center mb-4">
                  <div className="w-48 h-48 border border-border bg-muted rounded-md flex items-center justify-center">
                    <p className="text-xs text-center p-4">
                      [QR Code Placeholder]<br />
                      A real implementation would display a QR code here.
                    </p>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="verification-code" className="block text-sm font-medium text-foreground mb-1">
                    Verification Code
                  </label>
                  <input
                    id="verification-code"
                    type="text"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    className="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                  />
                </div>
                
                <div className="flex space-x-3">
                  <Button onClick={handleVerifyTwoFactor}>
                    Verify and Enable
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowTwoFactorQR(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center text-green-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Two-factor authentication is enabled</span>
                </div>
                <div className="mb-4">
                  <p className="text-muted-foreground">
                    Two-factor authentication is currently enabled for your account. You will need to enter a code from your authenticator app when signing in.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleDisableTwoFactor}
                >
                  Disable Two-Factor Authentication
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}
      
      {/* Connected Accounts Placeholder */}
      {ENABLE_ACCOUNT_LINKING && (
        <Card
          title="Connected Accounts"
          description="Link your account with social providers"
          className="mt-6"
        >
          <div className="mt-4 space-y-4">
            {connectedAccounts.map(account => (
              <div key={account.provider} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {account.provider === 'google' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="currentColor" />
                      </svg>
                    )}
                    {account.provider === 'github' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor" />
                      </svg>
                    )}
                    {account.provider === 'twitter' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill="currentColor" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium capitalize">{account.provider}</h3>
                    {account.connected && account.email && (
                      <p className="text-xs text-muted-foreground">{account.email}</p>
                    )}
                  </div>
                </div>
                {account.connected ? (
                  <Button 
                    variant="outline"
                    size="sm"
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    size="sm"
                  >
                    Connect
                  </Button>
                )}
              </div>
            ))}
            
            <div className="border-t border-border pt-4 text-xs text-muted-foreground">
              <p>
                Connecting accounts allows you to sign in with these providers and enhances the security of your account.
              </p>
            </div>
          </div>
        </Card>
      )}
      
      {/* Activity Log Placeholder */}
      {ENABLE_ACTIVITY_LOG && (
        <Card
          title="Account Activity"
          description="Recent activity on your account"
          className="mt-6"
        >
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted text-xs uppercase">
                  <tr>
                    <th className="px-4 py-2 text-left">Action</th>
                    <th className="px-4 py-2 text-left">Location</th>
                    <th className="px-4 py-2 text-left">Device</th>
                    <th className="px-4 py-2 text-left">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {activityLog.map((activity) => (
                    <tr key={activity.id} className="hover:bg-muted/50">
                      <td className="px-4 py-3">{activity.action}</td>
                      <td className="px-4 py-3">{activity.location}</td>
                      <td className="px-4 py-3">{activity.device}</td>
                      <td className="px-4 py-3">{formatTime(activity.time)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                View More Activity
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {/* Danger Zone */}
      <Card
        title="Danger Zone"
        description="Permanently delete your account and all data"
        className="mt-6 border-error/20"
      >
        <div className="mt-4">
          <p className="text-muted-foreground mb-4">
            Once you delete your account, there is no going back. This action is not reversible.
          </p>
          
          {!showDeleteConfirm ? (
            <Button 
              variant="destructive" 
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete Account
            </Button>
          ) : (
            <div className="border border-error/20 rounded-md p-4 bg-error/5">
              <p className="font-medium text-error mb-4">
                Are you sure you want to delete your account? All of your data will be permanently removed.
              </p>
              
              <div className="mb-4">
                <label htmlFor="confirmDelete" className="block text-sm font-medium text-foreground mb-1">
                  Type &quot;DELETE&quot; to confirm
                </label>
                <input
                  id="confirmDelete"
                  type="text"
                  value={confirmDelete}
                  onChange={(e) => setConfirmDelete(e.target.value)}
                  className="w-full p-2 border border-error/20 rounded-md focus:ring-2 focus:ring-error focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                  isLoading={isDeleting}
                >
                  Permanently Delete Account
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setConfirmDelete('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </DashboardLayout>
  );
} 