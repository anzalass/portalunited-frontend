import { useEffect, useState } from "react";
import NavigationBar from "../../component/NavigationBar";
import ReactQuill from "react-quill";
// import "./texteditor.css";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../component/Sidebar";
import Footer from "../../component/Footer";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function CreatePost() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const [isi, setIsi] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [errors, setError] = useState({
    isi: "",
    slug: "",
    tags: "",
    title: "",
    category: "",
  });
  const nav = useNavigate();
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
  const [sidebar, setSidebar] = useState(false);
  const addGambar = (e) => {
    e.preventDefault();
    setImages((prevImages) => [
      ...prevImages,
      {
        name: image.name,
        file: image,
      },
    ]);
    setImage(null);
  };

  const hapusGambar = (e) => {
    const del = images.filter((img) => img.name !== e);
    setImages(del);
  };

  useEffect(() => {
    getCategory();
    if (isAuthenticated === false) {
      nav("/login");
    }
  }, [user]);

  const createArtikel = async (e) => {
    e.preventDefault();
    const swalLoading = Swal.fire({
      title: "Memproses...",
      html: "Mohon tunggu...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const imageForm = new FormData();

    await axios
      .post(`${server}artikel/create1`, {
        title: title,
        author: user?.username,
        tags: tags,
        authorId: user?._id,
        isi: isi,
        category: category,
      })
      .then((res) => {
        imageForm.append("idartikel", res.data.CreateArtikel._id);
        for (const file of images) {
          imageForm.append("images", file.file);
        }
        axios
          .post(`${server}artikel/images`, imageForm)
          .then((response) => {
            Swal.fire({
              showConfirmButton: false,
              title: "Berhasil Membuat Artikel",
              timer: 1000,
              icon: "success",
            });
            nav("/profile");
          })
          .catch((error) => {
            toast.error(error);

            swalLoading.close();
          });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setError({
          slug: error?.response?.data?.message?.errors?.slug?.message,
          isi: error?.response?.data?.message?.errors?.isi?.message,
          tags: error?.response?.data?.message?.errors?.tags?.message,
          title: error?.response?.data?.message?.errors?.title?.message,
        });
        console.log(errors);
        swalLoading.close();
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
  return (
    <div className="w-full relative">
      <NavigationBar sidebar={sidebar} setSidebar={setSidebar}></NavigationBar>
      {sidebar ? <Sidebar setSidebar={setSidebar} sidebar={sidebar} /> : null}
      <div className="w-11/12 mx-auto mt-12  min-h-screen ">
        <h1 className="text-center text-3xl font-[700] pb-4">
          Write Your Article
        </h1>

        <div className="w-full py-2">
          <input
            type="text"
            value={title}
            required={true}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukan Judul"
            className="h-[60px] w-full px-2 text-xl font-[600] shadow-md  rounded-lg"
          />
          <p>
            {errors?.isi ? (
              <p className="text-sm text-red-500">*{errors?.isi}</p>
            ) : null}
          </p>
        </div>

        <div className="w-full py-2 mt-4">
          <select
            name=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id=""
            required={true}
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
          {errors?.category ? (
            <p className="text-sm text-red-500">*{errors?.tags}</p>
          ) : null}
        </div>
        <div className="w-full py-2 mt-4">
          <input
            required={true}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            type="text"
            placeholder="Masukan Tags.."
            className="h-[40px] w-full px-2 shadow-md  rounded-lg"
          />
          <p>
            {errors?.tags ? (
              <p className="text-sm text-red-500">*{errors?.tags}</p>
            ) : null}
          </p>
        </div>
        <div className="w-full py-2 mt-4">
          <input
            required={true}
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            placeholder="Masukan Gambar.."
            className="h-[40px] w-full px-2 shadow-md  rounded-lg"
          />
          {image ? (
            <div className="w-full py-4 justify-center">
              <img
                className="w-[300px] h-[300px] object-contain "
                src={URL.createObjectURL(image)}
                alt=""
              />
              <button
                className="p-3 text-xl font-abc font-[500] border-black border-[1px] rounded-full"
                onClick={addGambar}
              >
                +
              </button>
            </div>
          ) : null}
        </div>
        <div className="w-[60%] justify-start overflow-x-auto flex">
          {images &&
            images?.map((i) => (
              <>
                <div className="w-full relative ">
                  <img
                    src={URL.createObjectURL(i.file)}
                    className="rounded-md ml-3 h-[200px] px-2 w-[200px] object-cover "
                    alt=""
                  />
                  <div
                    onClick={() => hapusGambar(i.name)}
                    className="absolute left-5 rounded-lg text-center pb-1    top-0 h-[25px] w-[20px] bg-red-600 text-white"
                  >
                    <h1>X</h1>
                  </div>
                </div>
              </>
            ))}
        </div>
        <div className="mt-8">
          <ReactQuill
            className="h-[400px] bg-white"
            theme={"snow"}
            value={isi}
            onChange={setIsi}
            modules={modules}
          />
          <p>
            {errors?.isi ? (
              <p className="text-sm text-red-500">*{errors?.isi}</p>
            ) : null}
          </p>
        </div>
        <button
          onClick={createArtikel}
          disabled={disableBtn ? true : false}
          className={`${
            disableBtn ? " bg-blue-300" : "bg-blue-800"
          } w-[50%] mx-auto text-center text-white py-2 mt-[70px] rounded-md`}
        >
          Publish
        </button>

        <button
          onClick={() => nav("/profile")}
          className="bg-red-600 px-3 py-2 w-[50%] text-white  rounded-md  "
        >
          Batal
        </button>
      </div>
      <div className="mt-[100px]">
        <Footer />
      </div>
    </div>
  );
}
