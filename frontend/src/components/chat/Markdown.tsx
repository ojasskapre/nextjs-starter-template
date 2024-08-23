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
