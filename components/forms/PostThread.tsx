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
  const { startUpload } = useUploadThing("media");
  const { organization } = useOrganization();
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation), 
    defaultValues: {
      thread: "",
      images:  '',
      accountId: userId,
    },
  });
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    
    console.log("onSubmit called:", values);

    const blob = values.images;
    
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].fileUrl) {
        values.images = imgRes[0].fileUrl;
    
      }
    }
    
    await createThread({
      text: values.thread,
      images: values.images,
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
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image") && !file.type.includes("video")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
        setImagePreview(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };
  
  return (
    <Form {...form}>
      <form
        className='mt-10 flex flex-col justify-start gap-1'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
        control={form.control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base-semibold text-light-1">
              Create Post
            </FormLabel>
            <FormControl>
            <Input
              type='file'
              accept='image/*'
              placeholder='Add profile photo'
              className='account-form_image-input'
              onChange={(e) => handleImage(e, field.onChange)}
            />
            </FormControl>
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
      />
      <div className="flex flex-center flex-col bg-dark-4 rounded-xl cursor-pointer">
      {imagePreview && (
          <div className="flex flex-1 justify-center w-full p-5 lg:P-10">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="preview-image"
            />
          </div>
        )}
        </div>
      <FormField
        control={form.control}
        name='thread'
        render={({ field }) => (
          <FormItem className='flex w-full flex-col gap-3'>
            <FormLabel className='text-base-semibold text-light-1'>
          
            </FormLabel>
            <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
              <Textarea rows={6} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <Button type='submit' className='bg-primary-500'>
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
