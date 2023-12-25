import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineLogin } from "react-icons/ai";
import { GrLogin } from "react-icons/gr";
import { MdOutlineLogin } from "react-icons/md";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

export default function UnderHeader() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const [openDropdown, setOpenDropdown] = useState(false);
  const nav = useNavigate();

  return (
    <>
      <div className="w-full bg-[#1a1a1a] bg- justify-center items-center h-[50px]  flex mx-auto font-Poppins">
        <div className="flex w-11/12 justify-between text-white items-center mx-auto">
          {openDropdown ? <Dropdown /> : null}
          <div className=" hidden sm:hidden md:hidden lg:block xl:block">
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
              {/* <h1 className="py-2 ml-2 font-[500]">ABOUT</h1> */}
            </div>
          </div>

          {isAuthenticated ? (
            <h1 className="text-white">Hi, {user?.username}</h1>
          ) : (
            <div className="block">
              <div className="flex">
                <Button
                  onClick={() => nav("/login")}
                  kelas={
                    "relative  text-[13px] flex bg-[#1a1a1a] mr-2 hover:underline"
                  }
                >
                  <p className="hidden mr-2 sm:block md:block lg:block xl:block">
                    Masuk / Daftar{" "}
                  </p>
                  <FaUser className=" top-[10px]" size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
