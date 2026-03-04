"use client";
import React, { Fragment, useMemo } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import DemoLink from "react-big-calendar/stories/DemoLink.component";
// import events from "react-big-calendar/lib/events";
// import * as dates from "react-big-calendar/lib/src/utils/dates";


const mLocalizer = momentLocalizer(moment);

const events = [
  {
    title: "Demo Event",
    start: new Date(2026, 2, 4, 10, 0),
    end: new Date(2026, 2, 4, 12, 0),
  },
  {
    title: "Another Event",
    start: new Date(2026, 2, 5, 14, 0),
    end: new Date(2026, 2, 5, 15, 30),
  },
];


export default function Feed() {
  return (
    <main className="flex w-full flex-col items-center justify-center  ">
     <Calendar
        localizer={mLocalizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: "80%" }}
      />
    </main>

  );
}
