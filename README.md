# violetjs

A full-stack ReactJS development framework powered by Vite, featuring SSR and SSG support, along with built-in database, authentication, oRPC, and other feature integrations.

## Quick Start

### 1. Install dependencies

```bash
bun ci
```

### 2. Some Configurations

```bash
cp .env.example .env
```

### 3. Start the development server

```bash
bun dev
```

### 4. Build the application

```bash
bun run build
```

## Why VioletJS?

### The Motivation

I love `Next.js`'s functionality, but its black-box nature, complex concepts, and tight Vercel integration were frustrating. So I built VioletJS - a comprehensive framework that's lightweight, transparent, and fully controllable.

### Simple(?) & Transparent

No hidden magic or confusing conventions like `shadcn-ui`. Everything is built with vite and express, you can easily customize it.

### Straightforward SSR

Prepare `ssrData` → pass to React component. That's it.

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

### Flexible SSG

Generate static pages when needed, update cache manually.

```js
export const function getPostList() {
	// ...
}

export const function updatePost(id, title, content) {
	// ...
  ssgUpdate(["/post/list"]);
}

```

### SPA-Friendly

Use browser router and state management (Zustand, etc.) like any React app. Just handle missing `ssrData`.

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
