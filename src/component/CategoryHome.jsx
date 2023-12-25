import { useEffect, useState } from "react";
import otr from "../assets/maxresdefault.jpg";
import { useNavigate } from "react-router-dom";
import { server } from "../server";
import axios from "axios";

export default function CategoryHome() {
  const [cat, setCat] = useState([]);
  const nav = useNavigate();
  const getAllCategory = async () => {
    const res = await axios.get(`${server}category/`);
    const firstSeven = res.data.category.slice(0, 7);

    setCat(firstSeven);
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <div className="w-full p-3 mx-auto mt-[40px] font-Poppins">
      <h1 className="text-center text-xl mb-3">Kategori</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 p-3 mx-auto">
        {cat?.map((c, index) => (
          <div
            onClick={() => nav(`/artikel/category/?category=${c.slug}`)}
            key={index}
            className="relative w-full h-[100px] shadow-2xl rounded-md"
          >
            <img
              src={c?.image}
              alt="Card"
              className="w-full h-full object-cover rounded-md "
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="bg-black bg-opacity-50 w-full h-full absolute  rounded-md"></div>
              <h2 className="text-white text-2xl font-bold z-10">{c?.name}</h2>
            </div>
          </div>
        ))}

        <div className="relative w-full h-[100px] shadow-2xl ">
          <img
            src={otr}
            alt="Card"
            className="w-full h-full object-cover rounded-md "
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="bg-black bg-opacity-50 w-full h-full absolute "></div>
            <h2 className="text-white text-2xl font-bold z-10">More {"-->"}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
