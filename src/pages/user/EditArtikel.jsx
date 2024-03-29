import { useEffect, useState } from "react";
import NavigationBar from "../../component/NavigationBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../component/Sidebar";

export default function EditArtikel() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [isi, setIsi] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState(null);
  const [image, setImage] = useState();
  const [category, setCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [data, setData] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.user);
  const nav = useNavigate();

  const getArtikelbyId = async () => {
    try {
      const { data } = await axios.get(`${server}artikel/artikel/${id}`);
      setTitle(data?.artikel.title);
      setTags(data?.artikel?.tags);
      setIsi(data?.artikel?.isi);
      setCategory(data?.artikel?.category);
      setImage(data?.artikel?.images);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    await axios
      .get(`${server}category/`)
      .then((response) => {
        setCategoryData(response.data.category);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategory();
    getArtikelbyId();
    if (isAuthenticated === false) {
      nav("/login");
    }
  }, [id]);

  const upDateArtikel = async (e) => {
    e.preventDefault();
    const artikelForm = {
      title,
      authorId: user._id,
      tags,
      isi,
      category,
    };

    await axios
      .put(`${server}artikel/update-artikel/${id}`, artikelForm)
      .then((response) => {
        toast.success(response.data.message);
        nav("/profile");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
      });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: " +1" },
      ],
      ["link", "image", "video"],
    ],
  };
  const [sidebar, setSidebar] = useState(false);
  return (
    <div className="w-full h-[200vh] relative">
      <NavigationBar sidebar={sidebar} setSidebar={setSidebar}></NavigationBar>
      {sidebar ? <Sidebar setSidebar={setSidebar} sidebar={sidebar} /> : null}
      <div className="w-11/12 mx-auto mt-12">
        <h1 className="text-center text-3xl font-[700] pb-4">
          Write Your Article
        </h1>
        <Link to={"/profile"}>
          <div className=" justify-end flex w-full items-end">
            <button className="bg-red-600 px-3 py-2  text-white  rounded-md top-[100px] ">
              Batal
            </button>
          </div>
        </Link>

        <div className="w-full py-2">
          <h1 className="text-center my-4">
            {" "}
            <span className="text-red-600">*</span> You Cant Edit the Image
          </h1>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukan Judul"
            className="h-[60px] w-full px-2 text-xl font-[600] shadow-md  rounded-lg"
          />
        </div>
        <div className="w-full py-2 mt-4">
          <select
            required
            name=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id=""
            className="w-[50%] rounded-md shadow-lg h-[40px]"
          >
            <option value="">Masukan Category</option>
            {categoryData &&
              categoryData.map((c) => (
                <option value={c.name} key={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <p></p>
        </div>
        <div className="w-full py-2 mt-4">
          <input
            value={tags}
            required
            onChange={(e) => setTags(e.target.value)}
            type="text"
            placeholder="Masukan Tags.."
            className="h-[40px] w-full px-2 shadow-md  rounded-lg"
          />
        </div>

        <div className="mt-8">
          <ReactQuill
            className="h-[400px] bg-white"
            theme="snow"
            value={isi}
            onChange={setIsi}
            modules={modules}
          />
        </div>
        <div
          onClick={upDateArtikel}
          className="w-[50%] mx-auto text-center text-white py-2 mt-[70px] rounded-md bg-blue-800"
        >
          Publish
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: value }}></div> */}
      </div>
    </div>
  );
}
