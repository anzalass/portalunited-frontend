import { Link, useNavigate } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function Sidebar({ sidebar, setSidebar }) {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleLogout = async () => {
    await axios
      .get(`${server}user/logout`, { withCredentials: true })
      .then((response) => {
        toast.success("logout");
        nav("/");
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div className="fixed lg:hidden xl:hidden z-50 top-0 h-screen bg-[#000000cd]   shadow-2xl w-[100%] ">
      <div className="bg-white w-[80%] sm:w-[50%] md:w-[40%] h-screen ">
        <div className="w-full h-[40px] bg-[#1a1a1a] relative">
          <FaWindowClose
            onClick={() => setSidebar(false)}
            className="absolute right-1 top-2"
            size={29}
            color="white"
          />
        </div>
        <div className="p-6 relative">
          <h1 className="font-Header text-2xl ml-5">
            {user ? `Hi, ${user?.username}` : null}
          </h1>
          <div className="p-6 font-Poppins font-[500] text-lg">
            <h1 onClick={() => nav("/create")} className="mb-4 hover:underline">
              HOME
            </h1>
            <h1 onClick={() => nav("/create")} className="mb-4 hover:underline">
              CREATE ARTIKEL
            </h1>
            <h1
              onClick={() => nav("/profile")}
              className="mb-4 hover:underline"
            >
              PROFILE
            </h1>
            {user ? (
              <h1 onClick={handleLogout} className="mb-4 hover:underline">
                LOGOUT
              </h1>
            ) : (
              <Link to={"/login"}>
                <h1 className="mb-4 hover:underline">LOGIN</h1>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
