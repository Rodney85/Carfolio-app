# CarMods - The Linktree for Car Builds

CarMods is a centralized platform for car enthusiasts and content creators to showcase their vehicle builds, modifications, and affiliate product links—all through a single, shareable profile.

## Features

- **Profile Management**: Custom URLs (username.carmods.app), bio, social links, and theme customization
- **Car Build Showcase**: Add multiple cars with specs and categorized modification lists
- **Affiliate Monetization**: Include affiliate links with your mods
- **Analytics Dashboard**: Track profile views, car clicks, and top-performing mods

## Tech Stack

- **Frontend**: React + Vite, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Convex (real-time database)
- **Authentication**: Clerk
- **Storage**: Backblaze B2
- **Payments**: Paystack

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/carmods.git
   cd carmods
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   VITE_CONVEX_URL=your_convex_url
   ```

4. Start the development server
   ```
   npm run dev
   ```

## Project Structure

- `/src/components` - UI components organized by feature
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility functions
- `/src/convex` - Database schema and API
- `/src/types` - TypeScript type definitions

## License

MIT


