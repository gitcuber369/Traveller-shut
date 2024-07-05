import Image from "next/image";
import Link from "next/link";
import React from "react";
import Desktop from "../public/Desktop.png";
import Mobile from "../public/Mobile.png";
import { UserNav } from "./UserNav";
import SearchFeature from "./SearchFeature";
export default function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-2">
        <Link href={"/"}>
          <Image
            src={Desktop}
            alt="Desktop logo"
            className="w-32 hidden lg:block"
          />

          <Image
            src={Mobile}
            alt="Mobile logo"
            className="block lg:hidden w-10"
          />
        </Link>
        <div className="text-sm">
          <SearchFeature />
        </div>
        <div>
          <UserNav />
        </div>
      </div>
    </nav>
  );
}
