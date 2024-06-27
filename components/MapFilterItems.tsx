"use client";

import Link from "next/link";
import React, { useCallback } from "react";
import { categoryItems } from "../app/lib/categoryItems";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
export default function MapFilterItems() {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex gap-x-10 mt-5 w-full overflow-x-scroll scroll-smooth no-scrollbar">
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          href={pathname + "?" + createQueryString("filter", item.name)}
          className={cn(
            search === item.name
              ? "border-b-2 border-black pb-2 flex-shrink-0 dark:border-white"
              : "opacity-70 flex-shrink-0",
            "flex flex-col gap-y-3 items-center animate-[wiggle_1s_ease-in-out_infinite]"
          )}
        >
          <div className="relative w-6 h-6 dark:invert">
            <Image
              src={item.imageUrl}
              alt="Category Image"
              className="w-6 h-6"
              width={24}
              height={24}
            />
          </div>
          <p className="text-xs font-medium"> {item.title} </p>
        </Link>
      ))}
    </div>
  );
}
