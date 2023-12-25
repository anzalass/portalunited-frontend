import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../server";

export default function Card8({ data }) {
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
      className="text-black py-2 px-2 flex w-full transition-transform duration-300 cursor-pointer  scale-100 hover:scale-105"
      onClick={navigasi}
    >
      <div className="w-[80%]">
        <h1 className=" font-Roboto text-[14px]">{data.title}</h1>
        <h1 className=" text-sm italic font-Poppins text-red-500">
          {data.category}
        </h1>
      </div>
      <div className="w-[20%] ml-3">
        <img
          src={img}
          className="h-full w-full object-cover rounded-md"
          alt="kon"
        />
      </div>
    </div>
  );
}
