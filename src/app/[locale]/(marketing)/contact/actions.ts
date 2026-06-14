"use server";

// Server-side so there's no CORS and the backend URL stays out of the bundle.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.tajirpoint.com";

export type ContactState = { ok?: boolean; error?: string };

export async function submitContact(
  _prev: ContactState | undefined,
  formData: FormData,
): Promise<ContactState> {
  const payload = {
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    business: String(formData.get("business") || ""),
    subject: String(formData.get("subject") || ""),
    message: String(formData.get("message") || ""),
    company: String(formData.get("company") || ""), // honeypot — must stay empty
  };

  if (!payload.name || !payload.email || !payload.message) {
    return { error: "Please fill in your name, email, and message." };
  }

  try {
    const res = await fetch(`${API_BASE}/api/v1/public/contact/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        error: "Could not send your message. Please email hello@tajirpoint.com directly.",
      };
    }
    return { ok: true };
  } catch {
    return {
      error: "Could not reach the server. Please email hello@tajirpoint.com directly.",
    };
  }
}
