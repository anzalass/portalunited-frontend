import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../server";

export default function Card({ data }) {
  const nav = useNavigate();
  const navigasi = async () => {
    axios.put(`${server}artikel/count-views/${data?._id}`, {
      views: data?.views + 1,
    });
    nav(`/artikel/${data._id}`);
  };

  return (
    <div
      onClick={() => navigasi(data._id)}
      className="w-full h-[200px] flex-col "
    >
      <img
        src={`http://localhost:8000/${data?.images[0]}`}
        alt=""
        className="object-cover rounded-md rounded-b-md"
      />
      <div className="absolute top-[140px] bg-black h-[60px] shadow-lg  opacity-60 w-full rounded-b-md"></div>
      <div className="">
        <h1 className="absolute top-[140px] px-2 text-white font-[600]">
          {data?.title.length > 60
            ? data.title.slice(0, 55) + "..."
            : data.title}
        </h1>
      </div>
    </div>
  );
}
