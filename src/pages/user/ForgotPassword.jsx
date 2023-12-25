import NavigationBar from "../../component/NavigationBar";
import Footer from "../../component/Footer";
import axios from "axios";
import { server } from "../../server";
import { useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../../component/Sidebar";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${server}user/forgot-password`, {
        email: email,
      })
      .then((response) => {
        toast.success(response.data.message);
        setEmail("");
      })
      .catch((error) => {
        toast.error("email not registered");
      });
  };
  const [sidebar, setSidebar] = useState(false);
  return (
    <div>
      <NavigationBar sidebar={sidebar} setSidebar={setSidebar}></NavigationBar>
      {sidebar ? <Sidebar setSidebar={setSidebar} sidebar={sidebar} /> : null}
      <div className="w-full flex">
        <div className="w-11/12 flex justify-center items-center mx-auto h-screen ">
          <form className="justify-center flex-col items-center p-2 h-[30%] w-[40%] rounded-md shadow-2xl">
            <h1 className=" text-center mt-4 font-[500]">
              {" "}
              Masukan Email Anda Yang Terdafatar Untuk Mereset Password
            </h1>
            <div className="w-11/12 mx-auto">
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-3 shadow-2xl rounded-lg  h-[40px] mt-[20px]"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="w-[200px] mt-2 mx-auto bg-slate-300">
              <button
                onClick={handleSubmit}
                className="px-3 w-full text-white rounded-md shadow-lg py-2 bg-blue-600"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
