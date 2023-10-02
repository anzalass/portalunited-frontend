import { useEffect, useState } from "react";
import CardSlider from "../../component/CardSlider.jsx";
import Footer from "../../component/Footer.jsx";
import JudulBlog from "../../component/JudulBlog.jsx";
import MainHomePage from "../../component/MainHomePage.jsx";
import NavigationBar from "../../component/NavigationBar.jsx";
import UnderHeader from "../../component/UnderHeader.jsx";
import axios from "axios";
import { server } from "../../server.js";

function HomePage() {
  const [dbc, setDbc] = useState([]);

  const getBalesComentar = () => {
    axios
      .get(`${server}balescomen/get-bales-comen/?q=64d19be33e69fe63292d17ea`)
      .then((response) => {
        setDbc(response.data?.balesComent);
        console.log(dbc);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBalesComentar();
  }, []);
  return (
    <div className="w-full">
      <NavigationBar></NavigationBar>
      <UnderHeader />
      <JudulBlog />
      <CardSlider />
      <MainHomePage />
      <div className="">
        {dbc?.map((d, index) => (
          <h1 key={index}>{d.isi}</h1>
        ))}
        tes
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
