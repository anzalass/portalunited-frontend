import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../server";
import { useEffect, useState } from "react";

export default function Card3({ data }) {
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
      onClick={() => navigasi(data._id)}
      className="w-full h-[250px] mt-9  relative transition-transform duration-300 cursor-pointer  scale-100 hover:scale-105"
    >
      <div className="">
        <img
          src={img}
          alt={data?.title}
          className="mx-auto object-cover w-full h-[250px] rounded-md"
        />
      </div>
      <div className="w-full top-[190px] z-10 absolute bg-[#000000d7] h-[60px] rounded-b-md">
        <div className="p-2">
          <h1 className="text-white w-full text-[13px]">
            {" "}
            {data?.title.length > 40
              ? data.title.slice(0, 36) + "..."
              : data.title}
          </h1>
        </div>
      </div>
    </div>
  );
}
