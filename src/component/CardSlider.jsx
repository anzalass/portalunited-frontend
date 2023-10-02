import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Card from "./Card";
import axios from "axios";
import { server } from "../server";
import { useEffect, useState } from "react";

export default function CardSlider() {
  const [dataSlide, setDataSlide] = useState([]);

  const getPopuler = async () => {
    await axios
      .get(`${server}artikel/populer`)
      .then((response) => {
        setDataSlide(response.data.populer);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(dataSlide);
    getPopuler();
  }, []);

  return (
    <div className="w-full  justify-center items-center  flex-col rounded-b-md">
      <div className="w-11/12 bg--600 mx-auto mb-6 mt-5 ">
        <h1 className="text-3xl font-[600]">Trending </h1>
      </div>
      <div className="w-11/12 justify-center flex items-center mx-auto rounded-b-md">
        <Swiper
          spaceBetween={10}
          freeMode={true}
          navigation={true}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={dataSlide.length > 4 ? 4 : 3}
          pagination={{ clickable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {dataSlide &&
            dataSlide.map((s, index) => (
              <>
                <SwiperSlide className=" bg-white rounded-b-md">
                  <Card data={s} key={index} />
                </SwiperSlide>
              </>
            ))}
          {/* <SwiperSlide className="bg-white">
            <Card />
          </SwiperSlide>
          <SwiperSlide className="bg-white">
            <Card />
          </SwiperSlide>
          <SwiperSlide className="bg-white">
            <Card />
          </SwiperSlide>
          <SwiperSlide className="bg-white">
            <Card />
          </SwiperSlide>
          <SwiperSlide className="bg-white">
            <Card />
          </SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
}
