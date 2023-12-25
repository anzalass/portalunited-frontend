import { useState } from "react";
import { useSearch } from "../../SearchContext";
import Card7 from "../../component/Card7";
import Footer from "../../component/Footer";
import NavigationBar from "../../component/NavigationBar";
import Sidebar from "../../component/Sidebar";

export default function SearchResult() {
  const [values, setValues] = useSearch();

  const [sidebar, setSidebar] = useState(false);
  return (
    <div>
      {" "}
      <NavigationBar sidebar={sidebar} setSidebar={setSidebar}></NavigationBar>
      {sidebar ? <Sidebar setSidebar={setSidebar} sidebar={sidebar} /> : null}
      <div className="w-full h-screen">
        <div className="w-11/12 mx-auto mt-[30px]">
          <div className="flex-col justify-center w-full">
            <h1 className="text-center mt-[0px]">All Artikel</h1>
            {values.result.length < 1 ? (
              <h1 className="mt-[5px] text-center">Not Found</h1>
            ) : (
              <h1 className="mt-[5px]  text-center">
                Found {values.result.length} Artikel
              </h1>
            )}
          </div>
          <div className=" grid grid-cols-1 lg:grid-cols-5  xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2    gap-3 ">
            {values?.result?.map((d, index) => (
              <Card7 data={d} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
