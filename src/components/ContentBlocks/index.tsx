import type { ReactNode } from 'react';
import ExoticLink from '@/components/ExoticLink';
import Link from '@/components/Link';
import { type Block, type InlineNode, parseInline } from '@/content/blocks';

function InlineText({ value }: { value: string }): ReactNode {
  return parseInline(value).map((node: InlineNode, index) => {
    const key = `${index}-${node.text}`;

    if (!node.href) {
      return <span key={key}>{node.text}</span>;
    }

    // Internal routes keep client-side navigation; everything else (including
    // mailto:) goes through the plain anchor so target/rel stay correct.
    if (node.href.startsWith('/')) {
      return (
        <Link key={key} href={node.href} className="inline text-primary hover:text-primary/80">
          {node.text}
        </Link>
      );
    }

    return (
      <ExoticLink key={key} href={node.href} className="font-medium">
        {node.text}
      </ExoticLink>
    );
  });
}

function renderBlock(block: Block, index: number): ReactNode {
  const key = `${block.kind}-${index}`;

  switch (block.kind) {
    case 'heading':
      return block.level === 2 ? (
        <h2 key={key} className="mt-10 mb-3 text-2xl font-bold tracking-tight text-foreground">
          <InlineText value={block.text} />
        </h2>
      ) : (
        <h3 key={key} className="mt-6 mb-2 text-lg font-bold tracking-tight text-foreground">
          <InlineText value={block.text} />
        </h3>
      );

    case 'paragraph':
      return (
        <p key={key} className="mb-4 text-lg leading-8 text-muted-foreground">
          <InlineText value={block.text} />
        </p>
      );

    case 'list':
      return (
        <ul
          key={key}
          className="mb-4 list-disc space-y-2 pl-6 text-lg leading-8 text-muted-foreground"
        >
          {block.items.map((item, itemIndex) => (
            <li key={`${key}-${itemIndex}`}>
              <InlineText value={item} />
            </li>
          ))}
        </ul>
      );

    case 'code':
      return (
        <pre
          key={key}
          className="mb-4 overflow-x-auto rounded-md border border-border/40 bg-black/30 p-4 text-sm leading-6 text-muted-foreground"
        >
          <code>{block.code}</code>
        </pre>
      );

    case 'definitions':
      return (
        <dl key={key} className="mb-4 space-y-3 text-lg leading-8 text-muted-foreground">
          {block.items.map((item, itemIndex) => (
            <div key={`${key}-${itemIndex}`}>
              <dt className="font-bold text-foreground">
                <InlineText value={item.term} />
              </dt>
              <dd>
                <InlineText value={item.description} />
              </dd>
            </div>
          ))}
        </dl>
      );
  }
}

export default function ContentBlocks({ blocks }: { blocks: Block[] }) {
  return <>{blocks.map(renderBlock)}</>;
}
