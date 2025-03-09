# Next.js AI Application Template

A reusable foundation for building AI-enabled web applications with Next.js. This template includes pre-configured essential components to eliminate repetitive setup tasks when starting new projects.

## Key Features

- **Next.js with TypeScript and TailwindCSS** foundation
- **Authentication system** using NextAuth.js with email/password and OAuth support
- **Role-based access control** with admin dashboard for user management
- **Database integration** with Postgres and Prisma ORM
- **Flexible AI provider abstraction layer** allowing easy switching between OpenAI and Anthropic
- **Consistent layout system** with reusable components
- **Theming system** with customizable color palettes and multiple built-in themes (light gray, dark slate)
- **Ready-to-use auth pages** (login, register, password reset)
- **Core database schema** for user management
- **Protected routes** with middleware-based authentication checks
- **Dashboard with AI chatbot integration** demonstrating the provider abstraction layer
- **Complete authentication flow** with automatic redirects and user state management

## Comprehensive Layout System

The template includes a modular, responsive layout system that provides consistent structure and navigation across different types of pages in your application.

### Layout Components

- **AppLayout**: Main authenticated application layout with sidebar and top navigation
- **AuthLayout**: Centered, card-based layout for login, registration, and other authentication pages
- **DashboardLayout**: Extension of AppLayout with dashboard-specific features like breadcrumbs and action buttons
- **MarketingLayout**: Layout for public marketing pages with customizable header and footer

### Navigation Components

- **Sidebar**: Collapsible sidebar navigation that adapts to different screen sizes
- **TopNav**: Top navigation bar with search, notifications, and user menu
- **MobileNav**: Bottom tab navigation for mobile devices

### Content Containers

- **Container**: Standardized content container with consistent width and padding
- **Card**: Versatile card component for displaying content in contained blocks
- **Grid/GridItem**: Responsive grid system for complex layouts

### UI Components

- **Button**: Versatile button component with different styles and states
- **Modal**: Dialog component for displaying content that requires user attention
- **Toast**: Notification system for providing feedback to users

### Usage Examples

Each layout is designed for specific use cases:

```tsx
// Marketing/public pages
import MarketingLayout from '@/components/layouts/MarketingLayout';

export default function HomePage() {
  return (
    <MarketingLayout>
      {/* Page content */}
    </MarketingLayout>
  );
}

// Authentication pages
import AuthLayout from '@/components/layouts/AuthLayout';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign In"
      subtitle="Welcome back!"
      showBackLink={true}
    >
      {/* Login form */}
    </AuthLayout>
  );
}

// Dashboard/authenticated pages
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Welcome to your dashboard"
    >
      {/* Dashboard content */}
    </DashboardLayout>
  );
}
```

For more detailed documentation on the layout system, see the [Layout System Documentation](src/docs/LayoutSystem.md).

## Purpose

This template accelerates development of new AI-powered applications by providing a robust starting point with best practices already implemented. Focus on building unique features rather than repetitive infrastructure work. The template is designed to be flexible enough to support various types of AI applications while maintaining a clean, maintainable architecture.

## Authentication System

The template includes a complete authentication system built with NextAuth.js, providing secure user management with both credentials (email/password) and OAuth options.

### Key Features

- **Email/Password Authentication**: Secure login with password hashing
- **User Registration**: Complete flow for creating new accounts
- **Password Reset**: Forgot password and reset functionality
- **Session Management**: JWT-based sessions with proper TypeScript types
- **OAuth Ready**: Easy to add social login providers
- **TypeScript Integration**: Full type safety for auth data
- **Prisma Integration**: Database models for users, accounts, sessions
- **Responsive UI**: Mobile-friendly auth pages with TailwindCSS
- **Protected Routes**: Middleware-based route protection for authenticated areas
- **Authentication Flow**: Automatic redirects based on authentication state
- **Email Verification**: Account validation through email verification links
- **Security Features**: Account recovery and identity verification workflows

### Authentication Flow

