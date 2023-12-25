import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../server";
import { useEffect, useState } from "react";

export default function Card({ data }) {
  const nav = useNavigate();
  const [img, setImage] = useState("");
  const navigasi = async () => {
    axios.put(`${server}artikel/count-views/${data?._id}`, {
      views: data?.views + 1,
    });
    nav(`/artikel/${data._id}`);
  };

  const getImagesById = async () => {
    await axios.get(`${server}artikel/images/${data?._id}`).then((response) => {
      setImage(response.data?.image?.image);
    });
  };

  useEffect(() => {
    getImagesById();
  }, [data?._id]);

  return (
    <div
      onClick={() => navigasi(data._id)}
      className="w-full h-[200px] flex-col transition-transform duration-300  scale-100 hover:scale-105 cursor-pointer"
    >
      <img
        src={img}
        alt={data?.title}
        className="object-cover rounded-md rounded-b-md"
      />
      <div className="absolute top-[140px] bg-black h-[60px] shadow-lg  opacity-60 w-full rounded-b-md"></div>
      <div className="">
        <h1 className="absolute top-[140px] px-2 text-white font-[600]">
          {data?.title}
        </h1>
      </div>
    </div>
  );
}
