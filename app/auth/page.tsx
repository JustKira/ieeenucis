"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function AuthPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleSignin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };
  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setLoading(false);
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "Invalid email or password. Please double-check your credentials. If the error persists, please contact support.",
        action: <ToastAction altText="try again">try again</ToastAction>,
      });
    }

    toast({
      variant: "additive",
      title: "Sign In Successfully",
      description:
        "Great! You are now signed in and ready to explore your dashboard.",
      action: (
        <ToastAction
          altText="Let's Go"
          onClick={() => router.push("/dashboard")}
        >
          Let's go
        </ToastAction>
      ),
    });
    setLoading(false);

    router.refresh();
  });

  return (
    <div className="flex items-center justify-center flex-grow h-screen">
      <Card className="p-4 w-[350px]">
        <CardHeader>
          <CardTitle>SIGN IN</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-3">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="abc@gmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                Submit
              </Button>
            </form>
          </Form>
          <div className="flex justify-between gap-2">
            <Button
              className="w-full"
              onClick={() => {
                handleGoogleSignin();
              }}
            >
              Google
            </Button>
            <Button className="w-full" disabled>
              Github
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthPage;
