import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import { cal_startDate, cal_offset, weekData } from "./cal-data";
import usePermission from "@/lib/hooks/usePermission";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getWeeksPassed(startingDate: string): number {
  const startDate = new Date(startingDate); // Your starting date in UTC

  // Calculate the current UTC time
  const currentDate = new Date();
  const currentUtcTime = new Date(
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60000
  );

  // Calculate the number of weeks that have passed
  const weeksPassed = Math.floor(
    (currentUtcTime.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );

  return weeksPassed;
}

function Calendar() {
  const [nextWeek, setNextWeek] = useState<boolean>(false);
  const [weekIndex, setWeekIndex] = useState<number>(0);
  const { checkPermissionNonJSX } = usePermission();
  useEffect(() => {
    let num = getWeeksPassed(cal_startDate);
    checkPermissionNonJSX(["senior_calendar"], () => {
      num = num + cal_offset;
    });
    console.log(num);
    setWeekIndex(num - 1);
  }, []);
  return (
    <>
      {weekData[nextWeek ? weekIndex + 1 : weekIndex] ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => setNextWeek(false)}
              data-selected={nextWeek}
              className="data-[selected=false]:opacity-100 opacity-50"
            >
              Current Week
            </button>
            <button
              onClick={() => setNextWeek(true)}
              data-selected={nextWeek}
              className="data-[selected=true]:opacity-100 opacity-50"
            >
              Next Week
            </button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Calender</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              {weekData[nextWeek ? weekIndex + 1 : weekIndex].days.map(
                (d, i) => (
                  <Card className="w-[14%] h-48">
                    <CardHeader>
                      <CardTitle> {daysOfWeek[i]}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1 text-sm ">
                      {d.map((_d, _i) => (
                        <div
                          dangerouslySetInnerHTML={{ __html: _d }}
                          data-last={d.length === _i + 1}
                          className="border-b border-transparent data-[last=false]:border-foreground/20 pb-1"
                        />
                      ))}
                    </CardContent>
                  </Card>
                )
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Calendar;
