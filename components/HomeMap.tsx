import dynamic from "next/dynamic";
import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function HomeMap({ locationValue }: { locationValue: string }) {
  const LazyMap = dynamic(() => import(`@/components/Map`), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });

  return <LazyMap locationValue={locationValue} />;
}
