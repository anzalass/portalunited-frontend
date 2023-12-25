import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../server";
import { useNavigate } from "react-router-dom";

export default function Card4({ data }) {
  const nav = useNavigate();

  const navigasi = async () => {
    axios.put(`${server}artikel/count-views/${data?._id}`, {
      views: data?.views + 1,
    });
    nav(`/artikel/${data._id}`);
  };

  const [img, setImage] = useState("");

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
      className="w-full h-[120px] rounded-lg flex bg-[#fff]  hover:shadow-2xl transition-transform duration-300 cursor-pointer  scale-100 hover:scale-105"
      onClick={navigasi}
    >
      <div className="w-[30%]">
        <img
          src={img}
          alt={data?.title}
          className="object-cover w-full h-[120px] rounded-md"
        />
      </div>
      <div className="w-[70%] px-2 mt-3">
        <h1 className=" text-black font-[500] text-[13px] lg:text-lg xl:text-lg sm:text-sm md:text-[11px]">
          {" "}
          {data?.title.length > 30
            ? data.title.slice(0, 20) + "..."
            : data.title}
        </h1>
        <h1 className="italic font-Poppins text-[13px] font-[500] text-blue-600">
          {data?.author?.username}
        </h1>
        <h1 className="font-Poppins text-[14px] sm:text-[12px]  font-[500] text-red-600">
          {data?.category}
        </h1>
      </div>
    </div>
  );
}
