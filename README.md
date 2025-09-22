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

- **Full-Stack**: SSR, SSG, SPA with Express + Vite
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

Simple data preparation → React component rendering:

```js
export default async function ssrLoader(url, context) {
  const ssrData = {};
  const user = context.user;
  ssrData.user = user;

  if (url === "/post/list") {
    const list = await getPostList();
    ssrData.postList = list;
  }

  return ssrData;
}
```

### 🔄 Flexible SSG

Generate static pages on-demand with manual cache updates:

```js
export function getPostList() {
  // Fetch data logic
}

export function updatePost(id, title, content) {
  // Update logic
  ssgUpdate(["/post/list"]);
}
```

### 🔗 SPA-Friendly

Use standard React patterns with browser routing and state management. Handle missing `ssrData` gracefully:

```jsx
import { useEffect } from "react";

export default function MyApp() {
  const [postList, setPostList] = useState(getSsrData()?.postList);

  useEffect(() => {
    if (!postList) {
      getPostList().then(setPostList);
    }
  }, [postList]);

  return <PostListComponent postList={postList || []} />;
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
