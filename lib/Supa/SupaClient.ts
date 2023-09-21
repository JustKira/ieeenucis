"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database";

const supaClientHandler = createClientComponentClient<Database>();

export default supaClientHandler;
