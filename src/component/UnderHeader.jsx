import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineLogin } from "react-icons/ai";
import { GrLogin } from "react-icons/gr";
import { MdOutlineLogin } from "react-icons/md";
import { BiSolidDownArrow } from "react-icons/bi";

export default function UnderHeader() {
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log(isAuthenticated);
  const [openDropdown, setOpenDropdown] = useState(false);
  const nav = useNavigate();

  return (
    <div className="w-full bg- justify-center items-center h-[80px] mt-[80px] flex ">
      <div className="flex w-11/12 justify-between items-center">
        <div
          onClick={() => setOpenDropdown(!openDropdown)}
          className=" justify-center relative  bg-black rounded-md text-white  text-2xl font-[500] w-[20%] h-[55px] cursor-pointer items-center"
        >
          <div className="flex">
            <h1 className="pl-4 py-2  ">Categories </h1>
            <BiSolidDownArrow className="mt-4 ml-[70px]" />
          </div>

          {openDropdown ? <Dropdown /> : null}
        </div>
        {isAuthenticated ? null : (
          <div className="flex">
            <Button
              onClick={() => nav("/login")}
              kelas={"w-[80px] relative  flex bg-black mr-2"}
            >
              Login{" "}
              <AiOutlineLogin
                className="absolute right-2 top-[10px]"
                size={20}
              />
            </Button>
            <Button
              onClick={() => nav("/register")}
              kelas={"bg-black relative  flex ml-2 flex w-[100px]"}
            >
              Sign Up{" "}
              <MdOutlineLogin
                className="absolute right-3 top-[10px]"
                color=""
                size={22}
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
