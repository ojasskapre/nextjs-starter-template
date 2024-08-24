import 'katex/dist/katex.min.css';
import { FC, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { CodeBlock } from './CodeBlock';

const MemoizedReactMarkdown: FC<{ content: string }> = memo(
  ({ content }) => {
    const preprocessContent = (content: string) => {
      return content
        .replace(/\\\[([\s\S]*?)\\\]/g, (_, equation) => `$$${equation}$$`) // Process block-level LaTeX
        .replace(/\\\(([\s\S]*?)\\\)/g, (_, equation) => `$${equation}$`) // Process inline LaTeX
        .replace(/(sandbox|attachment|snt):/g, ''); // Remove unwanted prefixes
    };

    const processedContent = preprocessContent(content);

    return (
      <ReactMarkdown
        className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words custom-markdown"
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <CodeBlock
                language={match?.[1] || ''}
                value={String(children).replace(/\n$/, '')}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-100">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside ml-5 text-neutral-700 dark:text-neutral-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside ml-5 text-neutral-700 dark:text-neutral-300">
              {children}
            </ol>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-neutral-800 border-collapse">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-700 text-left text-neutral-900 dark:text-neutral-100">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300">
              {children}
            </td>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-600 pl-4 italic text-neutral-600 dark:text-neutral-400">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="border-t border-neutral-300 dark:border-neutral-600 my-4" />
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    );
  },
  (prevProps, nextProps) => prevProps.content === nextProps.content
);

MemoizedReactMarkdown.displayName = 'MemoizedReactMarkdown';

export default MemoizedReactMarkdown;
