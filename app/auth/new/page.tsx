"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import supaClientHandler from "@/lib/Supa/SupaClient";
const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  phonenumber: z.string().min(10, {
    message: "Invalid Egyptian phone number.",
  }),
});

function ProfileForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>();
  const supabase = supaClientHandler;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phonenumber: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    const Logic = async () => {
      const { data: userData, error: getUserError } =
        await supabase.auth.getUser();

      if (getUserError) {
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: getUserError?.message,
        });
      }

      if (userData.user) {
        if (userData.user.email) {
          const { error } = await supabase.from("users").insert({
            email: userData.user.email,
            firstname: data.firstname,
            lastname: data.lastname,
            phonenumber: data.phonenumber,
            uid: userData.user.id,
          });

          if (error) {
            return toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: error.message,
            });
          } else {
            return toast({
              title: "Creation Successful",
              description:
                "Your user profile has been created successfully. You can now browse freely.",
            });
          }
        }
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "User account does not have an associated email. Please contact support for further assistance.",
        });
      }
    };
    await Logic();
    setLoading(false);
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="p-4 w-[350px]">
        <CardHeader>
          <CardTitle>SIGN IN</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-3">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phonenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="01*00000000" {...field} />
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
        </CardContent>
      </Card>
    </div>
  );
}
export default ProfileForm;
