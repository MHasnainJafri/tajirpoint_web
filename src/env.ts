import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  /** Older name for NEXT_PUBLIC_GA_MEASUREMENT_ID, still read. */
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
  // Ownership checks, rendered as <meta> tags in every page head (see
  // src/lib/seo/verification.ts). Server-side only; read at build time.
  GOOGLE_SITE_VERIFICATION: z.string().optional(),
  BING_SITE_VERIFICATION: z.string().optional(),
  FACEBOOK_DOMAIN_VERIFICATION: z.string().optional(),
  FACEBOOK_APP_ID: z.string().optional(),
  // Official social profiles (see siteConfig.social).
  SOCIAL_FACEBOOK_URL: z.string().optional(),
  SOCIAL_INSTAGRAM_URL: z.string().optional(),
  SOCIAL_LINKEDIN_URL: z.string().optional(),
  SOCIAL_YOUTUBE_URL: z.string().optional(),
  SOCIAL_TIKTOK_URL: z.string().optional(),
  SOCIAL_X_HANDLE: z.string().optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
  BING_SITE_VERIFICATION: process.env.BING_SITE_VERIFICATION,
  FACEBOOK_DOMAIN_VERIFICATION: process.env.FACEBOOK_DOMAIN_VERIFICATION,
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  SOCIAL_FACEBOOK_URL: process.env.SOCIAL_FACEBOOK_URL,
  SOCIAL_INSTAGRAM_URL: process.env.SOCIAL_INSTAGRAM_URL,
  SOCIAL_LINKEDIN_URL: process.env.SOCIAL_LINKEDIN_URL,
  SOCIAL_YOUTUBE_URL: process.env.SOCIAL_YOUTUBE_URL,
  SOCIAL_TIKTOK_URL: process.env.SOCIAL_TIKTOK_URL,
  SOCIAL_X_HANDLE: process.env.SOCIAL_X_HANDLE,
});
