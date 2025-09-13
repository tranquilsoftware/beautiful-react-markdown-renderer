# 🎨 Beautiful React Markdown Renderer

A powerful, feature-rich React component specifically designed to create **beautiful blog posts** in markdown format with a **strong focus on SEO**. Transform your markdown content into stunning, search-engine optimised (SEO) articles with comprehensive metadata extraction and beautiful styling.

## ✨ Features

- **📝 YAML Frontmatter Support**: Extract SEO metadata directly from markdown files
- **🖼️ Rich Media Components**: Custom markdown syntax for images, videos, galleries, and iframes
- **🎯 Table of Contents**: Auto-generated navigation with smooth scrolling
- **🌙 Dark/Light Theme**: Built-in theme switching with system preference detection
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS
- **⚡ Performance Optimised**: Efficient rendering with React hooks and context
- **🎨 Customisable**: Easy to extend with custom components and styling

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd beautiful-react-markdown-renderer

# Install dependencies
npm install

# Start development server
npm run dev
```

### Basic Usage

```tsx
import { MarkdownRenderer } from './src/components/markdown/MarkdownRenderer';

const markdownContent = `
---
title: "My Blog Post"
description: "A comprehensive guide to markdown rendering"
author: "John Doe"
publishedDate: "2024-01-15"
tags: ["markdown", "react", "blog"]
---

# Welcome to My Blog Post

This is a **beautiful** markdown renderer with custom components!

<img src="https://example.com/image.jpg" alt="Example image" />

<youtube id="dQw4w9WgXcQ" title="Example Video" />
`;

function App() {
  return (
    <MarkdownRenderer content={markdownContent} showToc={true} />
  );
}
```

## 📝 YAML Frontmatter

Add metadata to your markdown files using YAML frontmatter:

```markdown
---
title: "Understanding Biblical Archaeology"
description: "A comprehensive overview of archaeological evidence supporting biblical narratives"
author: "Dr. Sarah Johnson"
publishedDate: "2024-01-15"
modifiedDate: "2024-01-20"
readTime: "8 min read"
category: "Archaeology"
tags: ["archaeology", "bible", "evidence", "history"]
image: "https://example.com/archaeology-image.jpg"
featured: true
draft: false
---

# Your content starts here...
```

### Available Frontmatter Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Post title for SEO and display |
| `description` | String | Meta description (under 160 chars) |
| `author` | String | Post author name |
| `publishedDate` | String | Publication date (YYYY-MM-DD) |
| `modifiedDate` | String | Last modification date (YYYY-MM-DD) |
| `readTime` | String | Estimated reading time |
| `category` | String | Post category |
| `tags` | Array | Array of tags for filtering |
| `image` | String | Featured image URL |
| `featured` | Boolean | Whether to feature this post |
| `draft` | Boolean | Whether this is a draft |

## 🎨 Custom Markdown Components

### 1. Images with Captions

```markdown
<img src="https://i.imgur.com/CdnTZ20.png" alt="Tranquil Software" />
```

**Features:**
- Responsive width (`w-full`)
- Automatic height (`h-auto`)
- Rounded corners (`rounded-lg`)
- Caption display below image
- Theme-aware styling

### 2. YouTube Videos

```markdown
<youtube id="dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up" />
```

**Features:**
- Responsive 16:9 aspect ratio
- Full YouTube embed with controls
- Rounded corners container
- Fullscreen support enabled

### 3. Iframe Embeds (Google Maps, etc.)

```markdown
<iframe src="https://www.google.com/maps/embed?KEYS" title="Tranquil Software" />
```

**Features:**
- Fixed height (`h-96`)
- Full width responsive
- Rounded corners
- Fullscreen support

### 4. Image Galleries

```markdown
<imagegallery 
  title="My Photo Collection" 
  images='[{"src": "https://placehold.co/600x400/png", "alt": "Tranquil Software"}]' 
/>
```

#### Advanced Gallery Options

```markdown
<imagegallery 
  title="Archaeological Findings" 
  images='[
    {"src": "https://placehold.co/600x400/png", "alt": "Tranquil Software"},
    {"src": "https://placehold.co/600x400/png", "alt": "Tranquil Software"}
  ]' 
  fullWidth={true}
  centerThumbnails={true}
  thumbnailOptions='{"width": 300, "height": 200, "borderRadius": 8, "gap": 16}'
