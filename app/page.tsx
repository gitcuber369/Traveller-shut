import MapFilterItems from "@/components/MapFilterItems";
import React, { Suspense } from "react";
import prisma from "./lib/db";
import ListingCard from "@/components/ListingCard";
import SkeletonCard from "@/components/SkeletonCard";
import NoItem from "@/components/NoItem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

async function getData({
  userId,
  searchParams,
}: {
  userId: string | undefined;
  searchParams?: {
    filter?: string;
    country?: string;
    guests?: string;
    room?: string;
    bathrooom?: string;
  };
}) {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      catagoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guests ?? undefined,
      bedroom: searchParams?.room ?? undefined,
      bathroom: searchParams?.bathrooom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });

  return data;
}

function Home({ searchParams }: { searchParams?: { filter?: string } }) {
  return (
    <main>
      <div className="container mx-auto px-5 lg:px-20">
        <MapFilterItems />
        <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

export default Home;

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams: searchParams, userId: user?.id });
  return (
    <>
      {data.length === 0 ? (
        <NoItem
          title="Sorry no listing fond for this catagory..."
          description="Please another catagory or create you own listings"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              descripition={item.description as string}
              imagePath={item.photo as string}
              location={item.country as string}
              price={item.price as number}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavouriteList={item.Favorite.length > 0 ? true : false}
              homeId={item.id}
              pathName="/"
            />
          ))}
        </div>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
