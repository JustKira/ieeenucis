"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SignOutPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    router.refresh();
    if (error) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
        action: <ToastAction altText="try again">try again</ToastAction>,
      });
    }
    window.location.reload();
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-grow h-screen">
      <Card className="p-4 w-[350px]">
        <CardHeader>
          <CardTitle>SIGN OUT</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-3">
          <div className="flex justify-between gap-2">
            <Button
              disabled={loading}
              className="w-full"
              onClick={async () => {
                handleSignOut();
              }}
            >
              YES
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignOutPage;
