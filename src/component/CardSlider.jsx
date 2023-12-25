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

export default function CardSlider({ windowWidth, data }) {
  // const [dataSlide, setDataSlide] = useState(data);
  let [valueSlide, setVlaueSlide] = useState(0);

  const slideValue = () => {
    if (windowWidth < 400) {
      setVlaueSlide(2);
    } else if (windowWidth > 400 && windowWidth < 800) {
      setVlaueSlide(3);
    } else {
      setVlaueSlide(4);
    }
  };
  useEffect(() => {
    slideValue();
  }, [windowWidth]);

  return (
    <div className="w-full  justify-center items-center  flex-col rounded-b-md">
      <div className="w-11/12 bg--600 mx-auto mb-6 mt-5 ">
        <h1 className="text-xl text-center  font-Poppins">Trending </h1>
      </div>
      <div className="w-11/12 justify-center flex items-center mx-auto rounded-b-md">
        <Swiper
          spaceBetween={10}
          freeMode={true}
          navigation={true}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={valueSlide}
          pagination={{ clickable: true }}
        >
          {data.map((p, index) => {
            return (
              <>
                <SwiperSlide key={index} className=" bg-white rounded-b-md">
                  <Card key={index} data={p} />
                </SwiperSlide>
              </>
            );
          })}
          {/* {data.map((data, index) => {
            <>
              <SwiperSlide key={index} className=" bg-white rounded-b-md">
                <Card key={index} data={data} />
              </SwiperSlide>
            </>;
          })} */}

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
