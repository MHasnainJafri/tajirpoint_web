"use server";

import { brand } from "@/lib/config/brand";

const API_BASE = brand.apiOrigin;

export type SubscribeState = { ok?: boolean; error?: string };

export async function subscribeNewsletter(
  _prev: SubscribeState | undefined,
  formData: FormData
): Promise<SubscribeState> {
  const email = String(formData.get("email") || "");
  const company = String(formData.get("company") || ""); // honeypot — stays empty
  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email." };
  }
  try {
    const res = await fetch(`${API_BASE}/api/v1/public/subscribe/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, company }),
      cache: "no-store",
    });
    if (!res.ok) return { error: "Could not subscribe. Please try again." };
    return { ok: true };
  } catch {
    return { error: "Could not reach the server. Please try again." };
  }
}
