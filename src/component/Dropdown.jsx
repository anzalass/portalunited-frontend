import { useEffect, useState } from "react";
import { server } from "../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dropdown() {
  const [cat, setCat] = useState([]);
  const nav = useNavigate();
  const getAllCategory = async () => {
    const { data } = await axios.get(`${server}category/`);
    setCat(data.category);
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="w-[250px] bg-zinc-100 absolute top-[150px] z-30 rounded-md shadow-sm">
      <div className=" text-black text-[15px]">
        {cat?.map((c, index) => (
          <div
            key={index}
            onClick={() => nav(`/artikel/category/?category=${c.slug}`)}
            className="hover:bg-slate-200 w-full px-2 py-2"
          >
            <div className="">{c.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