1. **Sign Up**: New users register with email/password and receive a verification email
2. **Email Verification**: Users verify their account by clicking a link sent to their email
3. **Sign In**: Verified users can authenticate with credentials or OAuth providers
4. **Password Reset**: Users can request a password reset link via email if they forget their password
5. **Protected Routes**: Authenticated users can access the dashboard and other protected areas
6. **Route Protection**: Unauthenticated users are redirected to the login page
7. **Authenticated Redirects**: Already authenticated users are redirected away from auth pages

### Email Verification System

The template includes a comprehensive email verification system:

- **Verification on Registration**: When users register, a verification token is generated and stored
- **Verification Email**: A verification link is sent to the user's email (implementation ready for your email service)
- **Verification API Endpoint**: Processes verification tokens and updates user accounts
- **Success/Error Pages**: User-friendly feedback on verification status
- **Resend Verification**: Users can request a new verification email if needed
- **Optional Enforcement**: Configurable option to require email verification before login

```typescript
// Example of enforcing email verification in auth config
// In src/app/api/auth/[...nextauth]/route.ts

async authorize(credentials) {
  // Authentication logic...
  
  // Check if email is verified before allowing login
  if (!user.emailVerified) {
    throw new Error("email-not-verified");
  }
  
  return user;
}
```

### Password Reset Functionality

The template includes a secure password reset flow:

- **Forgot Password Page**: User-friendly form to request a password reset link
- **Reset Token Generation**: Secure token creation and storage for password resets
- **Email Delivery**: Ready to integrate with your email service to deliver reset links
- **Reset Password Form**: Validated form for creating a new password
- **Token Verification**: Checks for token validity and expiration
- **Success Confirmation**: Clear feedback on successful password reset

The password reset process flow:

1. User requests password reset by entering their email
2. A secure reset token is generated and stored with expiration
3. A reset link containing the token is sent to the user's email
4. User clicks the link and is taken to a password reset form
5. After submitting a new password, the token is validated and the password is updated
6. User is redirected to the login page with confirmation of successful reset

### Authentication Error Handling

The template includes comprehensive error handling for all authentication-related processes:

- **Dedicated Error Pages**: Clear and user-friendly error explanations
- **Error Types**: Specific handling for different error scenarios including:
  - Invalid credentials
  - Account access issues
  - Email verification requirements
  - Expired or invalid tokens
  - Server errors
- **Recovery Options**: Each error page includes appropriate recovery actions
- **User Guidance**: Contextual help based on the specific error encountered

Error pages provide users with clear next steps, whether they need to verify their email, request a new verification link, reset their password, or contact support.

### Dashboard Page

The template includes a fully-featured dashboard page that:

- Displays the authenticated user's profile information
- Shows a welcome message with the user's name or email
- Provides sign-out functionality
- Includes the AI chat integration component
- Features proper loading states while checking authentication
- Automatically redirects unauthenticated users to the login page

### Route Protection Middleware

The authentication system uses Next.js middleware to protect routes:

```typescript
// Routes that require authentication
const protectedRoutes = ['/dashboard', '/account'];

// Routes that require admin role
const adminRoutes = ['/dashboard/admin'];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/auth/signin', '/auth/signup'];

export async function middleware(request: NextRequest) {
  // Check if the route requires protection
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route));
  
  // Get the session token
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !token) {
    const url = new URL('/auth/signin', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  // Check admin routes - must have token and admin role
  if (isAdminRoute) {
    if (!token) {
      const url = new URL('/auth/signin', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    
    // Check if user has admin role
    if (!isAdminRole(token.role)) {
      // Redirect non-admin users to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  // Redirect to dashboard if accessing auth routes while logged in
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}
```

### Database Schema

The authentication system uses the following Prisma models:

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  password      String?
  image         String?
  role          UserRole  @default(USER) // User role for access control
  timeZone      String?   @default("UTC") // User's preferred time zone
  country       String?   @default("US")  // User's country code
  theme         String?   // User's preferred theme (light/dark)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
}

