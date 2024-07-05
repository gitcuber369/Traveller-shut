import { createReservation } from "@/app/action";
import { useCountries } from "@/app/hooks/getCountries";
import prisma from "@/app/lib/db";
import CategoryShowcase from "@/components/CategoryShowcase";
import HomeMap from "@/components/HomeMap";
import SelectCalander, {
  ReservationSubmitButton,
} from "@/components/SelectCalander";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

async function getData(homeid: string) {
  noStore();
  const data = await prisma.home.findUnique({
    where: {
      id: homeid,
    },
    select: {
      photo: true,
      price: true,
      description: true,
      bedroom: true,
      bathroom: true,
      guests: true,
      title: true,
      catagoryName: true,
      country: true,
      Reservation: {
        where: {
          homeId: homeid,
        },
      },

      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });

  return data;
}

export default async function HomeOverview({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          alt="Image of the Destination"
          src={`https://tpqrmlxhwswbczrtppti.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          className="rounded-lg w-full h-full object-cover mb-10"
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-2 text-sm text-muted-foreground">
            <p>{data?.guests} Guests </p> | <p>{data?.bedroom} Bedrooms</p> |
            <p>{data?.bathroom} Bathrooms</p>
          </div>
          <div className="flex itmes-center mt-6 mb-3">
            <img
              src={
                data?.User?.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="Image of the user who listed the destination"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">{data?.User?.firstName}</h3>
              <p className="text-sm text-muted-foreground">Hosted since 2024</p>
            </div>
          </div>
          <Separator className="my-7" />

          <CategoryShowcase categoryName={data?.catagoryName as string} />

          <Separator className="my-7" />

          <p className="text-muted-foreground">{data?.description}</p>

          <Separator className="my-7" />

          <HomeMap locationValue={country?.value as string} />
        </div>

        <form action={createReservation}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />
          <SelectCalander reservation={data?.Reservation} />

          {user?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button className="w-full" asChild>
              <Link href={"/api/auth/login"}>Make a reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
