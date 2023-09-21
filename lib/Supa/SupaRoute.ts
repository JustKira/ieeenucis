import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database";
import { cookies } from "next/headers";
const supaRouterHandler = createRouteHandlerClient<Database>({ cookies });

export default supaRouterHandler;
