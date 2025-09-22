[![banner](/public/banner.png)](https://github.com/hlint/violetjs)

[English](https://github.com/hlint/violetjs/blob/main/README.md) | 中文

[VioletJS](https://github.com/hlint/violetjs) 是一个现代化的全栈 React 框架，基于 Vite 构建，具有 SSR/SSG 支持，内置数据库、身份验证、类型安全 API 和全面的工具链。

## 📑 目录

- [特性](#-特性)
- [快速开始](#-快速开始)
- [文档](#-文档)
- [为什么选择 VioletJS？](#-为什么选择-violetjs)
- [贡献](#-贡献)
- [许可证与支持](#-许可证与支持)
- [致谢](#-致谢)

## 🎉 特性

- **全栈框架**：支持 SSR、SSG、SPA，基于 Express + Vite
- **运行时**：Bun（快速的 JavaScript 运行时）
- **数据库**：Drizzle ORM + SQLite
- **身份验证**：Auth.js
- **API**：oRPC 类型安全的客户端/服务端
- **UI**：Radix UI + Tailwind CSS + shadcn/ui
- **国际化**：Lingui
- **主题**：浅色/深色主题 + 自定义调色板
- **PWA**：Vite PWA 插件，支持自动更新
- **状态管理**：Zustand + SWR + Immer
- **表单**：React Hook Form + Zod 验证
- **测试**：Vitest
- **代码检查**：Biome
- **部署**：Docker + 独立构建

## 🚀 快速开始

**前置条件**：安装 [Bun](https://bun.sh)。

```bash
# 1. 安装依赖
bun ci

# 2. 环境配置
cp .env.example .env

# 3. 启动开发服务器
bun dev
```

开发服务器将在 `http://localhost:3000` 运行。

## 📚 文档

> **注意**：文档正在开发中。请查看代码库和内联注释了解实现细节。

## 🤔 为什么选择 VioletJS？

### 💡 设计初衷

虽然 `Next.js` 提供了强大的功能，但其黑盒特性和与 Vercel 的紧密集成可能会带来限制。VioletJS 提供了一个全面、轻量且透明的替代方案，让您完全掌控应用程序。

### ✨ 简单透明

没有隐藏的魔法或复杂的约定。基于 Vite 和 Express 构建，一切都是可定制和易于理解的。

### ⚡ 直观的 SSR

简单的数据准备 → React 组件渲染：

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

### 🔄 灵活的 SSG

按需生成静态页面，支持手动缓存更新：

```js
export function getPostList() {
  // 获取数据逻辑
}

export function updatePost(id, title, content) {
  // 更新逻辑
  ssgUpdate(["/post/list"]);
}
```

### 🔗 SPA 友好

使用标准的 React 模式，配合浏览器路由和状态管理。优雅地处理缺失的 `ssrData`：

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

## 🤝 贡献

我们欢迎贡献！请按照以下步骤：

1. Fork 仓库
2. 创建您的功能分支 (`git checkout -b feature/your-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/your-feature`)
5. 开启 Pull Request

## 📄 许可证与支持

本项目采用 MIT 许可证 - 详情请查看 [LICENSE](./LICENSE) 文件。

**支持渠道：**

- 🐛 **Bug 报告**：[GitHub Issues](https://github.com/hlint/violetjs/issues)
- 💡 **功能请求**：[GitHub Discussions](https://github.com/hlint/violetjs/discussions)

## 🙏 致谢

VioletJS 基于这些出色的开源项目构建：

- [Vite](https://vitejs.dev/) - 闪电般快速的构建工具
- [React](https://reactjs.org/) - UI 库
- [Express](https://expressjs.com/) - Web 框架
- [Drizzle](https://orm.drizzle.team/) - TypeScript ORM
- [Auth.js](https://authjs.dev/) - 身份验证
- [oRPC](https://orpc.io/) - 类型安全的 RPC
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Radix UI](https://www.radix-ui.com/) - 无头 UI 组件
- [Bun](https://bun.sh/) - 快速的 JavaScript 运行时
