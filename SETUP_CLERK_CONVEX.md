# Setting Up Clerk-Convex Integration

To fix the authentication error between Clerk and Convex, follow these steps:

## 1. Set up a JWT Template in Clerk Dashboard

1. **Log in to your Clerk Dashboard** at [https://dashboard.clerk.dev/](https://dashboard.clerk.dev/)
2. **Select your application** (where it shows "heroic-wolf-14")
3. Go to **JWT Templates** in the left sidebar
4. **Click "New template"**
5. Set the following:
   - **Name**: `convex` (exactly this name is required)
   - **Claims**: Add the following JSON:
   ```json
   {
     "sub": "{{user.id}}",
     "name": "{{user.full_name}}",
     "email": "{{user.primary_email_address}}"
   }
   ```
   - **Signing algorithm**: `RS256`
6. **Save the template**

## 2. Add Convex Configuration in your project

In your `.env.local` file (or create one if it doesn't exist), add:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## 3. Update Convex configuration

1. Create or update `convex/auth.config.js`:

```javascript
export default {
  providers: [
    {
      domain: "https://heroic-wolf-14.clerk.accounts.dev/",
      applicationID: "convex",
    },
  ],
};
```

2. Restart your development server after making these changes

This should resolve the authentication issue between Clerk and Convex.
