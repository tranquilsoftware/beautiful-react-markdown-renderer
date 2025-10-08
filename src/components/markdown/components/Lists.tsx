import React from 'react';
import { useMarkdown } from '../context/MarkdownContext';
import { textColors, cn } from '../../../styles/colors';

export default function Lists() {
  const { contentAlignment } = useMarkdown();
 
  const getAlignmentClass = () => {
    return {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }[contentAlignment] || 'text-left';
  };

  return {
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => {
      const ulElement = (
        <ul
          className={cn('list-disc pl-6 mb-4 space-y-2', textColors.primary)}
          {...props}
        />
      );

      // Regular lists get alignment wrapper
      return (
        <div className={getAlignmentClass()}>
          {ulElement}
        </div>
      );
    },
    ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
      <div className={getAlignmentClass()}>
        <ol
          className={cn('list-decimal pl-6 mb-4 space-y-2', textColors.primary)}
          {...props}
        />
      </div>
    ),
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
      <li
        className="mb-1"
        {...props}
      />
    ),
    // Make checkboxes clickable
    input: (props: React.InputHTMLAttributes<HTMLInputElement>) => {
      if (props.type === 'checkbox') {
        return (
          <input
            {...props}
            disabled={false}
            className="mr-2 cursor-pointer"
          />
        );
      }
      return <input {...props} />;
    },
  };
}