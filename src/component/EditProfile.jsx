import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../server";
import { toast } from "react-toastify";

export default function EditProfile() {
  const { user } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(null);
  let [email, setEmail] = useState(user?.email);
  let [name, setName] = useState(user?.username);
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const updateAvatar = async () => {
    const ImageData = new FormData();

    ImageData.append("file", avatar);
    await axios.put(`${server}user/edit-avatar/${user?._id}`, ImageData);
  };

  const updateProfile = async () => {
    if (password1 !== password) {
      toast.error("Password tidak sama");
    } else {
      await axios
        .put(`${server}user/edit-user/${user?._id}`, {
          username: name,
          email: email,
          password: password,
        })
        .then((res) => {
          toast.success(res.data.message);
        });
    }
  };
  return (
    <div className="w-full h-[100vh] flex bg-white p-3 ">
      <div className="w-[70%] mt-10">
        <div className="w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[40px] mb-4 rounded-md pl-2 border-2 border-black"
            placeholder="email"
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[40px] mb-4 rounded-md pl-2 border-2 border-black"
            placeholder="username"
          />
        </div>
        <div className="w-full">
          <input
            type="password"
            className="w-full h-[40px] mb-4 rounded-md pl-2 border-2 border-black"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-full">
          <input
            type="password"
            className="w-full h-[40px] mb-4 rounded-md pl-2 border-2 border-black"
            placeholder="Confirm New Password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div className="">
          <button
            onClick={updateProfile}
            className="px-3 py-2 font-Poppins text-white rounded-md bg-sky-600"
          >
            Perbarui
          </button>
        </div>
      </div>

      <div className="w-[30%] mx-auto">
        <div className="w-full mx-auto">
          <div className="w-full  flex-col items-center justify-center">
            <div className="">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt=""
                  className="mx-auto"
                />
              ) : null}
            </div>
            <div className="mx-auto w-full relative">
              <label
                htmlFor="poto"
                className=" px-3 py-2 mx-auto ml-[130px]  bg-zinc-200 font-Poppins  rounded-md"
              >
                Pilih Foto
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileInput}
                name="poto"
                id="poto"
                className="hidden"
              />
            </div>
            {avatar ? (
              <div className="">
                <button
                  onClick={updateAvatar}
                  className="px-3 ml-[32%] mt-[20px] py-2 font-Poppins text-white rounded-md bg-sky-600"
                >
                  Perbarui Foto
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
