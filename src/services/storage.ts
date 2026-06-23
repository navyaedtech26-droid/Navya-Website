/**
 * Image uploads for the blog editor. Files go to the public `blog-images`
 * Storage bucket (created in `supabase/schema.sql`); only admins can write,
 * enforced by storage RLS policies.
 */
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const BUCKET = "blog-images";
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export interface UploadResult {
  url?: string;
  error?: string;
}

/** Upload an image and resolve to its public URL. */
export async function uploadBlogImage(file: File): Promise<UploadResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { error: "Supabase is not configured. Add your keys to .env." };
  }
  if (!ALLOWED.includes(file.type)) {
    return { error: "Unsupported file type. Use JPG, PNG, WebP, GIF, or AVIF." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image is too large. Maximum size is 5 MB." };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    console.error("[storage] upload failed:", error.message);
    return { error: "Upload failed. Please try again." };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}
