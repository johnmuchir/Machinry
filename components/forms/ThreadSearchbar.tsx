"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";

interface Props {
  routeType: string;
}

function ThreadSearchbar({ routeType }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?q=` + search);
      } else {
        router.push(`/${routeType}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  return (
    <div className='searchbar rounded-full drop-shadow-lg shadow-purple-300 w-full mb-4'>
      
      <Input
        id='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${
            routeType !== "/search" ? "Search Machinary, Spares, Manuals " : "Search creators"
        }`}
        className='no-focus bg-gray-300 text-light-1 rounded-full border-none w-full'
      />
    </div>
  );
}

export default ThreadSearchbar;