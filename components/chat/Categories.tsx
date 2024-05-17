"use client";

import qs from "query-string";
import { Category } from "@prisma/client"
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

interface CategoriesProps {
  data: Category[]
}

export const Categories = ({
  data
}: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };

    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, { skipNull: true });

    router.push(url);
  };

  return (
    <div className=" gap-2 overflow-x-auto flex">
      <button
        onClick={() => onClick(undefined)}
        className={cn(`
          text-small-medium
          p-1
          rounded-md 
          hover:opacity-75 
          transition
        `,
          !categoryId ? 'bg-blue' : 'bg-primary/0'
        )}
      >
        Newest
      </button>
      {data.map((item) => (
        <button
          onClick={() => onClick(item.id)}
          className={cn(`
            text-small-medium
            p-1
            rounded-md 
            hover:opacity-75 
            transition
          `,
            item.id === categoryId ? 'bg-blue' : 'bg-primary/10'
          )}
          key={item.id}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}