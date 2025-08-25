# violetjs

A full-stack ReactJS development framework powered by Vite, featuring SSR and SSG support, along with built-in database, authentication, oRPC, and other feature integrations.

## Quick Start

### 1. Install dependencies

```bash
bun ci
```

### 2. Start the development server

```bash
bun dev
```

### 3. Build the application

```bash
bun run build
```

## Why VioletJS?

- **The Motivation**: I love Next.js's functionality, but its black-box nature, complex concepts, and tight Vercel integration were frustrating. So I built VioletJS - a comprehensive framework that's lightweight, transparent, and fully controllable.

- **Simple(?) & Transparent**: No hidden magic or confusing conventions. Like shadcn-ui, everything is open source and customizable.

- **Straightforward SSR**: Prepare `ssrData` → pass to React component. That's it.

- **Flexible SSG**: Generate static pages when needed, update cache manually.

- **SPA-Friendly**: Use browser router and state management (Zustand, etc.) like any React app. Just handle missing `ssrData`.
