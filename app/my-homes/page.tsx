import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import NoItem from "@/components/NoItem";
import ListingCard from "@/components/ListingCard";
import React from "react";

async function getData(userId: string) {
  const data = await prisma.home.findMany({
    where: {
      userId: userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAT: "desc",
    },
  });
  return data;
}

export default async function MyHome() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const data = await getData(user?.id);
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight ">
        Your Destinations
      </h2>

      {data.length === 0 ? (
        <NoItem
          title="Hey, you dont have any listings"
          description="Please do some listing or explore more"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              imagePath={item.photo as string}
              descripition={item.description as string}
              userId={user.id}
              homeId={item.id}
              price={item.price as number}
              location={item.country as string}
              favoriteId={item.Favorite[0]?.id as string}
              pathName={"/my-homes"}
              isInFavouriteList={
                (item.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
