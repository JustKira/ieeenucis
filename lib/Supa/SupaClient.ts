"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../Database";

const supaClientHandler = createClientComponentClient<Database>();

export default supaClientHandler;
