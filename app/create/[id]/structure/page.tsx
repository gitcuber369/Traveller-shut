import { createCategoryPage } from "@/app/action";
import CreationButtonBar from "@/components/CreationButtonBar";
import SelectCatagory from "@/components/SelectCatagory";
import React from "react";

export default function StructureRote({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors  ">
          Which of these best describes your Home?
        </h2>
      </div>
      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelectCatagory />

        <CreationButtonBar />
      </form>
    </>
  );
}
