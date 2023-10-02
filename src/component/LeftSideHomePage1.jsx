import axios from "axios";
import Card3 from "./Card3";
import { server } from "../server";
import { useEffect, useState } from "react";

export default function LeftSideHomePage1() {
  const [news, setNews] = useState([]);

  const getArtikelNews = async () => {
    await axios
      .get(`${server}artikel/terbaru`)
      .then((res) => {
        setNews(res.data.terbaru);
        console.log(news);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getArtikelNews();
  }, []);

  return (
    <div className="mb-4 grid grid-cols-2 ">
      {news?.map((n, index) => (
        <Card3 data={n} key={index} />
      ))}
    </div>
  );
}
