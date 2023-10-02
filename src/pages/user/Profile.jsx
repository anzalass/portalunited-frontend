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

export default function Profile() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [logout, setLogout] = useState(false);
  const { user } = useSelector((state) => state.user);
  let [savedPost, setSavedPost] = useState(0);
  const [data, setData] = useState([]);
  const [dataSave, setDataSave] = useState([]);
  const nav = useNavigate();

  const getYourArtikel = async () => {
    await axios
      .get(`${server}artikel/your-artikel/${user?._id}`)
      .then((response) => {
        setData(response.data.youArtikel);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(savedPost.length);

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
  const getSavedPost = async () => {
    const { data } = await axios.get(`${server}saved/get-save/${user._id}`);
    setDataSave(data.getSave);
  };

  useEffect(() => {
    getYourArtikel();
    getSavedPost();
    if (isAuthenticated === false) {
      nav("/login");
    }
  }, [user?._id]);

  // const ArtikelList = [
  //   {
  //     _id: "112244",
  //     judul:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing lorem, sed do eiusmod tempor incididunt ut lab",
  //     category: "Sports",
  //     tags: "manchester united, bruno, euro",
  //     createdAt: new Date(),
  //   },
  // ];

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
      <NavigationBar />
      <div className="w-11/12 mx-auto mt-[100px] h-screen">
        <div className="w-full rounded-lg flex relative  bg-white justify-center items-center h-[200px]">
          <button
            onClick={() => setLogout(true)}
            className="absolute right-4 bg-red-600 px-3 w-[100px] h-[40px] text-white font-[500] rounded-md py-2 top-2"
          >
            <span className="absolute top-2 left-3">Logout</span>{" "}
            <MdOutlineLogin size={22} className="absolute top-[10px] right-2" />
          </button>
          <img
            src={`http://localhost:8000/${user?.avatar}`}
            alt={user?.avatar}
            className="h-[100px] w-[100px] rounded-full mr-2 object-cover"
          />
          <div className="flex-col ">
            <ol className=" list-decimal list-inside">
              <li> {user?.username}</li>
              <li> {user?.username}</li>
            </ol>
            {/* <h1 className="text-center text-2xl font-[500]">
              {user?.username}
            </h1> */}
            <h1 className="font-[500] pl-3 italic">
              {new Date(user?.createdAt).toLocaleDateString(undefined, {
                dateStyle: "full",
              })}
            </h1>
            <h1 className="pl-3 "> Total Post :{data?.length}</h1>
          </div>
        </div>
        <div className=" justify-between flex h-[60px] bg-black">
          <div
            onClick={() => setSavedPost(0)}
            className={` ${
              savedPost === 0 ? "bg-white text-black " : "text-white"
            } w-[50%]  my-auto flex items-center  hover:bg-white hover:text-black h-full cursor-pointer justify-center`}
          >
            <h1 className="text-center font-[500] text-xl">
              Your Post ({data?.length})
            </h1>
          </div>
          <div
            onClick={() => setSavedPost(1)}
            className={` ${
              savedPost === 1 ? "bg-white text-black " : "text-white"
            } w-[50%]  my-auto flex items-center  hover:bg-white hover:text-black h-full cursor-pointer justify-center`}
          >
            <h1 className="text-center  font-[500] text-xl">
              Saved Post ({dataSave.length})
            </h1>
          </div>
          <div
            onClick={() => setSavedPost(3)}
            className={` ${
              savedPost === 3 ? "bg-white text-black " : "text-white"
            } w-[50%]  my-auto flex items-center  hover:bg-white hover:text-black h-full cursor-pointer justify-center`}
          >
            <h1 className="text-center  font-[500] text-xl">Category (2)</h1>
          </div>
          <div className="w-[50%] h-full my-auto justify-center flex items-center  hover:bg-white hover:text-black text-white bg-black">
            <h1 className="text-center font-[500] text-xl">Edit Profile</h1>
          </div>
        </div>
        {savedPost === 3 ? (
          <div className="">
            <Category />
          </div>
        ) : null}

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
    </div>
  );
}
