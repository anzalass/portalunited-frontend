import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../server";

export default function Card2({ data }) {
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
      className="w-full flex items-center justify-center rounded-lg cursor-pointer transition-transform duration-300  scale-100 hover:scale-[1.001]"
      onClick={navigasi}
    >
      <div className="w-[36%]">
        <img
          src={img}
          alt={data?.title}
          className="h-[200px] w-full object-cover rounded-md"
        />
      </div>
      <div className="flex-col pl-3 h-[200px] justify-center items-center w-[70%]  ">
        <div className="flex-col my-auto items-center w-full ">
          <h1 className="flex py-auto mt-[50px] text-[13px] md:text-xl sm:text-[13px] lg:text-xl  xl:text-xl font-[600]">
            {data?.title}
          </h1>
          <h3 className=" font-[500] text-red-500">{data?.category}</h3>
          <h4 className="italic  text-sky-600 font-[400]">
            {data?.author?.username}
          </h4>
          <h4 className="font-thin text-zinc-600">
            {" "}
            {new Date(data?.createdAt).toLocaleDateString(undefined, {
              dateStyle: "full",
            })}
          </h4>
        </div>
      </div>
    </div>
  );
}
