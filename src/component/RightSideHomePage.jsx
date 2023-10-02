import { useEffect, useState } from "react";
import Card4 from "./Card4";
import axios from "axios";
import { server } from "../server";

export default function RightSideHomePage() {
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
    <div className="flex-col w-full p-3 bg-white">
      {news.map((n, index) => (
        <>
          <div className="p-2">
            <Card4 data={n} key={index} />
          </div>
        </>
      ))}
    </div>
  );
}
