import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className="mt-10">{children}</div>;
}
