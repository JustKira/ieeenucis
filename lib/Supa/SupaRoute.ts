import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../Database";
import { cookies } from "next/headers";
const supaRouterHandler = createRouteHandlerClient<Database>({ cookies });

export default supaRouterHandler;
