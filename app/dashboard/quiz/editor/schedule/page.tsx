"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  cn,
  convertToMinutes,
  convertToTime,
  formatTime,
  snapTime,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { quizApi } from "@/lib/redux/api/quizApi";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ScrollText } from "lucide-react";

const formSchema = z.object({
  name: z.string(),
  quizId: z.string(),
  startDate: z.date(),
  duration: z.number(),
});

function SchedulePage() {
  const quizRes = quizApi.useGetQuizzesQuery();
  const [createSchedule, createScheduleRes] =
    quizApi.useCreateQuizScheduleMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { data } = quizApi.useGetSchedulesQuery();
  const { toast } = useToast();

  useEffect(() => {
    if (!createScheduleRes.error) {
      console.log(createScheduleRes.data?.data);
      toast({
        title: "Success",
        description: `Quiz Code ${createScheduleRes.data?.data.code}`,
      });
    }
  }, [createScheduleRes.data]);
  const onSubmit = form.handleSubmit(async (data) => {
    let cleandate = data.startDate;

    cleandate.getTimezoneOffset();

    cleandate.setHours((-1 * cleandate.getTimezoneOffset()) / 60 + 23);
    cleandate.setMinutes(59);

    console.log(cleandate);
    //@ts-ignore
    await createSchedule({
      ...data,
      startDate: data.startDate.toISOString(),
      quizId: Number(data.quizId),
      duration: convertToMinutes(snapTime(convertToTime(data.duration))),
    });
  });

  return (
    <CardContent className="flex gap-4">
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Quiz name will apear to users"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quizId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Quiz</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? quizRes.data?.data.find(
                                  (quiz) => quiz.id.toString() === field.value
                                )?.quizName
                              : "Select Quiz"}
                            <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {quizRes.data?.data.map((quiz) => (
                              <CommandItem
                                value={quiz.quizName}
                                key={quiz.id.toString()}
                                onSelect={() => {
                                  form.setValue("quizId", quiz.id.toString());
                                }}
                              >
                                {quiz.quizName}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    quiz.id.toString() === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Select Quiz to schedule</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel> Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          // @ts-ignore
                          onSelect={(d) => {
                            d?.getDate();

                            if (d) {
                              let date = d;

                              //date.setDate(d.getDate() + 1);

                              field.onChange(date);
                            }
                          }}
                          disabled={(date: any) =>
                            date > new Date("2050-01-01") ||
                            date < new Date(new Date().getDate() - 1)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Exam date.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("startDate")?.toISOString()}
              <div className="flex flex-col max-w-sm gap-4">
                <Label className="flex flex-col gap-2">
                  Quiz Duration{" "}
                  <Badge variant={"ghost"} className="w-fit">
                    {formatTime(
                      snapTime(convertToTime(form.watch("duration") || 0))
                    )}
                  </Badge>
                </Label>
                <Slider
                  defaultValue={[0]}
                  onValueChange={(n) => form.setValue("duration", n[0])}
                  max={100}
                  step={1}
                />
              </div>
              <Button variant={"ghost"} type="submit">
                Submit
              </Button>
              {createScheduleRes.data?.data.code ? (
                <Alert>
                  <Icon icon="mdi:code" />
                  <AlertTitle>Icon</AlertTitle>
                  <AlertDescription>
                    Quiz Code {createScheduleRes.data?.data.code}
                  </AlertDescription>
                </Alert>
              ) : (
                <></>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="w-3/4">
        <CardHeader>
          <CardTitle>Quiz Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-4 max-h-[600px] overflow-y-scroll">
            {data?.data.map((schedule, id) => (
              <li key={id} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <ScrollText />
                  <h1>{schedule.name}</h1>
                  <Badge variant={"ghost"}>{schedule.code}</Badge>
                </div>
                <div className="flex gap-3 font-light opacity-50">
                  <h1>{(schedule.duration / 60).toFixed(2)} Hour</h1>{" "}
                  <h1>{format(new Date(schedule.startDate), "PPP")}</h1>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </CardContent>
  );
}

export default SchedulePage;
