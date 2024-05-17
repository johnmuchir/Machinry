"use client";

import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.action";
import { Textarea } from "../ui/textarea";


interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

function Comment({ threadId, currentUserImg, currentUserId }: Props) {
  const pathname = usePathname();
  
  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );
    
    form.reset();
  };


  return (
    <Form {...form}>
      <form className='flex items-center gap-2' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-2'>
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt='current_user'
                  width={40}
                  height={40}
                  className='rounded-full h-10 w-11 '
                />
              </FormLabel>
              <FormControl className='border-none bg-gray-300 px-3 '>
                <textarea
                  {...field}
                  placeholder='Write your comment...'
                  className=' w-full text-[14px] outline-none rounded-full'
                  style={{ overflow: 'hidden', }} 
                />
              </FormControl>
            </FormItem>
          )}
        />
  
        <button type='submit' className='mt-2'>
          <Image src='/assets/send.svg' alt="send" width={24} height={24}/>
        </button>
      </form>
    </Form>
  );
}

export default Comment;