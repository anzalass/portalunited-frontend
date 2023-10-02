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
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Footer from "../../component/Footer";

export default function DetailArtikel() {
  const [comen, setComen] = useState("");
  const [dbc, setDbc] = useState();
  const [balesComen, setBalesComen] = useState("");
  const [idComen, setIdComen] = useState("");
  const [namaComen, setNamaComen] = useState("");
  const [balesComenInput, setBalesComenInput] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [dataComen, setDataComen] = useState(null);
  const [save, setSave] = useState(null);

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

  const getComent = async () => {
    const { data } = await axios.get(`${server}comen/get-comen/${id}`);
    setDataComen(data?.getComen);
  };

  const balesComenFunc = async (idComen) => {
    await axios
      .post(`${server}balescomen/post-bales-comen`, {
        idArtikel: data?._id,
        idUser: user?._id,
        namaUser: user.username,
        parentComen: idComen,
        isi: balesComen,
      })
      .then((response) => {
        toast.success("sukses");
        setBalesComen("");
      })
      .catch((error) => {
        console.log(error);
        toast.error("error");
      });
  };

  // const getBalesComentar = () => {
  //   axios
  //     .get(`${server}balescomen/get-bales-comen/${id}`)
  //     .then((response) => {
  //       setDataBalesComen(response.data.getBalesComent);
  //       console.log(dataBalesComen);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const getBalesComentar = (id) => {
    axios
      .get(`${server}balescomen/get-bales-comen/?q=${id}`)
      .then((response) => {
        setDbc(response.data.balesComent);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getArtikelbyId = async () => {
    await axios
      .get(`${server}artikel/artikel/${id}`)
      .then((response) => {
        setData(response.data.artikel);
      })
      .catch((err) => {
        console.log(err);
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
          .delete("http://localhost:8000/api/v2/saved/delete-save-artikel", {
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
            images: data?.images[0],
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
        savedBy: user._id,
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
    getComent();
  }, [id]);

  useEffect(() => {}, [id]);

  return (
    <div className="w-full">
      <NavigationBar />
      <div className="w-11/12 mt- flex mx-auto px-2 mt-[100px] mb-[80px] ">
        <div className="w-[75%] bg-white min-h-screen px-2">
          <div className="mt-4">
            <h4 className="text-red-500 font-[500]">{data?.category}</h4>
            <h1 className="text-3xl font-[500]">{data?.title}</h1>
            <div className="flex justify-between w-full pr-3">
              <h3 className="text-[400] text-blue-600 italic mt-2">
                {data?.author?.username}
              </h3>
              <h3 className="text-gray-500 font-[500]">
                {new Date(data?.createdAt).toLocaleDateString(undefined, {
                  dateStyle: "full",
                  calendar: "islamicc",
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
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <img
                  src={`http://localhost:8000/${data?.images[0]}`}
                  alt={data?.images[1]}
                  className="h-[280px] mx-auto w-[400px] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={`http://localhost:8000/${data?.images[1]}`}
                  alt={data?.images[1]}
                  className="h-[280px] mx-auto w-[400px] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={`http://localhost:8000/${data?.images[2]}`}
                  alt={data?.images[2]}
                  className="h-[280px] mx-auto w-[400px] object-cover"
                />
              </SwiperSlide>
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
        <div className="w-[25%] bg-white ml-2 min-h-screen">
          <div className="w-full p-3">
            <h1 className="text-center text-2xl font-[500]">Artikel Terkait</h1>
          </div>
          <div className="w-full px-3 py-3">
            <div className="mb-2">
              <Card5 />
            </div>
            <div className="mb-2">
              <Card5 />
            </div>
            <div className="mb-2">
              <Card5 />
            </div>
            <div className="mb-2">
              <Card5 />
            </div>
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
        <div className="flex-col w-[70%] bg-white p-3">
          <div className="rounded-md p-2 bg-zinc-100 my-4">
            {dataComen &&
              dataComen.map((dc, index) => (
                <div key={index} className="">
                  <h1 className="text-[15px] font-[600]">{dc.namaUser}</h1>
                  <h1>{dc.isi}</h1>
                  <h1
                    onClick={() => {
                      setIdComen(dc._id);
                      setNamaComen(dc.namaUser);
                      setBalesComenInput(true);
                      getBalesComentar(dc._id);
                    }}
                  >
                    balas
                  </h1>
                </div>
              ))}
            {dbc?.map((db, index) => (
              <div key={index} className="">
                <h1>{db.isi}</h1>
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
                onClick={() => balesComenFunc(idComen)}
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
