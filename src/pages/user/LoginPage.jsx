import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../../component/NavigationBar";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../component/Footer";
import cheerio from "cheerio";
import Sidebar from "../../component/Sidebar";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openPassword, setOpenPassword] = useState(false);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    // const config = { headers: { "Content-Type": "application/json" } };
    e.preventDefault();
    await axios
      .post(
        `${server}user/login`,
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        toast.success("Login successful");
        nav("/");
        window.location.reload(true);
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        const errmsg = err.response.data.message;
        toast.error(errmsg);
      });
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      nav("/profile");
    }
    console.log(isAuthenticated);
  }, []);

  const [sidebar, setSidebar] = useState(false);

  return (
    <div className=" font-Poppins">
      <NavigationBar sidebar={sidebar} setSidebar={setSidebar}></NavigationBar>

      {sidebar ? <Sidebar setSidebar={setSidebar} sidebar={sidebar} /> : null}
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-11/12 mx-auto mt-8 shadow-lg h-[80vh] justify-center items-center">
          <form onSubmit={handleLogin} className="w-[70%] mx-auto ">
            <h1 className="mb-4 mt-2 text-sm sm:text-[18px] md:text-lg lg:text-xl xl:text-2xl  font-[600]">
              Welcome to Biggest Club in the World
            </h1>

            <div className="py-4">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="w-full shadow-lg pl-3 h-[40px] rounded-lg"
                placeholder="Email.."
              />
            </div>
            <div className="py-4 flex-col relative">
              <input
                type={openPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full shadow-lg pl-3 h-[40px] rounded-lg"
                placeholder="Password.."
              />
              {openPassword ? (
                <AiOutlineEyeInvisible
                  onClick={() => setOpenPassword(false)}
                  size={23}
                  className="absolute right-[12px] top-[25px]"
                />
              ) : (
                <AiOutlineEye
                  onClick={() => setOpenPassword(true)}
                  size={23}
                  className="absolute right-[12px] top-[25px]"
                />
              )}
            </div>
            <div className="py-4 w-full justify-center flex items-center md:justify-end lg:justify-end xl:justify-end">
              <div className="">
                <button
                  type="submit"
                  className="text-white rounded-md px-3 py-2 bg-[#c70101]"
                >
                  Login For United
                </button>
              </div>
            </div>
            <div className="md:flex lg:flex sm:block xl:flex text-center md:text-[17px] sm:text-[14px] lg:text-[17px] xl:text-[17px] text-[12px]  w-full mt-3 justify-between">
              <h1
                className=" cursor-pointer  underline text-sky-700"
                onClick={() => nav("/register")}
              >
                Belum Punya Akun ?
              </h1>
              <h1
                className=" cursor-pointer  underline text-sky-700"
                onClick={() => nav("/forgot")}
              >
                Lupa Password ?
              </h1>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
