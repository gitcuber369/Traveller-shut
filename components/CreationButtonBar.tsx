import Link from "next/link";
import React from "react";
import CreationButon from "./SubmitButton";
import { Button } from "./ui/button";

export default function CreationButtonBar() {
  return (
    <div className="fixed w-full bottom-0 bg-white dark:bg-[#0C0A09]  border-t h-24">
      <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
        <Button variant="secondary" size="lg" asChild>
          <Link href={"/"}>Cancle</Link>
        </Button>
        <CreationButon />
      </div>
    </div>
  );
}
