import type { Thing, WithContext } from "schema-dts";

interface JsonLdProps {
  schema: WithContext<Thing> | WithContext<Thing>[];
}

// Server component — renders JSON-LD script tag with no client JS.
export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
