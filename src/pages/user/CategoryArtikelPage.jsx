import React, { useEffect, useState } from "react";
import NavigationBar from "../../component/NavigationBar";
import { server } from "../../server";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Card7 from "../../component/Card7";
import Footer from "../../component/Footer";
import Sidebar from "../../component/Sidebar";

export default function CategoryArtikelPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [data, setData] = useState([]);

  const category = queryParams.get("category");

  const getAllArtikelByCategory = async (currentPage) => {
    const res = await axios.get(
      `${server}artikel/related-category/?page=${
        currentPage ? currentPage : 1
      }&category=${category}`
    );

    return res.data;
  };

  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const initialData = await getAllArtikelByCategory();
      setData(initialData?.Category);
    };
    fetchData();
  }, []);

  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const dataArtikel = await getAllArtikelByCategory(currentPage);
    setData(dataArtikel?.Category);
  };

  return (
    <div>
      <NavigationBar sidebar={sidebar} setSidebar={setSidebar}></NavigationBar>
      {sidebar ? <Sidebar setSidebar={setSidebar} sidebar={sidebar} /> : null}
      <div className="w-full h-screen">
        <div className="w-11/12 mx-auto mt-[10px]">
          <div className=" grid grid-cols-5 gap-3 ">
            {data ? (
              data.map((d, index) => <Card7 data={d} key={index} />)
            ) : (
              <h1>Please Wait...</h1>
            )}
          </div>
          <div className=" grid grid-cols-5 gap-3 "></div>
        </div>
      </div>
      <div className="">
        <div className="mt-[80px] mb-[50px]">
          <ReactPaginate
            className="flex justify-center "
            previousLabel={"Back"}
            breakLabel={"..."}
            breakClassName="border py-2 px-3"
            nextLabel={"Next"}
            pageCount={10}
            previousClassName="border py-2 px-3 my-auto"
            nextClassName="my-auto border py-2 px-3"
            activeClassName={" bg-green-500"}
            pageClassName="border py-2 px-3"
            onPageChange={handlePageClick}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}
