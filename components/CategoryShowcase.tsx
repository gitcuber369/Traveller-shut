import { categoryItems } from "@/app/lib/categoryItems";
import Image from "next/image";

export default function CategoryShowcase({
  categoryName,
}: {
  categoryName: string;
}) {
  const category = categoryItems.find((item) => item.name === categoryName);

  return (
    <div className="flex items-center">
      <Image
        src={category?.imageUrl as string}
        alt="Category Image"
        width={44}
        height={44}
        className="dark:invert"
      />
      <div className="flex flex-col ml-4">
        <h3 className="font-medium">{category?.title}</h3>
        <p className="text-sm text-muted-foreground">{category?.description}</p>
      </div>
    </div>
  );
}
