import NavigationBar from "../../component/NavigationBar";
import { BsBookmarkDash, BsBookmarkCheckFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./texteditor.css";
import Card5 from "../../component/Card5";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Footer from "../../component/Footer";
import Sidebar from "../../component/Sidebar";

export default function DetailArtikel() {
  const [comen, setComen] = useState("");
  const [dbc, setDbc] = useState();
  const [balesComen, setBalesComen] = useState("");
  const [idComen, setIdComen] = useState("");
  const [namaComen, setNamaComen] = useState("");
  const [balesComenInput, setBalesComenInput] = useState(false);
  const [recomendation, setRecomendation] = useState([]);
  const [images, setImages] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [dataComen, setDataComen] = useState(null);
  const [save, setSave] = useState(null);
  const nav = useNavigate();

  const postComen = async () => {
    await axios
      .post(`${server}comen/post-comen`, {
        idArtikel: data?._id,
        idUser: user?._id,
        namaUser: user.username,
        isi: comen,
      })
      .then((response) => {
        toast.success("sukses");
        window.location.reload();
        setComen("");
      })
      .catch((error) => {
        console.log(error);
        toast.error("error");
      });
  };
  const postReply = async (pcid) => {
    await axios
      .post(`${server}comen/reply-comen`, {
        parentComen: pcid,
        idUser: user?._id,
        namaUser: user.username,
        isi: balesComen,
      })
      .then((response) => {
        toast.success("sukses");
        window.location.reload();
        setComen("");
      })
      .catch((error) => {
        console.log(error);
        toast.error("error");
      });
  };

  const getComenByArtikelId = async () => {
    await axios.get(`${server}comen/comen/${id}`).then((response) => {
      setDataComen(response?.data?.commentsWithReply);
    });
  };

  const getArtikelbyId = async () => {
    await axios
      .get(`${server}artikel/artikel/${id}`)
      .then((response) => {
        setData(response.data.artikel);
        setRecomendation(response.data.getRecomendations);
        setImages(response.data.images);
      })
      .catch((err) => {
        console.log(err);
        nav("/not-found");
        nav;
      });
  };

  const saveAndDelArtikel = async () => {
    try {
      const response = await axios.get(`${server}saved/cek-save`, {
        params: {
          artikelId: id,
          savedBy: user._id,
        },
      });
      const { disimpan } = response.data;
      if (disimpan === true) {
        await axios
          .delete(`${server}saved/delete-save-artikel`, {
            data: {
              artikelId: id,
              savedBy: user._id,
            },
          })
          .then((response) => {
            toast.success("Artikel deleted");
            setSave(false);
          });
      } else if (disimpan === false) {
        await axios
          .post(`${server}saved/save-artikel`, {
            title: data?.title,
            artikelId: id,
            savedBy: user._id,
          })
          .then((response) => {
            toast.success("Artikel saved");
            setSave(true);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cekSaved = async () => {
    const response = await axios.get(`${server}saved/cek-save`, {
      params: {
        artikelId: id,
        savedBy: user?._id,
      },
    });
    const { disimpan } = response.data;
    if (disimpan === true) {
      setSave(true);
    }
    if (disimpan === false) {
      setSave(false);
    }
  };

  useEffect(() => {
    getArtikelbyId();
    cekSaved();

    getComenByArtikelId();
  }, [id]);

  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="w-full font-Poppins">
      {sidebar ? <Sidebar setSidebar={setSidebar} sidebar={sidebar} /> : null}
      <NavigationBar setSidebar={setSidebar} sidebar={sidebar} />
      <div className="w-[98%]  flex mx-auto px-2 mt-[20px] mb-[80px] ">
        <div className="md:w-[75%] lg:w-[75%]  xl:w-[75%] w-[100%] min-h-screen px-2">
          <div className="mt-4">
            <h4 className="text-red-500 font-[500]">{data?.category}</h4>
            <h1 className="lg:text-3xl xl:text-3xl md:text-xl text-lg sm:text-lg  font-[500]">
              {data?.title}
            </h1>
            <div className="flex justify-between w-full pr-3">
              <h3 className="text-[400] text-blue-600 italic mt-2">
                {data?.author?.username}
              </h3>
              <h3 className="text-gray-500 font-[500] text-sm lg:text-[14px] xl:text-[14px] md:text-[13px]">
                {new Date(data?.createdAt).toLocaleDateString(undefined, {
                  dateStyle: "full",
                  // calendar: "islamicc",
                })}
              </h3>
            </div>
            <h4></h4>
          </div>
          <div className="mt-8">
            <Swiper
              spaceBetween={10}
              freeMode={true}
              navigation={true}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={1}
              scrollbar={{ draggable: true }}
              className="w-full"
              pagination={{ clickableClass: true }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image.image}
                    className="h-[280px] mx-auto w-[400px] object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mt-2 mb-2">
            <h1 className="italic"> {data?.views}x tayangan</h1>
          </div>
          <div className="relative w-full flex">
            {save ? (
              // ceklis
              <BsBookmarkCheckFill
                onClick={saveAndDelArtikel}
                className="absolute  top-5 right-3"
                size={30}
              />
            ) : (
              // strip
              <BsBookmarkDash
                onClick={saveAndDelArtikel}
                className="absolute top-5 right-3"
                size={30}
              />
            )}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: data?.isi }}
            className="mt-[60px] hasil"
          ></div>
        </div>
        <div className="w-[25%] hidden md:block lg:block xl:block  ml-2 min-h-screen">
          <div className="w-full p-3">
            <h1 className=" text-center text-2xl font-[500]">
              Artikel Terkait
            </h1>
          </div>
          <div className="w-full px-3 py-3">
            {recomendation.map((r, index) => (
              <div key={index} className="mb-2">
                <Card5 data={r} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" w-11/12 mb-[100px] mx-auto">
        <h1 className=" text-2xl font-[500]">Komentar</h1>
        <div className="mt-5 flex mb-5">
          <input
            type="text"
            value={comen}
            onChange={(e) => setComen(e.target.value)}
            className="h-[50px] w-[50%] rounded-md pl-3 "
            placeholder="Leave your comment..."
          />
          <button
            onClick={postComen}
            className="ml-2 h-[50px] bg-blue-700 text-white w-[80px] rounded-md"
          >
            Send
          </button>
        </div>
        <div className="flex-col w-[70%] bg-white rounded-lg p-1">
          <div className="rounded-md p-2 my-4">
            {dataComen &&
              dataComen.map((dc, index) => (
                <div key={index} className=" bg-zinc-100 rounded-lg mb-4 p-2">
                  <h1 className="text-[15px] font-[600] font-Poppins ">
                    {dc.namaUser}
                  </h1>
                  <h1>{dc.isi}</h1>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => {
                      setIdComen(dc._id);
                      setNamaComen(dc.namaUser);
                      setBalesComenInput(true);
                    }}
                  >
                    balas
                  </button>
                  <h1>
                    {dc?.reply.map((bc, index) => (
                      <div className="ml-[30px] mt-3" key={index}>
                        <h1 className="text-[15px] font-[600] font-Poppins">
                          {bc.namaUser}
                        </h1>
                        <h1>{bc.isi}</h1>
                      </div>
                    ))}
                  </h1>
                </div>
              ))}
          </div>

          {balesComenInput ? (
            <div className="flex mt-1">
              <input
                type="text"
                className="h-[30px] w-full rounded-md pl-2"
                placeholder={`balas ${namaComen}`}
                value={balesComen}
                onChange={(e) => setBalesComen(e.target.value)}
              />
              <button
                onClick={() => postReply(idComen)}
                className="h-[30px] w-[50px] bg-blue-700 text-white text-sm rounded-md"
              >
                Send
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}
