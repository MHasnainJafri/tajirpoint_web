import { indexNowKey } from "@/lib/security/headers";

// The IndexNow key file. next.config.ts rewrites /<INDEXNOW_KEY>.txt here, so
// search engines that support IndexNow (Bing, Yandex, Seznam, Naver…) can
// check that a ping really came from the owner of tajirpoint.com. The body
// must be the key and nothing else. Without INDEXNOW_KEY it is a 404.
//
// A dotted path, like /llms.txt, so the locale proxy leaves it alone.
export const dynamic = "force-static";

export function GET() {
  const key = indexNowKey(process.env.INDEXNOW_KEY);
  if (!key) return new Response("Not found", { status: 404 });
  return new Response(key, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
