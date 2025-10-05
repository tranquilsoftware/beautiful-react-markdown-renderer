import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { MarkdownProvider, useMarkdown } from './context/MarkdownContext';
import Headings from './components/Headings';
import Text from './components/Text';
import Lists from './components/Lists';
import CodeBlock from './components/CodeBlock';
import Table from './components/Table';
import Media from './components/Media';
import TableOfContents from './components/TableOfContents';
import 'highlight.js/styles/github-dark.css';


// colours headings based on tailwind config and light/dark mode
import '../../styles/markdown.css';
import MermaidDiagram from './components/MermaidDiagram';
import Math from './components/Math';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export interface MarkdownRendererProps {
  content: string;
  className?: string;
  contentAlignment?: 'left' | 'center' | 'right';
  headingAlignment?: 'left' | 'center' | 'right';
  showToc?: boolean;
  enableMath?: boolean;
}

// Modular markdown styling interface
export interface MarkdownStyling {
  className: string;
  styles: {
    headings: {
      color: string;
      fontWeight?: string;
    };
    paragraph: {
      paddingTop: string;
      paddingBottom: string;
    };
  };
}

// Centralized styling configuration using Tailwind config values
export class MarkdownStylingConfig {
  static getStyles(): MarkdownStyling {
    return {
      className: 'reactMarkDown',
      styles: {
        headings: {
          color: 'text-accent', // This contains 'text-accent dark:text-accent-dark' for light/dark mode
          fontWeight: '700'  // For h3 specifically
        },
        paragraph: {
          paddingTop: '0.25rem',  // py-1 equivalent
          paddingBottom: '0.25rem' // py-1 equivalent
        }
      }
    };
  }
}

const MarkdownContent: React.FC<{ content: string; className?: string; enableMath?: boolean }> = ({ content, className, enableMath }) => {
  const styles = MarkdownStylingConfig.getStyles();
  return (
    <div className={`${styles.className} markdown ${className}`}>
      <ReactMarkdown
        rehypePlugins={[
          rehypeRaw, 
          rehypeHighlight,
          ...(enableMath ? [rehypeKatex] : [])
        ]}
        remarkPlugins={[
          remarkGfm,
          ...(enableMath ? [remarkMath] : [])
        ]}
        components={{
          ...Headings(),
          ...Text(),
          ...Lists(),
          ...CodeBlock(),
          ...Table(),
          ...Media(),
          ...MermaidDiagram(),
          ...Math(),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const MarkdownContentWrapper: React.FC<{ content: string; className?: string; showToc?: boolean; enableMath?: boolean }> = ({ content, className, showToc, enableMath }) => {
  const { hasEnoughSpaceForToc } = useMarkdown();
  const shouldShowToc = showToc && hasEnoughSpaceForToc;

  console.log('shouldShowToc 2', shouldShowToc);
  console.log('hasEnoughSpaceForToc 2', hasEnoughSpaceForToc);

  return (
    <div className="relative w-full">
      <div className="max-w-4xl mx-auto px-4 relative">
        {shouldShowToc && (
          <div className="hidden lg:block absolute right-full pr-8 w-64 top-0 h-full">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </div>
        )}
        <div className="w-full">
          <MarkdownContent
          content={content}
          className={className}
          enableMath={enableMath}
          />
        </div>
      </div>
    </div>
  );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
  contentAlignment = 'left',
  headingAlignment = 'left',
  showToc = true,
  enableMath = true,
}) => {
  return (
    <MarkdownProvider
      contentAlignment={contentAlignment}
      headingAlignment={headingAlignment}
      showToc={showToc}
    >
      <MarkdownContentWrapper
        content={content}
        className={className}
        showToc={showToc}
        enableMath={enableMath}
      />
    </MarkdownProvider>
  );
};

export default MarkdownRenderer;