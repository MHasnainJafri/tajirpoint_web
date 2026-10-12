"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { getBusiness } from "@/lib/marketing/businesses";
import { attributionFromForm, normalizePhone } from "@/lib/marketing/demo";

// Server-side so there's no CORS and the backend URL stays out of the bundle.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.tajirpoint.com";

export type ContactState = {
  ok?: boolean;
  error?: string;
  fields?: Partial<Record<"name" | "email" | "phone" | "message", string>>;
  businessType?: string;
};

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().max(200).email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .default("")
    .refine((v) => v === "" || normalizePhone(v) !== "", "Please check the phone number.")
    .transform((v) => (v ? normalizePhone(v) : "")),
  business_type: z.string().trim().default(""),
  message: z.string().trim().min(5, "Please write a short message.").max(5000),
  company: z.string().default(""),
});

export async function submitContact(
  _prev: ContactState | undefined,
  formData: FormData
): Promise<ContactState> {
  const get = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v : "";
  };
  const parsed = ContactSchema.safeParse({
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    business_type: get("business_type"),
    message: get("message"),
    company: get("company"),
  });
  if (!parsed.success) {
    const fields: ContactState["fields"] = {};
    for (const issue of parsed.error.issues) {
      const k = issue.path[0] as keyof NonNullable<ContactState["fields"]>;
      if (k && !fields[k]) fields[k] = issue.message;
    }
    return { error: "Please check the highlighted fields.", fields };
  }
  const data = parsed.data;
  const business = getBusiness(data.business_type);
  const businessType = business ? business.slug : data.business_type === "other" ? "other" : "";

  // Honeypot: look successful, send nothing.
  if (data.company) return { ok: true, businessType };

  const h = await headers();
  const fwd = h.get("x-forwarded-for") ?? h.get("x-real-ip");

  try {
    const res = await fetch(`${API_BASE}/api/v1/public/contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(fwd ? { "X-Forwarded-For": fwd } : {}),
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        // The endpoint accepts a fixed list of labels; the catalog maps each
        // business to one of them.
        business: business?.contactLabel ?? (data.business_type === "other" ? "Other" : ""),
        subject: "Website contact form",
        message: data.message,
        company: "",
        ...attributionFromForm(formData),
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        error: "Could not send your message. Please email hello@tajirpoint.com or WhatsApp +92 344 6800893.",
      };
    }
    return { ok: true, businessType };
  } catch {
    return {
      error: "Could not reach the server. Please email hello@tajirpoint.com or WhatsApp +92 344 6800893.",
    };
  }
}
