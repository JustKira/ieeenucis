"use client";
import React, { useEffect } from "react";

const page = () => {
  useEffect(() => {
    async function fetchtest() {
      const res = await fetch(
        "https://dcgmuqkfibypvjrupifr.supabase.co/functions/v1/duedateNotifiy",
        { body: JSON.stringify({ name: "test" }), method: "POST" }
      );
      const data = await res.json();
      console.log(data);
    }

    fetchtest();
  });
  return <div>page</div>;
};

export default page;
