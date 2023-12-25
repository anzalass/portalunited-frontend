import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../server";
import { useEffect, useState } from "react";

export default function Card6({ data }) {
  const nav = useNavigate();
  const navigasi = async () => {
    axios.put(`${server}artikel/count-views/${data?.artikelId}`, {
      views: data?.views + 1,
    });
    nav(`/artikel/${data.artikelId}`);
  };

  const [img, setImage] = useState("");

  const getImagesById = async () => {
    await axios
      .get(`${server}artikel/images/${data?.artikelId}`)
      .then((response) => {
        setImage(response.data?.image?.image);
      });
  };

  useEffect(() => {
    getImagesById();
  }, [data?._id]);

  return (
    <div
      onClick={navigasi}
      className="w-full h-[200px] flex-col relative  transition-transform duration-300 cursor-pointer  scale-100 hover:scale-105"
    >
      <img src={img} alt="" className="object-cover h-[230px] rounded-md" />
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
