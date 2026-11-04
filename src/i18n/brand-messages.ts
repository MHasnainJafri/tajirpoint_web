import { brand } from "@/lib/config/brand";

/**
 * The message catalogues (messages/*.json) say "Tajir Point" and our hosts in
 * plain text. For another brand they are rewritten when they are loaded:
 * the name, the hosts and the mailbox follow the brand layer. A brand can also
 * ship an overlay, messages/brands/<NEXT_PUBLIC_BRAND_MESSAGES>.<locale>.json,
 * whose keys replace the catalogue's (copy that has to say something else,
 * not just another name). The TajirPoint build loads the catalogue untouched.
 */

type Messages = Record<string, unknown>;

const REPLACEMENTS: ReadonlyArray<readonly [RegExp, string]> = [
  [/hello@tajirpoint\.com/g, brand.email],
  [/(?<![\w.@-])app\.tajirpoint\.com/g, brand.appHost],
  [/(?<![\w.@-])tajirpoint\.com/g, brand.host],
  [/Tajir ?Point/g, brand.name],
];

function rewrite(value: unknown): unknown {
  if (typeof value === "string") {
    return REPLACEMENTS.reduce((s, [re, to]) => s.replace(re, to), value);
  }
  if (Array.isArray(value)) return value.map(rewrite);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, rewrite(v)]));
  }
  return value;
}

function merge(base: unknown, over: unknown): unknown {
  if (!over || typeof over !== "object" || Array.isArray(over)) return over;
  if (!base || typeof base !== "object" || Array.isArray(base)) return over;
  const out: Messages = { ...(base as Messages) };
  for (const [k, v] of Object.entries(over as Messages)) out[k] = merge(out[k], v);
  return out;
}

const OVERLAY = process.env.NEXT_PUBLIC_BRAND_MESSAGES?.trim();

export async function brandMessages(messages: Messages, locale: string): Promise<Messages> {
  if (brand.isDefault) return messages;
  let out = rewrite(messages) as Messages;
  if (OVERLAY && /^[a-z0-9-]+$/.test(OVERLAY)) {
    const overlay = await import(`../../messages/brands/${OVERLAY}.${locale}.json`)
      .then((m: { default: Messages }) => m.default)
      .catch(() => null);
    if (overlay) out = merge(out, overlay) as Messages;
  }
  return out;
}
