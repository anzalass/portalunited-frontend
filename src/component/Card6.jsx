import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../server";

export default function Card6({ data }) {
  const nav = useNavigate();

  return (
    <div
      onClick={() => nav(`/artikel/${data.artikelId}`)}
      className="w-full h-[200px] flex-col relative "
    >
      <img
        src={`http://localhost:8000/${data?.images || data?.images[0]}`}
        alt=""
        className="object-cover h-[230px] rounded-md"
      />
      <div className="absolute top-[170px] bg-black h-[60px] shadow-lg  opacity-60 w-full rounded-b-md"></div>
      <div className="">
        <h1 className="absolute top-[170px] px-2 text-white font-[600]">
          {data?.title.length > 60
            ? data.title.slice(0, 55) + "..."
            : data.title}
        </h1>
      </div>
    </div>
  );
}
