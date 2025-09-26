[![banner](/public/banner.png)](https://github.com/hlint/violetjs)

English | [中文](https://github.com/hlint/violetjs/blob/main/README.zh-CN.md)

[VioletJS](https://github.com/hlint/violetjs) is a modern full-stack React framework powered by Vite, featuring SSR/SSG support with built-in database, authentication, type-safe APIs, and comprehensive tooling.

## 📑 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Documentation](#-documentation)
- [Why VioletJS?](#-why-violetjs)
- [Contributing](#-contributing)
- [License & Support](#-license--support)
- [Acknowledgments](#-acknowledgments)

## 🎉 Features

- **Full-Stack**: SSR, SSG, ISR, SPA with Express + Vite
- **Runtime**: Bun (fast JavaScript runtime)
- **Database**: Drizzle ORM with SQLite
- **Auth**: Auth.js
- **API**: oRPC type-safe client/server
- **UI**: Radix UI + Tailwind CSS + shadcn/ui
- **i18n**: Lingui
- **Theme**: Light/Dark + custom palettes
- **PWA**: Vite PWA plugin with auto-update
- **State**: Zustand + SWR + Immer
- **Forms**: React Hook Form + Zod validation
- **Testing**: Vitest
- **Linting**: Biome
- **Deploy**: Docker + standalone builds

## 🚀 Quick Start

**Prerequisites**: Install [Bun](https://bun.sh).

```bash
# 1. Install dependencies
bun ci

# 2. Environment setup
cp .env.example .env

# 3. Start development server
bun dev
```

The development server will be running at `http://localhost:3000`.

## 📚 Documentation

> **Note**: Documentation is currently in development. Explore the codebase and inline comments for implementation details.

## 🤔 Why VioletJS?

### 💡 The Motivation

While `Next.js` offers powerful functionality, its black-box nature and tight Vercel integration can be limiting. VioletJS provides a comprehensive, lightweight, and transparent alternative with full control over your application.

### ✨ Simple & Transparent

No hidden magic or complex conventions. Built with Vite and Express, everything is customizable and easy to understand.

### ⚡ Straightforward SSR

Route-based server-side data loading with nested routes and middleware support:

```js
// src/routes-server.tsx
{
  path: "post/list",
  ssrHandle: async ({ ssrData }) => {
    ssrData.swrFallback["/post/list"] = await call(getPosts, null);
  },
}
```

### 🔄 Flexible SSG and ISR

Generate static pages automatically with on-demand updates:

```js
// src/routes-server.tsx
{
  path: "post/:post_id",
  ssg: true,
  isr: true,
}

// Regenerate static pages after data updates
function updatePost(id, title, content) {
  // Update data...
  updatePageCaches(["/post/list", `/post/${id}`]);
}
```

### 🔗 Data Management with SWR

Use SWR for data fetching with automatic SSR data and client-side caching:

```jsx
import useSWR from "swr";
import { orpc } from "@/lib/orpc-client";

export default function PostListPage() {
  const { data: posts, mutate } = useSWR(
    "/demo/post/list",
    orpc.demo.post.getPosts
  );

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License & Support

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

**Support Channels:**

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/hlint/violetjs/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/hlint/violetjs/discussions)

## 🙏 Acknowledgments

VioletJS is built on top of these amazing open-source projects:

- [Vite](https://vitejs.dev/) - Lightning-fast build tool
- [React](https://reactjs.org/) - UI library
- [Express](https://expressjs.com/) - Web framework
- [Drizzle](https://orm.drizzle.team/) - TypeScript ORM
- [Auth.js](https://authjs.dev/) - Authentication
- [oRPC](https://orpc.io/) - Type-safe RPC
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Bun](https://bun.sh/) - Fast JavaScript runtime
