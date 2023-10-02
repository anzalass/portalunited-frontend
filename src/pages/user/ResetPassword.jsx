import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { server } from "../../server";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ResetPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nav = useNavigate();

  const token = queryParams.get("token");

  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [notif, setNotif] = useState(false);
  const [hide, setHide] = useState(false);
  const [hide1, setHide1] = useState(true);

  const editPassword = async () => {
    await axios
      .put(`${server}user/reset-password`, { password, token })
      .then((response) => {
        toast.success("Updated password");
        nav("/");
      })
      .catch((error) => {
        toast.error(error);
      });
    // console.log("testi");
  };

  useEffect(() => {
    if (confpassword !== password) {
      setNotif(true);
    } else if (confpassword === password) {
      setNotif(false);
    }
  }, [confpassword]);

  return (
    <div>
      <div className="w-full flex">
        <div className="w-11/12 flex justify-center items-center mx-auto h-screen ">
          <form className="justify-center flex-col items-center p-2 h-[50%] w-[40%] rounded-md shadow-2xl">
            <h1 className=" text-center mt-8 font-[500] ">
              {" "}
              Masukan Password Baru
            </h1>
            <div className="w-11/12 mt-3 mx-auto relative">
              <h1 className=" text-sm">
                New Password <span className=" text-red-500">*</span>
              </h1>
              {hide ? (
                <AiOutlineEyeInvisible
                  size={25}
                  onClick={() => setHide(false)}
                  className="absolute top-[30px] right-2"
                />
              ) : (
                <AiOutlineEye
                  size={25}
                  onClick={() => setHide(true)}
                  className="absolute top-[30px] right-2"
                />
              )}
              <input
                type={hide ? "text" : "password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-3 shadow-2xl h-[40px] mt-[2px]"
              />
            </div>
            <div className="w-11/12 mx-auto mt-[20px] relative">
              <h1 className=" text-sm">
                Verify Password <span className=" text-red-500">*</span>
              </h1>
              {hide1 ? (
                <AiOutlineEye
                  size={25}
                  onClick={() => setHide1(false)}
                  className="absolute top-[30px] right-2"
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={25}
                  onClick={() => setHide1(true)}
                  className="absolute top-[30px] right-2"
                />
              )}
              <input
                required
                type={hide1 ? "password" : "text"}
                value={confpassword}
                onChange={(e) => setConfPassword(e.target.value)}
                className={`w-full pl-3 shadow-2xl border-2  h-[40px] mt-[2px]`}
              />
            </div>
            <div className="w-[200px] mt-6 mx-auto bg-slate-300">
              <button
                disabled={confpassword !== password}
                onClick={editPassword}
                className={`px-3 w-full  ${
                  notif ? `bg-rose-600` : null
                }  text-white rounded-md shadow-lg py-2 bg-blue-600`}
              >
                Send Request
              </button>
              {/* {notif ? <h1>Password tidak sama</h1> : null} */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
