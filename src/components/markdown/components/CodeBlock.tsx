import React from 'react';
import { textColors, bgColors, cn } from '../../../styles/colors';

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function CodeBlock() {
  return {
    code: ({
      inline,
      className = '',
      children,
      ...props
    }: CodeProps & { node?: any }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      
      // Explicit check: if inline prop exists and is true, OR if there's no language AND no pre parent
      // Triple backticks will be wrapped in <pre>, single backticks won't
      const isInline = inline === true || (inline !== false && !language && !className);
      
      // Single backticks = inline code
      if (isInline && typeof children === 'string' && !children.includes('\n')) {
        return (
          <code 
            className={cn(
              'px-1 py-0.5 rounded text-sm font-mono',
              bgColors.dark, textColors.light
            )}
            {...props}
          >
            {children}
          </code>
        );
      }

      return ( 
        <div className={cn('my-4 rounded-lg overflow-hidden', bgColors.dark)}>
          {language && (
            <div className={cn('px-4 py-1 text-sm font-mono text-left text-center', bgColors.dark, textColors.light)}>
              {language}
            </div>
          )}
          <pre className={cn('p-4 overflow-x-auto text-left', bgColors.dark, textColors.light)}>
            <code className={`no-scrollbar language-${language}`} {...props}>
              {children}
            </code>
          </pre>
        </div>
      )
    },
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
      <div className="my-4">
        <pre {...props}>
          {children}
        </pre>
      </div>
    ),
  };
}