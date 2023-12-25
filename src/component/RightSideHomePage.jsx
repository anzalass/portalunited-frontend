import { useEffect, useState } from "react";
import Card4 from "./Card4";
import axios from "axios";
import { server } from "../server";

export default function RightSideHomePage({ data }) {
  return (
    <div className="flex-col w-full p-3">
      {data.map((n, index) => (
        <>
          <div key={index} className="p-2">
            <Card4 data={n} key={index} />
          </div>
        </>
      ))}
    </div>
  );
}
