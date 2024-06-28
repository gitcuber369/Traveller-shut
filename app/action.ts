"use server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";

export async function AddYourTravelDestination({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAT: "desc",
    },
  });

  switch (data) {
    case null:
      const newData = await prisma.home.create({
        data: {
          userId: userId,
        },
      });
      redirect(`/create/${newData.id}/structure`);
      break;
  }
  switch (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    case true:
      return redirect(`/create/${data.id}/structure`);
      break;
  }
  switch (data.addedCategory && !data.addedDescription) {
    case true:
      return redirect(`/create/${data.id}/description`);
      break;
  }
  switch (data.addedCategory && data.addedDescription && !data.addedLocation) {
    case true:
      return redirect(`/create/${data.id}/address`);
      break;
  }
  switch (data.addedCategory && data.addedDescription && data.addedLocation) {
    case true:
      const data = await prisma.home.create({
        data: {
          userId: userId,
        },
      });
      return redirect(`/create/${data.id}/structure`);
      break;
  }
}
export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      catagoryName: categoryName,
      addedCategory: true,
    },
  });

  return redirect(`/create/${homeId}/description`);
}
export async function CreateDescription(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const imageFile = formData.get("image") as File;

  const guestNumber = formData.get("guests") as string;
  const roomNumber = formData.get("room") as string;
  const bathroomNumber = formData.get("bathroom") as string;
  const homeId = formData.get("homeId") as string;

  const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${Date.now()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      bedroom: roomNumber,
      bathroom: bathroomNumber,
      guests: guestNumber,
      photo: imageData?.path,
      addedDescription: true,
    },
  });

  return redirect(`/create/${homeId}/address`);
}

export async function createLocation(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const countryValue = formData.get("countryValue") as string;

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      addedLocation: true,
      country: countryValue,
    },
  });

  return redirect(`/`);
}

export async function addToFavorite(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;
  const data = await prisma.favorite.create({
    data: {
      homeId: homeId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

export async function deleteFromFavorite(formData: FormData) {
  const favoriteId = formData.get("favoriteId") as string;
  const pathName = formData.get("pathName") as string;
  const userId = formData.get("userId") as string;

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}
