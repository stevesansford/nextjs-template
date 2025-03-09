# Next.js Template Layout System Documentation

This document provides detailed guidance on using the layout system implemented in this Next.js template.

## Table of Contents

1. [Overview](#overview)
2. [Layout Components](#layout-components)
3. [Navigation Components](#navigation-components)
4. [Content Components](#content-components)
5. [UI Components](#ui-components)
6. [Usage Examples](#usage-examples)
7. [Theme Switching](#theme-switching)
8. [Responsive Design](#responsive-design)

## Overview

The layout system provides a modular, responsive structure for building your application with consistent design patterns. The system consists of several key component categories:

- **Layout Components**: Main structures for different sections of your application
- **Navigation Components**: Various navigation options for different device sizes
- **Content Components**: Containers and organization tools for page content
- **UI Components**: Reusable interface elements

## Layout Components

### AppLayout

The main layout for authenticated application areas with sidebar navigation.

```tsx
import AppLayout from '@/components/layouts/AppLayout';

export default function DashboardPage() {
  return (
    <AppLayout 
      title="Dashboard" 
      description="Welcome to your personal dashboard"
    >
      {/* Page content goes here */}
    </AppLayout>
  );
}
```

### AuthLayout

Centered layout optimized for authentication pages like login and signup.

```tsx
import AuthLayout from '@/components/layouts/AuthLayout';

export default function LoginPage() {
  return (
    <AuthLayout 
      title="Sign In" 
      subtitle="Welcome back! Please enter your details."
      showBackLink={true}
    >
      {/* Login form goes here */}
    </AuthLayout>
  );
}
```

### DashboardLayout

An extension of AppLayout with dashboard-specific features like breadcrumbs and action buttons.

```tsx
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function AnalyticsPage() {
  return (
    <DashboardLayout 
      title="Analytics"
      showBreadcrumbs={true}
      showActions={true}
      actions={<button>Export Data</button>}
    >
      {/* Dashboard content goes here */}
    </DashboardLayout>
  );
}
```

### MarketingLayout

Layout for public marketing pages with customizable header and footer.

```tsx
import MarketingLayout from '@/components/layouts/MarketingLayout';

export default function LandingPage() {
  return (
    <MarketingLayout 
      transparentHeader={true}
      darkHeader={true}
    >
      {/* Landing page content goes here */}
    </MarketingLayout>
  );
}
```

## Navigation Components

### Sidebar

Main navigation sidebar that collapses on mobile devices.

```tsx
import Sidebar from '@/components/navigation/Sidebar';

// This is typically used internally by AppLayout
// You only need to use it directly for custom layouts
<Sidebar 
  isOpen={sidebarOpen} 
  onClose={handleCloseSidebar}
  isMobile={isMobile}
/>
```

### TopNav

Top navigation bar with search, notifications, and user menu.

```tsx
import TopNav from '@/components/navigation/TopNav';

// This is typically used internally by AppLayout
// You only need to use it directly for custom layouts
<TopNav 
  onMenuClick={toggleSidebar} 
  title="Dashboard" 
/>
```

### MobileNav

Bottom tab navigation for mobile devices.

```tsx
import MobileNav from '@/components/navigation/MobileNav';

// This is automatically included in AppLayout for mobile devices
// You only need to use it directly for custom layouts
{isMobile && <MobileNav />}
```

## Content Components

### Container

Standard content container with consistent width and padding.

```tsx
import Container from '@/components/ui/Container';

<Container size="lg" padding={true} centered={true}>
  {/* Content with consistent max width and padding */}
</Container>
```

### Card

Content card for displaying information in a contained box.

```tsx
import Card from '@/components/ui/Card';

<Card 
  title="User Statistics"
  description="Overview of user engagement metrics"
  footer={<button>View all</button>}
  isHoverable={true}
>
  {/* Card content */}
</Card>
```

### Grid

Responsive grid system for complex layouts.

```tsx
import { Grid, GridItem } from '@/components/ui/Grid';

<Grid cols={{ sm: 1, md: 2, lg: 3 }} gap={4}>
  <GridItem colSpan={1}>Item 1</GridItem>
  <GridItem colSpan={{ md: 2 }}>Item 2 (spans 2 columns on md+)</GridItem>
  <GridItem>Item 3</GridItem>
</Grid>
```

## UI Components

### Button

Versatile button component with various styles and states.

```tsx
import Button from '@/components/ui/Button';

<Button 
  variant="primary" 
  size="md"
  isLoading={isSubmitting}
  leftIcon={<IconName />}
>
  Submit
</Button>

// Link variant
<Button href="/dashboard" variant="outline">
  Go to Dashboard
</Button>
```

### Modal

Dialog component for displaying content that requires user attention.

```tsx
import Modal from '@/components/ui/Modal';

<Modal 
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Confirm Action"
  footer={
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </div>
  }
>
  <p>Are you sure you want to perform this action?</p>
</Modal>
```

### Toast

Toast notifications for providing feedback to users.

```tsx
import { useToast } from '@/components/ui/Toast';

function MyComponent() {
  const toast = useToast();
  
  const handleSubmit = async () => {
    try {
      // Perform action
      toast.success({
        title: 'Success!',
        description: 'Your action was completed successfully.'
      });
    } catch (error) {
      toast.error({
        title: 'Error',
        description: error.message
      });
    }
  };
  
  return (
    <Button onClick={handleSubmit}>Submit</Button>
  );
}
```

## Usage Examples

### Complete Dashboard Page

```tsx
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Card from '@/components/ui/Card';
import { Grid, GridItem } from '@/components/ui/Grid';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  return (
    <DashboardLayout 
      title="Dashboard"
      showActions={true}
      actions={
        <Button 
          variant="primary" 
          leftIcon={<RefreshIcon />}
        >
          Refresh
        </Button>
      }
    >
      <Grid cols={{ sm: 1, md: 2, lg: 4 }} gap={6}>
        <Card title="Total Users" isHoverable>
          <h3 className="text-3xl font-bold">1,234</h3>
          <p className="text-muted-foreground">+12% from last month</p>
        </Card>
        
        <Card title="Revenue" isHoverable>
          <h3 className="text-3xl font-bold">$45,678</h3>
          <p className="text-muted-foreground">+8% from last month</p>
        </Card>
        
        <Card title="Conversion" isHoverable>
          <h3 className="text-3xl font-bold">2.4%</h3>
          <p className="text-muted-foreground">+0.5% from last month</p>
        </Card>
        
        <Card title="Avg. Session" isHoverable>
          <h3 className="text-3xl font-bold">3m 45s</h3>
          <p className="text-muted-foreground">-0.2% from last month</p>
        </Card>
      </Grid>
      
      <div className="mt-6">
        <Grid cols={{ sm: 1, lg: 2 }} gap={6}>
          <GridItem>
            <Card 
              title="Recent Activity"
              description="Latest actions from your users"
              footer={<Button variant="link">View all activity</Button>}
            >
              {/* Activity list content */}
            </Card>
          </GridItem>
          
          <GridItem>
            <Card 
              title="Performance Overview"
              description="Key metrics for the last 30 days"
            >
              {/* Chart content */}
            </Card>
          </GridItem>
        </Grid>
      </div>
    </DashboardLayout>
  );
}
```

### Login Page Example

```tsx
import AuthLayout from '@/components/layouts/AuthLayout';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export default function LoginPage() {
  const toast = useToast();
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Authentication logic...
    toast.success({ title: 'Logged in successfully!' });
  };
  
  return (
    <AuthLayout 
      title="Sign In" 
      subtitle="Welcome back! Please enter your details."
      showBackLink={true}
      backLinkText="Back to home"
      backLinkHref="/"
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input 
            type="password" 
            className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
            placeholder="Enter your password"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm">Remember me</label>
          </div>
          
          <a href="/auth/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </a>
        </div>
        
        <Button type="submit" isFullWidth>Sign In</Button>
        
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <a href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}
```

## Theme Switching

The layout system supports multiple themes through the ThemeProvider. You can access and toggle the theme in any component:

```tsx
import { useTheme } from '@/lib/theme/theme-provider';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button 
      onClick={() => setTheme(theme.mode === 'dark' ? 'gray' : 'dark')}
      className="p-2 rounded-full hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      {theme.mode === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
```

### Available Themes

The system includes four built-in themes:

1. **Light Gray** (`gray`): A clean, professional light theme with gray tones and blue accents
2. **Dark Slate** (`dark`): A sleek, modern dark theme with slate blue tones
3. **Warm** (`warm`): A warmer light theme with orange and pink accents
4. **Cozy Dark** (`cozy-dark`): A cozy dark theme with amber and purple accents

You can switch between themes using the `setTheme` function with the theme ID:

```tsx
setTheme('gray');   // Switch to Light Gray theme
setTheme('dark');   // Switch to Dark Slate theme
setTheme('warm');   // Switch to Warm theme
setTheme('cozy-dark'); // Switch to Cozy Dark theme
```

## Responsive Design

All components in the layout system are built with responsive design in mind. They adapt to different screen sizes using Tailwind CSS breakpoints:

- `sm`: 640px and above
- `md`: 768px and above
- `lg`: 1024px and above
- `xl`: 1280px and above
- `2xl`: 1536px and above

The responsive behavior is handled automatically, but you can customize it using responsive props like in the Grid component:

```tsx
<Grid cols={{ sm: 1, md: 2, lg: 3, xl: 4 }} gap={4}>
  {/* Content adapts to different screen sizes */}
</Grid>
```

For mobile devices, the layout system switches between navigation styles automatically:
- Desktop: Sidebar navigation with top bar
- Mobile: Bottom tab navigation with off-canvas sidebar

---

This layout system is designed to be modular and flexible. Feel free to customize and extend it to meet your application's specific needs. 