import { CodeBlock } from "@/components/marketing/CodeBlock";
import { describe } from "@/lib/docs/descriptions";
import { curlExample, errorsFor, responseExample } from "@/lib/docs/examples";
import type { ApiOperation } from "@/lib/docs/types";

import { ErrorTable, FieldTable, MethodBadge, QueryTable } from "./ParamTable";

function anchorFor(op: ApiOperation) {
  return `${op.method}-${op.path}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * One endpoint, documented the way you'd want to read it: what it does and what
 * it takes on the left, exactly what to send and exactly what comes back on the
 * right. The examples are generated from the server's own schema, so the field
 * names in the response panel are the field names you will actually receive.
 */
export function EndpointBlock({ op }: { op: ApiOperation }) {
  const curl = curlExample(op);
  const response = responseExample(op);
  const errors = errorsFor(op);
  const description = describe(op.method, op.path, op.description);

  const writable = op.requestFields.filter((f) => !f.readOnly);

  return (
    <section id={anchorFor(op)} className="scroll-mt-24 border-t border-[var(--color-line)] pt-10">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,430px)] xl:gap-10">
        {/* Prose */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-2.5" dir="ltr">
              <MethodBadge method={op.method} />
              <code className="break-all rounded-[8px] border border-[var(--color-line)] bg-white/[0.04] px-2.5 py-1 font-mono text-[13.5px] font-semibold text-[var(--color-ink)]">
                {op.path}
              </code>
            </div>
            {description && (
              <p className="text-[14.5px] leading-[1.65] text-[var(--color-muted)]">
                {description}
              </p>
            )}
          </div>

          {op.isList && <QueryTable params={op.query} />}
          {writable.length > 0 && (
            <FieldTable fields={writable} title="Body parameters" showRequired />
          )}
          {op.responseFields.length > 0 && (
            <FieldTable
              fields={op.responseFields}
              title={op.isList ? "Fields on each result" : "Response fields"}
            />
          )}
          <ErrorTable errors={errors} />
        </div>

        {/* Code */}
        <div className="flex flex-col gap-4 xl:sticky xl:top-[92px] xl:self-start">
          <CodeBlock label="Request" code={curl} />
          {response && (
            <CodeBlock
              label={
                response.omitted > 0
                  ? `Response · 200 · ${response.omitted} more fields below`
                  : "Response · 200"
              }
              code={response.json}
            />
          )}
          <CodeBlock
            label="Response · error"
            code={`{
  "error": {
    "code": 400,
    "message": "Validation failed.",
    "details": {
      "quantity": ["Must be greater than zero."]
    }
  }
}`}
          />
        </div>
      </div>
    </section>
  );
}
