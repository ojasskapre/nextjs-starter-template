'use client';

import { Check, Copy, Download } from 'lucide-react';
import { FC, memo } from 'react';
import { Prism, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import {
  coldarkDark,
  coldarkCold,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useTheme } from 'next-themes';
import { useCopyToClipboard } from './hooks/useCopyToClipboard';

// TODO: Remove this when @type/react-syntax-highlighter is updated
const SyntaxHighlighter = Prism as unknown as FC<SyntaxHighlighterProps>;

interface Props {
  language: string;
  value: string;
}

interface languageMap {
  [key: string]: string | undefined;
}

export const programmingLanguages: languageMap = {
  javascript: '.js',
  python: '.py',
  java: '.java',
  c: '.c',
  cpp: '.cpp',
  'c++': '.cpp',
  'c#': '.cs',
  ruby: '.rb',
  php: '.php',
  swift: '.swift',
  'objective-c': '.m',
  kotlin: '.kt',
  typescript: '.ts',
  go: '.go',
  perl: '.pl',
  rust: '.rs',
  scala: '.scala',
  haskell: '.hs',
  lua: '.lua',
  shell: '.sh',
  sql: '.sql',
  html: '.html',
  css: '.css',
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};

export const generateRandomString = (length: number, lowercase = false) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXY3456789'; // excluding similar looking characters like Z, 2, I, 1, O, 0
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};

const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const { theme } = useTheme();

  const downloadAsFile = () => {
    if (typeof window === 'undefined') {
      return;
    }
    const fileExtension = programmingLanguages[language] || '.file';
    const suggestedFileName = `file-${generateRandomString(
      3,
      true
    )}${fileExtension}`;
    const fileName = window.prompt('Enter file name' || '', suggestedFileName);

    if (!fileName) {
      // User pressed cancel on prompt.
      return;
    }

    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(value);
  };

  return (
    <div className="codeblock relative w-full bg-neutral-200 dark:bg-neutral-800 font-sans">
      <div className="flex w-full items-center justify-between bg-neutral-100 dark:bg-neutral-900 px-6 py-2 pr-4 text-neutral-900 dark:text-neutral-100">
        <span className="text-xs lowercase">{language}</span>
        <div className="flex items-center space-x-1">
          <button
            onClick={downloadAsFile}
            className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-300 hover:dark:bg-neutral-600 transition duration-150 ease-in-out"
          >
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </button>
          <button
            onClick={onCopy}
            className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-300 hover:dark:bg-neutral-600 transition duration-150 ease-in-out"
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy code</span>
          </button>
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? coldarkDark : coldarkCold}
        PreTag="div"
        showLineNumbers
        customStyle={{
          width: '100%',
          background: 'transparent',
          padding: '1.5rem 1rem',
          borderRadius: '0.5rem',
        }}
        codeTagProps={{
          style: {
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)',
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
});
CodeBlock.displayName = 'CodeBlock';

export { CodeBlock };
