import { useNavigate } from "react-router-dom";
import LeftSideHomePage from "./LeftSideHomePage";
import LeftSideHomePage1 from "./LeftSideHomePage1";
import RightSideHomePage from "./RightSideHomePage";

export default function MainHomePage() {
  const nav = useNavigate();
  return (
    <div className="w-full flex-col items-center justify-center">
      <div className="w-11/12 flex mx-auto">
        <div className="w-[70%] min-h-screen">
          <h1 className="text-3xl font-[500] mt-6 pl-2">Popular</h1>
          <LeftSideHomePage1 />
          <h1 className="text-3xl font-[500] mt-6 pl-2">Artikel</h1>
          <LeftSideHomePage />
        </div>
        <div className="w-[30%] min-h-screen ">
          <h1 className="text-3xl text-black font-[500] mt-6 pl-2">Artikel</h1>
          <RightSideHomePage />
        </div>
      </div>
      <div className="w-11/12 my-[40px] mx-auto justify-center items-center flex">
        <button
          className="h-[40px] w-[20%] bg-yellow-500 rounded-md"
          onClick={() => nav("/artikel")}
        >
          Load More..
        </button>
      </div>
    </div>
  );
}
