"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
// import { createAsset } from "../Store/assetSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import httpClient from "@/lib/http-client";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Label } from "@/components/ui/label";

const createAssetFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters long.",
    })
    .max(100, {
      message: "Title must not be longer than 30 characters.",
    }),
  description: z
    .string({
      required_error: "Please enter a description.",
    })
    .max(100, {}),
  source: z
    .string({
      required_error: "Please select a reference source.",
    })
    .max(1000, {}),
  verdict: z.enum(["true", "false"], {
    required_error: "Please select a Verdict.",
  }),
});

type CreateAssetFormValues = z.infer<typeof createAssetFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<CreateAssetFormValues> = {};

export function SubmitFact() {
  const [data, setData] = useState();
  const form = useForm<CreateAssetFormValues>({
    resolver: zodResolver(createAssetFormSchema),
    defaultValues,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.app);
  //   const { locations } = useAppSelector((state) => state.app);
  function onSubmit(formData: CreateAssetFormValues) {
    console.log(formData);

    const verdict = formData.verdict === "true" ? true : false;

    // @ts-ignore
    httpClient.post(`/articles/add-fact/${data.article.id}`, {
      title: formData.title,
      description: formData.description,
      source: formData.source,
      verdict: verdict,
    });
  }

  const GetFacts = () => {
    // Get title from query params

    let params = new URLSearchParams(window.location.search);

    let title = params.get("title");

    httpClient
      .post("/articles/check", {
        title: title,
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
        // form.setValue("title", res.data.title);
        // form.setValue("description", res.data.description);
        // form.setValue("source", res.data.source);
      });
  };

  useEffect(() => {
    GetFacts();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-orange-800 to-purple-800">
      <div className="form max-w-lg w-full rounded-xl  bg-white lg:p-10">
        <h1 className="font-bold text-2xl py-4">Submit fact</h1>

        <div className="flex items-start flex-col p-4 bg-slate-100 rounded-xl  justify-start space-y-2">
          {/* @ts-ignore */}
          <h1 className="text-xl font-bold">{data && data.article.title}</h1>
          {/* @ts-ignore */}
          <p>{data && data.article.description}</p>
          {/* @ts-ignore */}
          <a
            target="_blank"
            className="text-sm text-blue-500"
            href={data?.article.source}
          >
            Read original article
          </a>
          {/* @ts-ignore */}
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 h-full"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Article title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="verdict"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verdict</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">True</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">False</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference Source</FormLabel>
                  <FormControl>
                    <Input placeholder="Add fact source" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormDescription>
              Please enter the information as accurate as possible. The
              information you provide will be verified by our team. We
              appreciate the time you take to submit this fact.
            </FormDescription>
            {/* <FormField
            control={form.control}
            name="location_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Location</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? locations.find(
                              (location) => location.id === field.value
                            )?.name
                          : "Unassigned"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[550px] p-0">
                    <Command>
                      <CommandInput placeholder="Select location..." />
                      <CommandEmpty>Location not found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="Unassigned"
                          key="Unassigned"
                          onSelect={() => {
                            form.setValue("location_id", null);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === null ? "opacity-100" : "opacity-0"
                            )}
                          />
                          Unassigned
                        </CommandItem>
                        {locations.map((location) => (
                          <CommandItem
                            value={location.name}
                            key={location.name}
                            onSelect={() => {
                              form.setValue("location_id", location.id);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                location.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {location.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the location where the asset is located. Only
                  locations assigned to you will be available.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}

            <div className="flex h-full items-end mt-auto justify-end">
              <Button type="submit">
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                Submit Fact
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
