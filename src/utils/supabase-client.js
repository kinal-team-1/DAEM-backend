import { createClient } from "@supabase/supabase-js";

const BUCKET_NAME = "DAEM";

export const supabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
).storage.from(BUCKET_NAME);