/>
```

#### Gallery Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | String | "" | Gallery title |
| `images` | Array | [] | Array of image objects with `src` and `alt` |
| `fullWidth` | Boolean | false | Whether gallery should take full width |
| `centerThumbnails` | Boolean | false | Whether to center thumbnails |
| `thumbnailOptions` | Object | {...} | Thumbnail customization options |

#### Thumbnail Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | Number | 200 | Thumbnail width |
| `height` | Number | 150 | Thumbnail height |
| `borderRadius` | Number | 8 | Corner radius |
| `gap` | Number | 12 | Spacing between thumbnails |

## 🏗️ Component Architecture

### Core Components

```
MarkdownRenderer (Main entry point)
├── MarkdownProvider (Context provider)
├── MarkdownContentWrapper (Layout + TOC)
│   ├── TableOfContents (Navigation)
│   └── MarkdownContent (ReactMarkdown wrapper)
│       ├── Headings (h1-h6 with TOC registration)
│       ├── Text (paragraphs, links, emphasis)
│       ├── Lists (ul, ol, li)
│       ├── CodeBlock (syntax highlighting)
│       ├── Table (responsive tables)
│       └── Media (custom components)
└── ThemeContext (Dark/Light mode)
```

### Supporting Components

- **ThemeContext.tsx**: Manages dark/light theme state
- **useToc.ts**: Hook for table of contents functionality
- **markdownParser.ts**: Parses YAML frontmatter and extracts metadata
- **SEO.tsx**: Handles meta tags and SEO optimization

## 🔄 Data Flow

```
Markdown File (.md)
    ↓
markdownParser.ts (extracts metadata + content)
    ↓
[slug].tsx (loads post data + metadata)
    ↓
BlogPost.tsx (wraps with ReadMeter)
    ↓
MarkdownRenderer.tsx (renders markdown)
    ↓
Individual Components (Headings, Text, Lists, etc.)
    ↓
Final Rendered HTML + CSS + Theme
```

## 🎨 Styling System

### Color System

```typescript
// colors.ts
export const textColors = {
  primary: 'text-gray-900 dark:text-gray-100',
  secondary: 'text-gray-600 dark:text-gray-400',
  muted: 'text-gray-500 dark:text-gray-500',
  // ... more colors
};

export const bgColors = {
  primary: 'bg-white dark:bg-gray-900',
  secondary: 'bg-gray-50 dark:bg-gray-800',
  // ... more colors
};
```

### CSS Structure

```
src/
├── components/
│   ├── markdown/
│   │   ├── MarkdownRenderer.tsx
│   │   ├── components/
│   │   │   ├── Headings.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── Lists.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   ├── Table.tsx
│   │   │   └── Media.tsx
│   │   ├── context/
│   │   │   └── ThemeContext.tsx
│   │   ├── hooks/
│   │   │   └── useToc.ts
│   │   └── markdownParser.ts
│   └── blog/
│       ├── BlogPage.tsx
│       ├── BlogPost.tsx
│       └── [slug].tsx
├── lib/
│   ├── utils.ts
│   └── colors.ts
└── styles/
    └── markdown.css
```

## 🛠️ Development

### Project Structure

```
beautiful-react-markdown-renderer/
├── public/
│   ├── assets/
│   ├── favicon/
│   └── posts/
├── src/
│   ├── components/
│   ├── data/
│   ├── lib/
│   └── pages/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 📚 API Reference

### MarkdownRenderer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | String | "" | Markdown content to render |
| `showToc` | Boolean | false | Whether to show table of contents |
| `className` | String | "" | Additional CSS classes |

### useToc Hook

```typescript
const { registerHeading, activeHeading } = useToc();
```

### parseMarkdownWithFrontmatter

```typescript
const { metadata, content } = parseMarkdownWithFrontmatter(markdown);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. Free forever. Tranquil Software certified. ❤️

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Markdown parsing with [ReactMarkdown](https://github.com/remarkjs/react-markdown)

---

**Made with ❤️ for beautiful markdown rendering by Tranquil Software**