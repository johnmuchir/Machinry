"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createThread } from "@/lib/actions/thread.action";
import "@uploadthing/react/styles.css";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { startUpload } = useUploadThing("mediaPost");
  const { organization } = useOrganization();
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      images: [],
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    console.log("onSubmit called:", values);

    const hasImagesChanged = files.length > 0;

    if (hasImagesChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes.length > 0) {
        values.images = imgRes.map((res) => res.url);
      }
    }

    await createThread({
      text: values.thread,
      images: values.images || [],
      author: userId,
      communityId: null,
      path: pathname,
    });

    console.log("Form Values:", values);

    console.log(values.thread);
    console.log(userId);
    router.push("/");
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      newFiles.forEach((file) => {
        if (!file.type.includes("image") && !file.type.includes("video")) return;

        fileReader.onload = async (event) => {
          const imageDataUrl = event.target?.result?.toString() || "";
          setImagePreviews((prevPreviews) => [...prevPreviews, imageDataUrl]);
        };

        fileReader.readAsDataURL(file);
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className=" flex flex-col gap-1"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="text-red-500 text-[12px]">
          <p>Max 3 Images/Photos</p>
          <p>Max 1 Min Video</p>
        </div>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base-semibold text-light-1">
                Create Post
              </FormLabel>
              <FormControl className=" no-focus border border-dark-5 bg-dark-4 text-light-1">
                <Input
                  type="file"
                  accept="image/*, video/*"
                  multiple  // Allow multiple file selection
                  placeholder="Add profile photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex">
          {imagePreviews.slice(0, 3).map((preview, index) => (
           <div
              key={index}
              className=""
          
            >
              <video>
                <source src={preview} type="video/mp4" />
              </video>
          
              <img src={preview} alt='' className="preview-image" />
            </div> 
          ))}
        </div>
       
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-1"></FormLabel>
              <FormControl className="no-focus border border-dark-5 bg-dark-4 text-light-1">
                <Textarea rows={6} {...field} placeholder="Write here to post" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;

