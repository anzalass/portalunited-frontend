import { useState } from "react";
import axios from "axios";
import NavigationBar from "../../component/NavigationBar";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../../component/Footer";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [avatar, setAvatar] = useState(null);
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

  return (
    <div className="">
      <NavigationBar />
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-11/12 mx-auto mt-[100px] shadow-lg h-[100vh] justify-center items-center">
          <form className="w-[70%] mx-auto " onSubmit={handleRegister}>
            <h1 className="mb-4 mt-2 text-3xl font-[600]">
              Welcome to Biggest Club in the World
            </h1>
            <div className="py-4">
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="w-full shadow-lg pl-3 h-[40px]"
                placeholder="Username.."
              />
            </div>
            <div className="py-4">
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="w-full shadow-lg pl-3 h-[40px]"
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
                  className="rounded-full h-[200px] w-[200px]"
                  src={URL.createObjectURL(avatar)}
                  alt=""
                />
              ) : null}
            </div>
            <div className="py-4 flex justify-between">
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-[90%] shadow-lg pl-3 h-[40px]"
                placeholder="Password.."
              />
              <input
                required
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                type="password"
                className="w-[90%] ml-4 shadow-lg pl-3 h-[40px]"
                placeholder="Repeat Password.."
              />
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

            <div className="py-4 ml-[90%]">
              <button className="text-white rounded-md px-3 py-2 bg-sky-600">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
