import { Code, Pre } from 'nextra/components';
import { useData } from 'nextra/data';
import { getHighlighter, renderToHtml } from 'shiki';

import type { Highlighter, Lang, Theme } from 'shiki';

type SourceCodeProps = {
  /** The name of the file in the `docs/example` directory. */
  fileName: string;
  theme?: Theme;
};

/**
 * Render a code block with the source of `docs/example/${props.fileName}`,
 * highlighted using nextra code blocks.
 *
 * Requires `getStaticProps` from the MDX file using `lib/getExampleStaticProps`
 * to export the examples source code.
 *
 * @example
 *
 *```mdx
 *Some markdown rendering the source code of `example1.tsx` and `example2.tsx`.
 *
 *<SourceCode fileName="example1.tsx" />
 *<SourceCode fileName="example2.tsx" />
 *
 *export const getStaticProps = () => getExampleStaticProps(['example1.tsx', 'example2.tsx']);
 *```
 */
export function SourceCode(props: SourceCodeProps) {
  const { fileName, theme } = props;

  const examples = useData();

  const html = examples[fileName]
    .replace(/<\/?pre[^>]*>/, '')
    .replace('</code>', '')
    .replace('<code>', '');

  return (
    <Pre data-theme="default" data-language="tsx">
      <Code
        data-theme={theme}
        data-language="tsx"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Pre>
  );
}

let highlighter: Highlighter;

async function highlightCode(code: string, lang: Lang) {
  const theme = 'css-variables';
  if (!highlighter) {
    highlighter = await getHighlighter({
      langs: [lang],
      theme
    });
  }
  const themedTokens = highlighter.codeToThemedTokens(code, lang, theme);
  const html = renderToHtml(themedTokens);
  return html;
}

/** Creates the `getStaticProp` function to use the given file names in the SourceCode component. */
export async function getSourceCodeStaticProps(fileNames: string[]) {
  const highlightedExamples: Record<string, string> = {};

  for (const fileName of fileNames) {
    const raw = await import(`!!raw-loader!../examples/${fileName}`);
    const html = await highlightCode(raw.default, 'tsx');
    highlightedExamples[fileName] = html;
  }
  return {
    props: {
      ssg: highlightedExamples
    }
  };
}