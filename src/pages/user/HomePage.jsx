import { useEffect, useState } from "react";
import CardSlider from "../../component/CardSlider.jsx";
import Footer from "../../component/Footer.jsx";
import JudulBlog from "../../component/JudulBlog.jsx";
import MainHomePage from "../../component/MainHomePage.jsx";
import NavigationBar from "../../component/NavigationBar.jsx";
import UnderHeader from "../../component/UnderHeader.jsx";
import axios from "axios";
import { server } from "../../server.js";
import Sidebar from "../../component/Sidebar.jsx";
import CategoryHome from "../../component/CategoryHome.jsx";

function HomePage() {
  let [windowWidth, setWindowWidth] = useState(null);
  const [populer, setPopuler] = useState([]);
  const [terbaru, setTerbaru] = useState([]);
  const [artikel, setArtikel] = useState([]);

  const HomePageApi = async () => {
    axios
      .get(`${server}api/v2/artikel/homepage`)
      .then((response) => {
        setPopuler(response.data.populer);
        setTerbaru(response.data.terbaru);
        setArtikel(response.data.artikelhomepage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const WindowWidth = () => {
    var width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    setWindowWidth(width);
  };

  useEffect(() => {
    HomePageApi();
  }, []);

  useEffect(() => {
    WindowWidth();
  });

  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <UnderHeader />
      <NavigationBar sidebar={sidebar} setSidebar={setSidebar}></NavigationBar>
      <div className="w-full mx-auto">
        {sidebar ? <Sidebar setSidebar={setSidebar} sidebar={sidebar} /> : null}

        <JudulBlog />
        <CategoryHome />
        <CardSlider windowWidth={windowWidth} data={populer} />
        <MainHomePage terbaru={terbaru} artikel={artikel} />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
