import ListingCard from "@/components/ListingCard";
import NoItem from "@/components/NoItem";
import React from "react";
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          id: true,
          country: true,
          photo: true,
          description: true,
          price: true,
          Favorite: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });

  return data;
}

export default async function ResrvationsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id) {
    return redirect("/");
  }
  const data = await getData(user?.id);

  return (
    <div>
      <section className="container mx-auto px-5 lg:px-10 mt-10">
        <h2 className="text-3xl font-semibold tracking-tight">
          Your Reservations
        </h2>
        {data.length === 0 ? (
          <NoItem
            title="You do not have any Reservations"
            description="Please do add some Reservations or you make create your own listing"
          />
        ) : (
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
            {data.map((item) => (
              <ListingCard
                key={item.Home?.id}
                descripition={item.Home?.description as string}
                location={item.Home?.country as string}
                price={item.Home?.price as number}
                favoriteId={item.Home?.Favorite[0]?.id as string}
                pathName={"/reservations"}
                imagePath={item.Home?.photo as string}
                homeId={item.Home?.id as string}
                userId={user.id}
                isInFavouriteList={
                  (item.Home?.Favorite.length as number) > 0 ? true : false
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
