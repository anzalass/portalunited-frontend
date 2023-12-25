import NavigationBar from "../../component/NavigationBar";
import { AiOutlineArrowRight } from "react-icons/ai";
import "react-quill/dist/quill.snow.css";
import { DataGrid } from "@mui/x-data-grid";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import Card from "../../component/Card";
import Card6 from "../../component/Card6";
import LogoutModal from "../../component/LogoutModal";
import Category from "../../component/Category";
import { CiLogin } from "react-icons/ci";
import { MdOutlineLogin } from "react-icons/md";
import EditProfile from "../../component/EditProfile";
import Sidebar from "../../component/Sidebar";
import Footer from "../../component/Footer";

export default function Profile() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [logout, setLogout] = useState(false);
  const [totalArtikel, setTotalArtikel] = useState(0);
  const [totalSave, setTotalSave] = useState(0);
  const { user } = useSelector((state) => state.user);
  let [savedPost, setSavedPost] = useState(0);
  const [data, setData] = useState([]);
  const [dataSave, setDataSave] = useState([]);
  const nav = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  const getYourArtikel = async () => {
    await axios
      .get(`${server}artikel/your-profile/${user?._id}`)
      .then((response) => {
        setData(response.data.youArtikel);
        setDataSave(response.data.getSave);
        setTotalArtikel(response.data.panjangArtikel);
        setTotalSave(response.data.panjangSave);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteArtikel = async (e) => {
    const del = window.confirm("Are you sure");
    console.log(del);

    if (del) {
      await axios
        .delete(`${server}artikel/delete-artikel/${e}`)
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error("hapus gagal");
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getYourArtikel();

    if (isAuthenticated === false) {
      nav("/login");
    }
  }, [user?._id]);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 100, flex: 0.7 },
    { field: "judul", headerName: "Judul", minWidth: 150, flex: 0.7 },
    { field: "category", headerName: "Category", minWidth: 100, flex: 0.7 },
    { field: "tags", headerName: "Tags", minWidth: 100, flex: 0.7 },
    {
      field: "createdAt",
      headerName: "Publish Date",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "detail",
      headerName: "Detail",
      flex: 1,
      minWidth: 150,

      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button
              className="mr-4"
              onClick={() => nav(`/artikel/${params.id}`)}
            >
              <AiOutlineArrowRight size={20} />
            </button>
            <button className="mr-4" onClick={() => deleteArtikel(params.id)}>
              <BsTrash3 color="red" size={20} />
            </button>
            <button className="" onClick={() => nav(`/edit/${params.id}`)}>
              <BiEditAlt color="blue" size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  const row = [];

  data &&
    data.forEach((a) => {
      row.push({
        id: a._id,
        judul: a.title,
        category: a.category,
        tags: a.tags,
        createdAt: new Date(a.createdAt).toLocaleDateString(undefined, {
          dateStyle: "full",
        }),
      });
    });

  return (
    <div className="w-full">
      {logout ? <LogoutModal logout={setLogout} /> : null}
      <NavigationBar sidebar={sidebar} setSidebar={setSidebar}></NavigationBar>
      {sidebar ? <Sidebar setSidebar={setSidebar} sidebar={sidebar} /> : null}
      <div className="w-11/12 mx-auto mt-[50px] min-h-screen">
        <div className="w-full rounded-lg flex relative  bg-white justify-center items-center h-[200px]">
          <button
            onClick={() => setLogout(true)}
            className="absolute right-4 bg-red-600 px-3 flex lg:text-xl xl:text-xl md:text-[14px] sm:text-[12px] text-[11px]  text-white font-[500] rounded-md py-2 top-2"
          >
            Logout
            <MdOutlineLogin
              size={20}
              className=" hidden md:block lg:block xl:block ml-2  mt-1"
            />
          </button>
          <img
            src={user?.avatar}
            alt={user?.avatar}
            className="lg:h-[150px] lg:w-[150px] xl:h-[150px] xl:w-[150px] md:h-[120px] md:w-[120px] sm:h-[90px] sm:w-[90px] w-[60px] h-[60px] rounded-full border-2 border-black mr-2 object-cover"
          />
          <div className="flex-col ">
            <h1 className="text-start lg:text-xl xl:text-xl md:text-[15px] sm:text-[15px] text-[15px] ml-3 font-[500]">
              {user?.username}
            </h1>
            <h1 className="font-[500] pl-3 italic lg:text-xl xl:text-xl md:text-[14px] sm:text-[12px] text-[11px] text-start">
              {new Date(user?.createdAt).toLocaleDateString(undefined, {
                dateStyle: "full",
              })}
            </h1>
            <h1 className="pl-3  text-start lg:text-xl xl:text-xl md:text-[14px] sm:text-[12px] text-[11px]">
              {" "}
              Total Post :{totalArtikel}
            </h1>
          </div>
        </div>
        <div className=" justify-between flex h-[60px] bg-black">
          <div
            onClick={() => setSavedPost(0)}
            className={` ${
              savedPost === 0 ? "bg-white text-black " : "text-white"
            } w-[50%]  my-auto flex items-center  hover:bg-white hover:text-black h-full cursor-pointer justify-center`}
          >
            <h1 className="text-center font-[500] lg:text-xl xl:text-xl md:text-[14px] sm:text-[12px] text-[11px]">
              Your Post ({totalSave})
            </h1>
          </div>
          <div
            onClick={() => setSavedPost(1)}
            className={` ${
              savedPost === 1 ? "bg-white text-black " : "text-white"
            } w-[50%]  my-auto flex items-center  hover:bg-white hover:text-black h-full cursor-pointer justify-center`}
          >
            <h1 className="text-center  font-[500] lg:text-xl xl:text-xl md:text-[14px] sm:text-[12px] text-[11px]">
              Saved Post ({dataSave.length})
            </h1>
          </div>
          <div
            onClick={() => setSavedPost(3)}
            className={` ${
              savedPost === 3 ? "bg-white text-black " : "text-white"
            } w-[50%]  my-auto flex items-center  hover:bg-white hover:text-black h-full cursor-pointer justify-center`}
          >
            <h1 className="text-center  font-[500] lg:text-xl xl:text-xl md:text-[14px] sm:text-[12px] text-[11px]">
              Category (2)
            </h1>
          </div>
          <div
            onClick={() => setSavedPost(4)}
            className="w-[50%] h-full my-auto justify-center flex items-center  hover:bg-white hover:text-black text-white bg-black"
          >
            <h1 className="text-center font-[500] lg:text-xl xl:text-xl md:text-[14px] sm:text-[12px] text-[11px]">
              Edit Profile
            </h1>
          </div>
        </div>
        {savedPost === 3 ? (
          <div className="">
            <Category navigasi={setSavedPost} />
          </div>
        ) : null}

        {savedPost === 4 ? <EditProfile /> : null}

        {savedPost === 1 ? (
          <div className="w-full flex-col mt-4">
            <div className="">
              <h1 className=" text-center"> Your Saved Post</h1>
              <div className="grid gap-3 grid-cols-4">
                {dataSave &&
                  dataSave.map((d, index) => <Card6 data={d} key={index} />)}
              </div>
            </div>
          </div>
        ) : null}
        {savedPost === 0 ? (
          <div className="w-full flex-col mt-4">
            <div className="mb-6">
              <Link to={"/create"}>
                <button className="px-3 rounded-md py-2 text-white bg-black">
                  Add Artikel +{" "}
                </button>
              </Link>
            </div>
            {data ? (
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="bg-white"
                autoHeight
              />
            ) : (
              <div>
                <h1>waiting...</h1>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <div className="mt-[100px]">
        <Footer />
      </div>
    </div>
  );
}
