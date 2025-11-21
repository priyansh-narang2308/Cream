# Cream

Cream is a modern, real-time messaging and video calling web app built with Next.js, React and Convex. It bundles a polished UI (Tailwind + Radix), in-app video/voice using Stream Video SDK, realtime data via Convex, and authentication with Clerk.

## Key features

- Real-time messaging and presence
- Video calling and meeting rooms (Stream Video SDK integration)
- Authenticated routes and user management via Clerk
- Responsive, accessible UI components built with Radix and Tailwind CSS
- Convex for realtime backend and data syncing
- TypeScript-first developer experience

## Tech stack

- Next.js 16 (React 19)
- React + TypeScript
- Tailwind CSS (v4) + Radix UI primitives
- Convex (realtime backend)
- Stream Video & Stream Chat
- Clerk for authentication
- Zod + react-hook-form for validation/forms

## Quick start

Prerequisites:

- Node.js 18+ (or newer LTS)
- npm or pnpm

Install and run locally:

```bash
# install
npm install

# run development server
npm run dev
```

Open http://localhost:3000 after the dev server starts.

Notes:

- This project uses Convex for realtime storage. If you run a local Convex dev environment, start it before running the Next dev server. See the Convex docs for `convex dev` usage.
- Some features require API/service keys (Stream, Clerk). Provide the required env variables in a .env.local file. Example env names are listed below.

## Environment variables (example)

Create a `.env.local` (not committed) and add keys required by your setup. Typical variables used by apps like this include:

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- CLERK_SECRET_KEY
- CONVEX_URL (or use local `convex dev`)
- STREAM_API_KEY and STREAM_API_SECRET (for Stream Video/Chat - only on server)

Adjust names and usage to match the project's actions and provider setup.

## Project structure (high level)

- `app/` - Next.js app directory (routes, layouts, pages)
  - `dashboard/` - main authenticated area and video call routes
- `components/` - shared UI components (header, sidebar, cards, etc.)
- `components/ui/` - design system and primitives (Radix wrappers, form controls)
- `convex/` - Convex functions, schema and generated client
- `lib/` - helpers, stream server utilities, custom logic
- `hooks/` - custom React hooks
- `actions/` - server actions, background tasks

This repo follows a feature-first layout inside `app/`, with a design system in `components/ui` for reuse.

## Development notes & tips

- Linting: `npm run lint` (uses ESLint)
- Build for production: `npm run.build` and `npm run start` to run the compiled app
- Tailwind v4 is configured; adjust `globals.css` if adding new utilities
- Use `use-debounce`, `use-...` hooks in `hooks/` for optimized UI behavior. There are some TODOs in the code (e.g., sidebar hover scaling) — check components for small UI fixes.

## Convex

The project includes a `convex/` folder with schema and generated files. Typical workflow:

1. Install and login to Convex CLI (if you need local dev): https://convex.dev
2. Run `convex dev` for local development (if you rely on a local Convex instance)
3. Deploy Convex functions when ready: `convex deploy` (refer to your Convex project docs)

## Authentication

Clerk is included (`@clerk/nextjs`). See the `provider/` and `components` files for integration points. Configure Clerk keys in env variables to enable login, user sync and protected routes.

## Streaming & Video

Stream Video SDK is used for calls. Check `lib/stream.ts` and `lib/streamServer.ts` for helper functions and server-side token generation.

## Contributing

Contributions are welcome! Suggested workflow:

1. Fork the repo
2. Create a feature branch
3. Add tests for new behavior where practical
4. Open a PR with a clear description of the change

Please keep changes small and focused. If adding a new service integration, document required env variables and setup steps.

## Troubleshooting

- If pages fail to load, confirm `npm install` completed without errors and that required env variables are present.
- If Convex-related errors appear, start local Convex or confirm remote Convex URL is correct.

## License & contact

This repo doesn't declare a license file. If you want to add one, a popular choice is the MIT license. Add `LICENSE` to the repo and update this section.

If you want me to tailor the README further (add screenshots, CI/CD, or exact env variable names and examples), tell me which parts you want and I will update the file.

---

