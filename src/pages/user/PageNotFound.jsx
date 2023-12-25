import { Link } from "react-router-dom";
import Footer from "../../component/Footer";
import NavigationBar from "../../component/NavigationBar";
import { useState } from "react";
import Sidebar from "../../component/Sidebar";

export default function PageNotFound() {
  const [sidebar, setSidebar] = useState(false);
  return (
    <div>
      <NavigationBar sidebar={sidebar} setSidebar={setSidebar}></NavigationBar>
      {sidebar ? <Sidebar setSidebar={setSidebar} sidebar={sidebar} /> : null}
      <div className="h-screen w-full -mt-[80px]">
        <div className="flex h-full w-11/12 mx-auto items-center justify-center">
          <div className="w-full  justify-center block md:flex lg:flex xl:flex">
            <div className="xl:w-[50%] lg:w-[50%] md:w-[50%] w-[100%] ">
              <img
                src={
                  "https://th.bing.com/th/id/OIP.dRN9BHXElKeKlVPmETo6KAHaFj?rs=1&pid=ImgDetMain"
                }
                className="rounded-lg"
                alt=""
              />
            </div>
            <div className="xl:w-[50%] lg:w-[50%] md:w-[50%] w-[100%] xl:-ml-[60px] lg:-ml[60px] md:placeholder:-ml-[40px] h-full">
              <div className="my-auto mt-[70px] ">
                <h1 className="font-Header text-3xl">PAGE NOT FOUND</h1>
                <p>
                  Unfortunately the page you are trying to view isnt available.
                  It may have been moved or perhap s you typed the wrong
                  address. Please use the website menu or search to find the
                  information or content you are looking for. If you want the
                  latest news, videos or match info, you should find it on our
                  homepage.{" "}
                </p>
                <div className="">
                  <Link to={"/"}>
                    <button className="px-4 py-2 mt-3 bg-[#c70101] text-white rounded-3xl">
                      Back to Homepage
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
