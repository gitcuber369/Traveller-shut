"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

export default function Counter({ name }: { name: string }) {
  const [amount, setAmount] = useState(0);

  function increase() {
    setAmount(amount + 1);
  }
  function decrease() {
    if (amount > 0) {
      setAmount(amount - 1);
    } else {
      setAmount(0);
    }
  }
  return (
    <div className="flex items-center gap-4">
      <input type="hidden" name={name} value={amount} />
      <Button variant="secondary" size="icon" type="button" onClick={decrease}>
        <Minus className="h-4 w-4 text-primary" />
      </Button>
      <p className="font-medium text-lg">{amount}</p>
      <Button
        variant={"secondary"}
        size="icon"
        type="button"
        onClick={increase}
      >
        <Plus className="h-4 w-4 text-primary" />
      </Button>
    </div>
  );
}
