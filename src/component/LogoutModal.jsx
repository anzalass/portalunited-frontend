import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LogoutModal({ logout }) {
  const nav = useNavigate();
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
    <div className=" z-50 w-full flex justify-center items-center absolute left-0 top-0 h-[130vh] bg-black opacity-90">
      <div className="h-[200px] w-[500px] text-center bg-white opacity-100 flex-col justify-center items-center">
        <h1 className="mt-[50px] font-[600]  ">
          Apakah Kamu Yakin Untuk Keluar?
        </h1>
        <div className="mt-2">
          <button
            onClick={handleLogout}
            className="bg-red-600 rounded-md text-white px-3 py-2 mr-2"
          >
            oke
          </button>
          <button
            onClick={() => logout(false)}
            className="bg-black  rounded-md text-white px-3 py-2 mr-2"
          >
            batal
          </button>
        </div>
      </div>
    </div>
  );
}
