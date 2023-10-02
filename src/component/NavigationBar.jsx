import { useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import { server } from "../server";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearch } from "../SearchContext";

export default function NavigationBar() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [values, setValues] = useSearch();
  const nav = useNavigate();

  const getLiveSearch = async () => {
    await axios
      .get(`${server}artikel/live-search?c=${search}`)
      .then((res) => {
        const firstfive = res.data.slice(0, 6);
        setData(firstfive);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    axios
      .get(`${server}artikel/searching/${values.keyword}`)
      .then((res) => {
        setValues({ ...values, result: res.data });
        nav("/search");
        console.log(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    setValues({ ...values, keyword: e.target.value });
  };
  useEffect(() => {
    getLiveSearch();
  }, [search]);

  return (
    <>
      <div className="w-full h-[80px]  bg-[#0B0B0B] flex justify-center items-center fixed top-0 z-40">
        <div className="w-11/12 bg-[#0B0B0B] relative text-white h-[70px] flex items-center justify-between">
          <div className="absolute w-[30%]  bg-white left-[450px] top-[60px] ">
            {search.length > 0
              ? data.map((d, index) => (
                  <>
                    <div
                      key={index}
                      className="text-black py-2 px-2 flex w-full"
                    >
                      <div className="w-[80%]">
                        <h1 className="font-[500]">{d.title}</h1>
                        <h1 className=" text-sm italic">{d.category}</h1>
                      </div>
                      <div className="w-[20%] ml-3">
                        <img
                          src={`http://localhost:8000/${d?.images[0]}`}
                          className="h-[50px] w-[50px] object-cover rounded-md"
                          alt=""
                        />
                      </div>
                    </div>
                  </>
                ))
              : null}
          </div>
          <div className="">
            <h1
              className="font-[500] text-3xl italic cursor-pointer"
              onClick={() => nav("/")}
            >
              GGMU
            </h1>
          </div>
          <div className="">
            <form className="flex">
              <div className="">
                <input
                  value={search}
                  onChange={handleSearchInput}
                  type="text"
                  placeholder="Cari Artikel"
                  className="px-2 mt-1 bg-black h-[34px]  rounded-md outline-none relative border-black"
                />
                <div className="h-[1px] w-[189px] absolute top-[55px] bg-white"></div>
              </div>
              <Button kelas="bg-blue-500" onClick={handleSearch}>
                Cari
              </Button>
            </form>
          </div>
          <div className="flex">
            <h1
              className="cursor-pointer py-2 mr-2 font-[500]"
              onClick={() => nav("/create")}
            >
              Create
            </h1>
            <h1
              className="py-2 mx-2 cursor-pointer font-[500]"
              onClick={() => nav("/profile")}
            >
              Profile
            </h1>
            <h1 className="py-2 ml-2 font-[500]">About</h1>
          </div>
        </div>
      </div>
    </>
  );
}
