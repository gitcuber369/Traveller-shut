"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import React, { useState } from "react";
import { eachDayOfInterval } from "date-fns";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function SelectCalander({
  reservation,
}: {
  reservation:
    | {
        startDate: Date;
        endDate: Date;
      }[]
    | undefined;
}) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  let disabledDates: Date[] = [];
  reservation?.forEach((reservationItem) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservationItem.startDate),
      end: new Date(reservationItem.endDate),
    });
    disabledDates = [...disabledDates, ...dateRange];
  });
  return (
    <div>
      <input
        type="hidden"
        name="startDate"
        value={range[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={range[0].endDate.toISOString()}
      />
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#EA580C"]}
        className="dark:bg-black"
        ranges={range}
        onChange={(item) => setRange([item.selection] as any)}
        minDate={new Date()}
        direction={"vertical"}
        disabledDates={disabledDates}
      />
    </div>
  );
}

export function ReservationSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Please Wait ...
        </Button>
      ) : (
        <Button className="w-full" type="submit">
          Make a Reservation!
        </Button>
      )}
    </>
  );
}
