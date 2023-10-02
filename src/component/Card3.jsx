import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../server";

export default function Card3({ data }) {
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
      className="w-full h-[340px]  p-3 relative "
    >
      <div className="">
        <img
          src={`http://localhost:8000/${data?.images[0]}`}
          alt=""
          className="object-cover h-[300px] rounded-md"
        />
      </div>
      <div className=" absolute w-[400px] top-[252px] z-10 bg-black opacity-50 h-[60px] rounded-b-md">
        <div className="p-2">
          <h1 className="text-white w-[390px]">
            {" "}
            {data?.title.length > 80
              ? data.title.slice(0, 77) + "..."
              : data.title}
          </h1>
        </div>
      </div>
    </div>
  );
}