// UserRole enum for role-based access control
enum UserRole {
  USER
  ADMIN
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

### Adding OAuth Providers

To add social login, update the providers array in `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
// Example of adding GitHub OAuth
import GithubProvider from "next-auth/providers/github";

// Inside authOptions.providers array:
GithubProvider({
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
}),
```

## AI Provider Abstraction Layer

The template includes a flexible AI provider abstraction layer that allows you to easily switch between different AI providers (currently OpenAI and Anthropic) using environment variables. 

### Key Benefits

- **Provider Agnostic**: Write code once that works with any supported AI provider
- **Consistent Interface**: Same API for all providers, simplifying development 
- **Easy to Extend**: Add new providers by implementing the AIProvider interface
- **Streaming Support**: Handle both streaming and non-streaming responses

### Usage Examples

Basic text generation:

```typescript
import { generateText } from '@/lib/ai';

// Generate text from the default provider (controlled by env vars)
const response = await generateText({
  prompt: 'Explain quantum computing in simple terms',
  temperature: 0.7,
  maxTokens: 500,
});
```

Streaming responses:

```typescript
import { generateTextStream } from '@/lib/ai';

// Stream the response from the AI
const stream = generateTextStream({
  prompt: 'Write a short story about a programmer',
  temperature: 0.8,
});

for await (const chunk of stream) {
  console.log(chunk.text);
  
  if (chunk.done) {
    console.log('Stream complete');
    break;
  }
}
```

See the [AI Provider documentation](src/lib/ai/README.md) for more detailed information and examples.

## Theming System

The template includes a comprehensive theming system that provides a consistent and customizable visual experience across the application.

### Key Features

- **Multiple Built-in Themes**: Includes light gray, dark slate, warm, and cozy-dark presets
- **CSS Variables**: Semantic naming system for colors and UI properties
- **TailwindCSS Integration**: Theme variables available through Tailwind classes
- **Client-side Theme Switching**: Switch themes without page reload
- **Persistent Preferences**: User theme choices saved to localStorage
- **System Theme Detection**: Automatically adapt to user's system preference
- **Theme Components**: Ready-to-use `ThemeToggle` components in various styles
- **Type Safety**: Full TypeScript support for theme configuration
- **Optimized Performance**: Efficient theme application without direct DOM manipulation
- **Clean Implementation**: No !important flags or redundant styling
- **Maintainable Architecture**: Clear separation between theme definition and application

### Theme Architecture

The template includes a complete theming system with:

1. **CSS Variables**: Core theme values defined as CSS custom properties
2. **Theme Configuration**: Defined in `theme.ts` with TypeScript typing
3. **Theme Provider**: React context managing theme state and persistence
4. **Color Manipulation Utilities**: Functions for working with theme colors
5. **Theme Toggle Components**: UI elements for switching themes
6. **Tailwind Integration**: Styling primarily through Tailwind utility classes

The theming system follows these principles:

- **CSS-First Approach**: Relies on CSS variables and classes rather than JavaScript-based styling
- **Declarative Components**: Components reference theme variables through Tailwind classes
- **Performance Optimization**: Avoids direct DOM manipulation and redundant theme applications
- **Maintainable Structure**: Clear separation between theme definition and usage
- **Future-Ready**: Designed to be compatible with more advanced solutions if needed

### Usage Examples

#### Accessing Theme in Components

```tsx
import { useTheme } from '@/lib/theme/theme-provider';

function ThemeAwareComponent() {
  const { theme, setTheme, availableThemes } = useTheme();
  
  return (
    <>
      <p>Current theme: {theme.name}</p>
      <button onClick={() => setTheme('dark')}>
        Switch to Dark Theme
      </button>
    </>
  );
}
```

#### Using Theme-aware Tailwind Classes

```jsx
// These elements automatically adapt to the current theme
<div className="bg-background text-foreground">
  <h1 className="text-primary-600">Themed Heading</h1>
  <p className="text-muted">This text uses the muted color from the theme</p>
  <button className="bg-primary text-white hover:bg-primary-600">
    Themed Button
  </button>
</div>
```

#### Adding Theme Toggle to Your UI

```jsx
import { LightDarkToggle, ThemeToggle } from '@/components/theme/ThemeToggle';

function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1>My App</h1>
      <nav>
        {/* Simple light/dark toggle */}
        <LightDarkToggle />
        
        {/* Or full theme selector with all themes */}
        <ThemeToggle showName={true} />
      </nav>
    </header>
  );
}
```

#### Adding a New Theme

To create a custom theme, add it to the themes array in `src/lib/theme/theme.ts`:

```typescript
export const themes: Record<string, ThemeColors> = {
  // ... existing themes ...
  'custom-theme': {
    name: 'My Custom Theme',
    id: 'custom-theme',
    mode: 'light', // or 'dark'
    colors: {
      primary: '#4f46e5', // Your primary color
      secondary: '#06b6d4',
      background: '#ffffff',
      foreground: '#0f172a',
      muted: '#f1f5f9',
      accent: '#dbeafe',
      card: '#ffffff',
      border: '#e2e8f0',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    }
  },
};
```

#### Theme Demo Page

The template includes a Theme Demo page at `/theme-demo` that showcases:

- All available themes with switchers
- Color palette samples for the current theme
- UI component examples with theme colors
- Different theme toggle component variants

You can use this page to preview themes and test your custom theme additions.

### Theme Configuration

```bash
# Theme (Optional)
NEXT_PUBLIC_DEFAULT_THEME=gray  # Default theme (options: gray, dark, warm, cozy-dark)
```

## Built-in Themes

The template comes with four built-in themes:

### Light Gray (Default)
A clean, professional light theme with gray tones, featuring:
- Modern gray color palette with blue accents
- Excellent readability with proper contrast
- White card backgrounds with subtle gray borders
- Clear status indicators for success, warnings, and errors

### Dark Slate
A sleek, modern dark theme with slate blue tones:
- Rich slate background that's easy on the eyes
- Bright blue accents that stand out against the dark backdrop
- Subtle depth with multi-tone slate backgrounds
- Brighter status colors for better visibility in dark environments

### Warm (Alternative Light)
A warmer alternative to the default light theme:
- Orange primary colors with pink accents
- Cream background for reduced eye strain
- Warm-tinted UI elements

### Cozy Dark (Alternative Dark)
A cozier alternative to the default dark theme:
- Amber and purple accents
- Dark brown backgrounds
- Warmer tone dark mode for evening use

## Next.js Configuration

The template includes a pre-configured `next.config.ts` file with essential optimizations that benefit most web applications:

### Included Configurations

- **Image Optimization**
  - Modern format support (WebP, AVIF) for better compression and quality
  - Automatically serves images in optimal formats based on browser support
  - Reduces bandwidth usage and improves loading times

- **Security Headers**
  - Comprehensive set of security best practices applied to all routes
  - Protection against common web vulnerabilities
  - Includes content security policy, XSS protection, and more
  - Improved security posture out-of-the-box

- **Performance Optimizations**
  - SWC minification for faster builds
  - React Strict Mode enabled to identify potential issues
  - Removal of X-Powered-By header for slightly better security

### Additional Configuration Examples

The configuration file also includes commented examples for:

- **Internationalization (i18n)** - For supporting multiple languages
- **URL Handling** - For redirects and rewrites
- **Experimental Features** - For enabling newer Next.js capabilities

These examples can be easily uncommented and customized when your application needs these features.

### Customization

To customize the Next.js configuration:

1. Open `next.config.ts` in the root directory
2. Modify the existing configurations or uncomment and adapt the example sections
3. Add domain names to the images configuration if your app uses external image sources
4. Restart the development server to apply changes

## Getting Started

1. Clone this repository
2. Install dependencies with `npm install`
3. Copy `.env.example` to `.env.local` and fill in the required environment variables
4. Set up a PostgreSQL database and update the `DATABASE_URL` in `.env.local`
5. Run `npx prisma migrate dev` to create the database tables
6. Run the development server with `npm run dev`
7. Open [http://localhost:3000](http://localhost:3000) in your browser

### Using the Application

1. **Sign Up**: Create a new account at [http://localhost:3000/auth/signup](http://localhost:3000/auth/signup)
2. **Email Verification**: Check your email for a verification link (shown in console in development)
3. **Sign In**: Log in at [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin) after verifying your email
4. **Forgot Password**: If needed, reset your password at [http://localhost:3000/auth/forgot-password](http://localhost:3000/auth/forgot-password)
5. **Access Dashboard**: Once authenticated, you'll be redirected to the dashboard
6. **Try the AI Chat**: Use the ChatBot component in the dashboard to interact with the configured AI provider
7. **Customize Settings**: Visit the settings page at [http://localhost:3000/dashboard/settings](http://localhost:3000/dashboard/settings) to set your time zone, country, and theme preferences
8. **Admin Dashboard**: For users with the admin role, access the admin dashboard at [http://localhost:3000/dashboard/admin](http://localhost:3000/dashboard/admin) to manage users
9. **Switch Providers**: Change the `NEXT_PUBLIC_AI_PROVIDER` in `.env.local` between 'openai' and 'anthropic' to test different providers
10. **Explore Themes**: Visit the Theme Demo page at [http://localhost:3000/theme-demo](http://localhost:3000/theme-demo) to preview and test different themes

## Environment Variables

See `.env.example` for the required environment variables and their descriptions.

### Required for Authentication

```
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database?schema=public"

# OAuth (Optional)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
# Add other OAuth providers as needed
```

### AI Provider Configuration

```
# AI Provider
NEXT_PUBLIC_AI_PROVIDER=openai  # or anthropic
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
```

### Theme Configuration

```bash
# Theme (Optional)
NEXT_PUBLIC_DEFAULT_THEME=gray  # Default theme (options: gray, dark, warm, cozy-dark)
```

### Email Service Configuration

For password reset and email verification features to work in production, you'll need to configure an email service:

```
# Email Service (for password reset and verification)
# For development, the email links are logged to the console
# For production, configure your email service:
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email-username
EMAIL_SERVER_PASSWORD=your-email-password
EMAIL_FROM=no-reply@example.com
```

## Adding a New AI Provider

To add a new AI provider:

1. Implement the `AIProvider` interface in a new file
2. Add the provider type to the `AIProviderType` enum in `types.ts`
3. Update the factory function in `factory.ts` to handle the new provider
4. Update the `getDefaultConfig` function in `index.ts` to support the new provider

## User Settings

The template includes a complete user settings system with:

- **Settings Page**: A dedicated page at `/dashboard/settings` for users to manage their preferences
- **Regional Settings**: Time zone and country selection for localization
- **Theme Preferences**: Visual theme selection with immediate preview
- **API Endpoint**: Backend API at `/api/user/settings` for saving user preferences
- **Database Schema**: Extended User model with fields for storing preferences

### User Settings Features

The settings system allows users to:

1. **Set Time Zone**: Choose from common time zones for accurate time display throughout the application
2. **Select Country**: Set country preference for localization and regional content
3. **Choose Theme**: Toggle between light and dark themes with immediate visual feedback
4. **Save Preferences**: Store settings in the database for persistence across sessions and devices

### Database Schema for Settings

The User model has been extended with the following fields:

```prisma
timeZone  String?  @default("UTC") // User's preferred time zone
country   String?  @default("US")  // User's country code
theme     String?  // User's preferred theme (light/dark)
```

These fields store the user's preferences and are used throughout the application to provide a personalized experience.

## Role-Based Access Control

The template includes a role-based access control system with:

- **User Roles**: Built-in USER and ADMIN roles with enum in the database
- **Admin Dashboard**: Administrative interface for managing users
- **User Management**: View, filter, and delete users through the admin interface
- **Middleware Protection**: Route protection based on user roles
- **Helper Functions**: Utility functions for role checking and authorization

### Admin Features

The admin dashboard provides:

1. **User Overview**: Table of all users with key information like email, name, and role
2. **User Management**: Ability to delete users through a confirmation modal
3. **Pagination**: Handling of large user lists with paginated results
4. **Role Display**: Visual indicators for different user roles
5. **Protected Access**: Admin-only access through multiple layers of security checks

### Setting Up Admin Users

To promote a user to admin status:

1. After creating the user, access your database directly or use a database management tool
2. Update the user's role to 'ADMIN' in the database
3. The user will now have access to the admin dashboard at `/dashboard/admin`

All admin pages are automatically protected by both:
- Server-side authorization in the layout components
- Middleware checks on route access attempts

## License

MIT