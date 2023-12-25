import { useState } from "react";
import axios from "axios";
import NavigationBar from "../../component/NavigationBar";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../../component/Footer";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Sidebar from "../../component/Sidebar";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [openPassword, setOpenPassword] = useState(false);
  const [openPassword1, setOpenPassword1] = useState(false);
  const nav = useNavigate();
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      if (password !== password1) {
        console.log("password tidaksama");
        toast.error("password tidaksama");
      } else {
        const newForm = new FormData();
        newForm.append("file", avatar);
        newForm.append("username", username);
        newForm.append("email", email);
        newForm.append("password", password);

        axios.post(`${server}user/register`, newForm, config);
        toast.success("Registration Success");
        setUsername("");
        setPassword("");
        setEmail("");
        setPassword1("");
        setAvatar(null);
        nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [sidebar, setSidebar] = useState(false);
  return (
    <div className="font-Poppins">
      <NavigationBar sidebar={sidebar} setSidebar={setSidebar}></NavigationBar>
      {sidebar ? <Sidebar setSidebar={setSidebar} sidebar={sidebar} /> : null}
      <div className="w-full min-h-screen flex justify-center items-center ">
        <div className="w-11/12 mx-auto mt-[30px] mb-[100px] shadow-lg p-3 justify-center items-center">
          <form className="w-[70%] mx-auto mb-[70px]" onSubmit={handleRegister}>
            <h1 className="mb-4 mt-[60px] text-3xl font-[600]">
              Welcome to Biggest Club in the World
            </h1>
            <div className="py-4">
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="w-full shadow-lg pl-3 h-[40px] rounded-lg "
                placeholder="Username.."
              />
            </div>
            <div className="py-4">
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="w-full shadow-lg pl-3 h-[40px] rounded-lg"
                placeholder="Email.."
              />
            </div>
            <div className="">
              <input
                required
                type="file"
                id="file-input"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileInput}
              />
            </div>
            <div className="py-4 w-full">
              {avatar ? (
                <img
                  className="rounded-full h-[200px] object-cover w-[200px]"
                  src={URL.createObjectURL(avatar)}
                  alt=""
                />
              ) : null}
            </div>
            <div className="py-4 flex justify-between w-[100%] ">
              <div className="relative w-[50%]">
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={openPassword ? "text" : "password"}
                  className="w-[90%] shadow-lg pl-3 h-[40px] rounded-lg"
                  placeholder="Password.."
                />
                {openPassword ? (
                  <AiOutlineEyeInvisible
                    onClick={() => setOpenPassword(false)}
                    size={23}
                    className="absolute right-[55px] top-[10px]"
                  />
                ) : (
                  <AiOutlineEye
                    onClick={() => setOpenPassword(true)}
                    size={23}
                    className="absolute right-[55px] top-[10px]"
                  />
                )}
              </div>
              <div className="relative w-[50%]">
                <input
                  required
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  type={openPassword1 ? "text" : "password"}
                  className="w-[100%] ml-2 shadow-lg pl-3 h-[40px] rounded-lg"
                  placeholder="Repeat Password.."
                />
                {openPassword1 ? (
                  <AiOutlineEyeInvisible
                    onClick={() => setOpenPassword1(false)}
                    size={23}
                    className="absolute right-2 top-[10px]"
                  />
                ) : (
                  <AiOutlineEye
                    onClick={() => setOpenPassword1(true)}
                    size={23}
                    className="absolute right-2 top-[10px]"
                  />
                )}
              </div>
            </div>
            <div className="flex w-full justify-between">
              <h1
                className=" cursor-pointer  underline text-sky-700"
                onClick={() => nav("/login")}
              >
                Sudah Punya Akun ?
              </h1>
              <h1
                className=" cursor-pointer  underline text-sky-700"
                onClick={() => nav("/forgot")}
              >
                Lupa Password ?
              </h1>
            </div>

            <div className="py-4 ml-[77%]">
              <button className="text-white w-[200px] rounded-md px-3 py-2 bg-[#c70101]">
                Sign For United
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
