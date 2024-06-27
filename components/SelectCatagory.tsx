"use client";

import { categoryItems } from "@/app/lib/categoryItems";
import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default function SelectCatagory() {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  return (
    <div className="grid grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36">
      <input type="hidden" name="categoryName" value={selected as string} />
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer hover:shadow-lg">
          <Card
            className={selected === item.name ? "border-primary border-2" : ""}
            onClick={() => setSelected(item.name)}
          >
            <CardHeader>
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={32}
                width={32}
                className="w-8 h-8 dark:invert"
              />
              <h3 className="font-medium"> {item.title} </h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
