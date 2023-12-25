import axios from "axios";
import Card3 from "./Card3";
import { server } from "../server";
import { useEffect, useState } from "react";

export default function LeftSideHomePage1({ data }) {
  return (
    <div className="gap-2 -mt-4 grid sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-5 grid-cols-1 ">
      {data.map((d, index) => (
        <Card3 data={d} key={index} />
      ))}
    </div>
  );
}
