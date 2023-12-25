import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../server";

export default function Card5({ data }) {
  const nav = useNavigate();

  const navigasi = async () => {
    axios.put(`${server}artikel/count-views/${data?._id}`, {
      views: data?.views + 1,
    });
    nav(`/artikel/${data._id}`);
    window.location.reload();
    // window.location.href(`/artikel/${data._id}`);
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
    // <Link to={`/artikel/${data?._id}`}>
    <div
      className="w-full h-[75px] cursor-pointer  flex transition-transform duration-300 cursor-pointer scale-100 hover:scale-105 mt-[5px]"
      onClick={navigasi}
    >
      <div className="w-[40%]">
        <img
          src={img}
          alt={data?.title}
          className="object-cover rounded-md w-[95%] h-full"
        />
      </div>
      <div className="w-[60%] ml-1">
        <h1 className="text-[12px] font-[500]">{data?.title}</h1>
        <h3 className="text-[11px] font-[500] italic text-red-500">
          {data?.category}
        </h3>
      </div>
    </div>
    // </Link>
  );
}
