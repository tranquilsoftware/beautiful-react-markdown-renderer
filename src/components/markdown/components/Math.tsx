import { cn } from '../../../styles/colors';
import 'katex/dist/katex.min.css';
/**
 * Math component for rendering LaTeX math expressions
 * 
 * USAGE NOTES:
 * 
 * Install dependencies:
 *    npm install remark-math rehype-katex katex
 *
 * Import KaTeX CSS in your main file:
 *    import 'katex/dist/katex.min.css';
 * 
 * MARKDOWN EXAMPLES:
 * 
 * Inline: $E = mc^2$
 * Block: $$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$
 */
export default function Math() {
  return {
    /**
     * Inline math: $E = mc^2$
     * Renders within text flow
     */
    inlineMath: ({ value, ...props }: any) => {
      return (
        <span 
          className={cn(
            'inline-math',
            'text-purple-700 dark:text-purple-400',
            'font-medium'
          )}
          {...props}
        >
          {value}
        </span>
      );
    },
    
    /**
     * Block math: $$...$$
     * Renders as standalone block with custom styling
     */
    math: ({ value, ...props }: any) => {
      return (
        <div 
          className={cn(
            'math-block my-6 p-6 rounded-xl',
            'bg-gradient-to-br from-purple-50 to-indigo-50',
            'dark:from-purple-950/30 dark:to-indigo-950/30',
            'border-2 border-purple-200 dark:border-purple-800',
            'overflow-x-auto shadow-sm'
          )}
          {...props}
        >
          <div className="flex justify-center">
            <div className="text-purple-900 dark:text-purple-100">
              {value}
            </div>
          </div>
        </div>
      );
    }
  };
}