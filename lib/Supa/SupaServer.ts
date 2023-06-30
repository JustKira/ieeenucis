import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../Database";
import { cookies } from "next/headers";

const supaServerClientHandler = createServerComponentClient<Database>({
  cookies,
});

export default supaServerClientHandler;
