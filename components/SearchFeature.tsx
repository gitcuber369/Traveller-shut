"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useCountries } from "@/app/hooks/getCountries";
import HomeMap from "./HomeMap";
import { Button } from "./ui/button";
import CreationButton from "./SubmitButton";
import { Card, CardHeader } from "./ui/card";
import Counter from "./Counter";

export default function SearchFeature() {
  const [step, setStep] = useState(1);
  const [locationValue, setLocationValue] = useState("");
  const { getAllCountries } = useCountries();

  function SubmitButtonLocal() {
    if (step === 1) {
      return (
        <Button
          onClick={() => setStep(step + 1)}
          type={"button"}
          className="w-full"
        >
          Next
        </Button>
      );
    } else if (step === 2) {
      return <CreationButton />;
    }
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
            <div className="flex h-full divide-x font-medium">
              <p className="px-4">Anywhere</p>
              <p className="px-4">Any week</p>
              <p className="px-4">Add Guest</p>
            </div>
            <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full " />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form className="gap-4 flex flex-col">
            <input type="hidden" name="country" value={locationValue} />
            {step === 1 ? (
              <>
                <DialogHeader>
                  <DialogTitle>Select a Country</DialogTitle>
                  <DialogDescription>Please choose a country</DialogDescription>
                </DialogHeader>
                <Select
                  required
                  onValueChange={(value) => setLocationValue(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Countries</SelectLabel>
                      {getAllCountries().map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.flag} {item.label} / {item.region}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <HomeMap locationValue={locationValue} />
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Select all the info you need</DialogTitle>
                  <DialogDescription>
                    Please choose a all the related info
                  </DialogDescription>
                </DialogHeader>
                <Card>
                  <CardHeader className="flex flex-col gap-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="underline font-medium">Guests</h3>
                        <p className="text-muted-foreground text-sm">
                          How many people you allow?
                        </p>
                      </div>
                      <Counter name="guests" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="underline font-medium">Rooms</h3>
                        <p className="text-muted-foreground text-sm">
                          How many Rooms do you have?
                        </p>
                      </div>
                      <Counter name="room" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="underline font-medium">Bathrooms</h3>
                        <p className="text-muted-foreground text-sm">
                          How many Bathrooms do you have?
                        </p>
                      </div>
                      <Counter name="bathroom" />
                    </div>
                  </CardHeader>
                </Card>
              </>
            )}
            <DialogFooter>
              <SubmitButtonLocal />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
