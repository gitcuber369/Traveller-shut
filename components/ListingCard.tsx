import { useCountries } from "@/app/hooks/getCountries";
import Image from "next/image";
import Link from "next/link";
import { FavouriteButton } from "./SubmitButton";

interface iAppProps {
  imagePath: string;
  descripition: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavouriteList?: boolean;
  favoriteId: string;
  homeId: string;
}

export default function ListingCard({
  imagePath,
  descripition,
  location,
  price,
  userId,
  favoriteId,
  isInFavouriteList,
  homeId,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://tpqrmlxhwswbczrtppti.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of the destination"
          fill
          className="rounded-lg h-full object-cover mb-3"
        />
        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavouriteList ? (
              <>
                <form>
                  <FavouriteButton />
                </form>
              </>
            ) : (
              <form>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <FavouriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href={"/"}>
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {descripition}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="text-black font-medium dark:invert">${price}</span>{" "}
          Night
        </p>
      </Link>
    </div>
  );
}
