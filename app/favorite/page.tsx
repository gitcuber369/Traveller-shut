import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import NoItem from "@/components/NoItem";
import ListingCard from "@/components/ListingCard";

async function getData(userId: string) {
    const data = await prisma.favorite.findMany({
        where: {
            userId: userId,
        },
        select: {
            Home: {
                select: {
                    photo: true,
                    id: true,
                    price: true,
                    description: true,
                    country: true,
                    Favorite: true,
                },
            },
        },
    });
    return data;
}

export default async function FavoriteRoute() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return redirect("/");
    const data = await getData(user.id);

    return (
        <section className="container mx-auto px-5 lg:px-10 mt-10">
            <h2 className="text-3xl font-semibold tracking-tight">Your Favorite</h2>
            {data.length === 0 ? (
                <NoItem
                    title="You do not have any favorite"
                    description="Please do add some favorites or you make create your own listing"
                />
            ) : (
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
                    {data.map((item) => (
                        <ListingCard
                            key={item.Home?.id}
                            descripition={item.Home?.description as string}
                            location={item.Home?.country as string}
                            price={item.Home?.price as number}
                            favoriteId={item.Home?.Favorite[0].id as string}
                            pathName={"/favorite"}
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
    );
}
