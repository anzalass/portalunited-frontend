import { useNavigate } from "react-router-dom";
import LeftSideHomePage from "./LeftSideHomePage";
import LeftSideHomePage1 from "./LeftSideHomePage1";
import RightSideHomePage from "./RightSideHomePage";

export default function MainHomePage({ terbaru, artikel }) {
  const nav = useNavigate();
  return (
    <div className="w-full flex-col items-center justify-center mx-auto">
      <div className="w-11/12 flex mx-auto">
        <div className="w-full  md:w-[70%] sm:w-full lg:w-[70%] xl:w-[70%] min-h-screen ">
          <h1 className="text-xl font-[500] mt-5 -ml-2 pl-2 font-Poppins">
            Popular
          </h1>
          <LeftSideHomePage1 data={terbaru} />
          <h1 className="text-xl font-[500] mt-6 pl-2 font-Poppins">Artikel</h1>
          <LeftSideHomePage data={artikel} />
        </div>
        <div className="w-[30%] min-h-screen hidden sm:hidden md:block lg:block xl:block ">
          <h1 className="text-xl text-black font-[500] mt-6 pl-2 font-Poppins">
            Artikel
          </h1>
          <RightSideHomePage data={terbaru} />
        </div>
      </div>
      <div className="w-11/12 my-[40px] mx-auto justify-center items-center flex">
        <button
          className="h-[40px] w-[40%] lg:w-[20%] xl:w-[20%] sm:w-[30%] md:w-[25%] bg-[#c70101]  rounded-md text-white font-thin"
          onClick={() => nav("/artikel")}
        >
          Load More..
        </button>
      </div>
    </div>
  );
}
