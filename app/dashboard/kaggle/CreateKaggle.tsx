import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { QuickLoader } from "@/components/ui/loaders";
import { Textarea } from "@/components/ui/textarea";
import supaClientHandler from "@/lib/Supa/SupaClient";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  competitionId: z.string().min(2, {
    message: "Competition ID must be at least 2 characters.",
  }),
  user: z.string().min(2, {
    message: "User must be at least 2 characters.",
  }),
  token: z.string().min(2, {
    message: "Token must be at least 2 characters.",
  }),
  reward: z.string(),
  rewardDescription: z.string().min(2, {
    message: "Reward description must be at least 2 characters.",
  }),
});

function CreateKaggle() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const supabase = supaClientHandler;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      competitionId: "",
      user: "",
      token: "",
      reward: "",
      rewardDescription: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    const { error } = await supabase
      .from("KaggleCompetitionLeaderboard")
      .insert({ ...data, reward: Number(data.reward) });

    if (error) {
      setLoading(false);
      return toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
    toast({
      variant: "additive",
      title: "Creation Successfull",
      description: "Kaggle submitted successfully.",
    });

    setLoading(false);
  });

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>New Form</CardTitle>
        <CardDescription>Please fill out the form below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Compition name" {...field} />
                  </FormControl>
                  <FormDescription>
                    similar to nickname, name will be visible to all user to see
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="competitionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competition ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter competition ID" {...field} />
                  </FormControl>
                  <FormDescription>
                    The competition ID itself, which will be used to retrieve
                    data from Kaggle
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter user" {...field} />
                  </FormControl>
                  <FormDescription>
                    user which provided by kaggle
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter token" {...field} />
                  </FormControl>
                  <FormDescription>
                    token which provided by kaggle
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selection Range</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter reward"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Number of winners (NOTE that this affects the Kaggle trophy
                    bar)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rewardDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reward Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe the rewards for the winners.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              <QuickLoader loading={loading} />
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default CreateKaggle;
