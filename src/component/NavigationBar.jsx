import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import { server } from "../server";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";
import { useSearch } from "../SearchContext";
import { AiFillAlert } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";
import Card8 from "./Card8";

export default function NavigationBar({ sidebar, setSidebar }) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [values, setValues] = useSearch();
  const nav = useNavigate();
  const [active, setActive] = useState(false);

  const getLiveSearch = async () => {
    await axios
      .get(`${server}artikel/live-search?c=${search.toLocaleLowerCase()}`)
      .then((res) => {
        const firstfive = res.data.slice(0, 5);
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

  const fixedNavbar = () => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  };

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    setValues({ ...values, keyword: e.target.value });
  };
  useEffect(() => {
    getLiveSearch();
    fixedNavbar();
  }, [search, active]);

  return (
    <>
      <div
        className={`${
          active ? "fixed" : null
        } w-full h-[80px]   bg-[#c70101] flex justify-center  items-center  top-0 z-40`}
      >
        <div className="w-11/12  bg-[#c70101] relative text-white h-[70px] flex items-center justify-between">
          <div className="absolute lg:w-[30%] xl:w-[30%] md:w-[40%] sm:w-[50%] w-[95%] z-50 bg-white top-[60px] rounded-lg  right-0 ">
            {search.length > 0
              ? data.map((d, index) => {
                  return (
                    <div key={index} className="p-2 border-b-2">
                      <Card8 data={d} />
                    </div>
                  );
                })
              : null}
          </div>
          <div className="flex">
            <Link to={"/"}>
              <img
                src="https://assets.manutd.com/AssetPicker/images/0/0/3/2/197240/Header-Logo1500994616801.png"
                className="h-[60px] w-[60px] object-cover"
                alt=""
              />
            </Link>
            <h1
              className="font-[500] font-Header hidden md:block lg:block xl:block sm:block text-2xl md:text-[40px] ml-3 lg:mt-4 sm:mt-4 md:mt-4  lg:text-[40px]  cursor-pointer"
              onClick={() => nav("/")}
            >
              Portal United
            </h1>
          </div>
          <div className="">
            <form className="flex">
              <div className="">
                <input
                  value={search}
                  onChange={handleSearchInput}
                  type="text"
                  placeholder="Search"
                  className="px-2 placeholder:text-white placeholder:font-Poppins text-white bg-[#c70101] lg:h-[34px] xl:h-[34px] md:h-[30px] h-[30px] text-[12px]  rounded-md outline-none relative border-black"
                />
                {/* <div className="h-[1px] w-[189px] absolute top-[55px] bg-white"></div> */}
              </div>
              <button
                className="bg-[#c70101] lg:h-[34px] w-[40px] xl:h-[34px] md:h-[30px] rounded-lg text-[12px]  h-[30px]"
                onClick={handleSearch}
              >
                <FiSearch size={20} className="mx-auto" />
              </button>
              <div
                onClick={() => setSidebar(true)}
                className=" ml-5  sm:block md:block lg:hidden xl:hidden"
              >
                <IoMenu size={29} />
              </div>
            </form>
          </div>
          {/* <div className=" hidden sm:hidden md:hidden lg:block xl:block">
            <div className="flex">
              <h1
                className="cursor-pointer py-2 mr-2 font-[500]"
                onClick={() => nav("/create")}
              >
                CREATE
              </h1>
              <h1
                className="py-2 mx-2 cursor-pointer font-[500]"
                onClick={() => nav("/profile")}
              >
                PROFILE
              </h1>
              <h1 className="py-2 ml-2 font-[500]">ABOUT</h1>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
