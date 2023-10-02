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

export default function CreatePost() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const [isi, setIsi] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);
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
  }, []);

  const createArtikel = async (e) => {
    e.preventDefault();
    const artikelForm = new FormData();

    images.forEach((img) => {
      artikelForm.append("images", img.file);
    });

    artikelForm.append("title", title);
    artikelForm.append("author", user?.username);
    artikelForm.append("tags", tags);
    artikelForm.append("authorId", user?._id);
    artikelForm.append("isi", isi);
    artikelForm.append("category", category);

    await axios.post(`${server}artikel/create`, artikelForm);
    console.log(user._id);
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
    <div className="w-full h-[200vh] relative">
      <NavigationBar />
      <div className="w-11/12 mx-auto mt-12">
        <h1 className="text-center text-3xl font-[700] pb-4">
          Write Your Article
        </h1>
        <div className=" justify-end w-full items-end">
          <button
            onClick={() => nav("/profile")}
            className="bg-red-600 px-3 py-2 ml-[95%] text-white  rounded-md top-[100px] "
          >
            Batal
          </button>
        </div>
        <div className="w-full py-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukan Judul"
            className="h-[60px] w-full px-2 text-xl font-[600] shadow-md  rounded-lg"
          />
        </div>
        <div className="w-full py-2 mt-4">
          <select
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
        </div>
        <div className="w-full py-2 mt-4">
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            type="text"
            placeholder="Masukan Tags.."
            className="h-[40px] w-full px-2 shadow-md  rounded-lg"
          />
        </div>
        <div className="w-full py-2 mt-4">
          <input
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
              <button onClick={addGambar}>add Gambar</button>
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
          <div
            dangerouslySetInnerHTML={{ __html: isi }}
            className="mt-[60px] hasil"
          ></div>
          <div className="mt-12">{isi}</div>
        </div>
        <div
          onClick={createArtikel}
          className="w-[50%] mx-auto text-center text-white py-2 mt-[70px] rounded-md bg-blue-800"
        >
          Publish
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: value }}></div> */}
      </div>
    </div>
  );
}
