import axios from "axios";
import NavigationBar from "../../component/NavigationBar.jsx";
import { server } from "../../server.js";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import Card7 from "../../component/Card7.jsx";
import Footer from "../../component/Footer.jsx";
import Sidebar from "../../component/Sidebar.jsx";
export default function AllArtikel() {
  const [data, setData] = useState([]);

  const getAllArtikel = async (currentPage) => {
    const res = await axios.get(
      `${server}artikel/all-artikel/?page=${
        currentPage ? currentPage : 1
      }&limit=20`
    );

    return res.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const initialData = await getAllArtikel();
      setData(initialData?.allArtikel || []);
    };
    fetchData();
  }, []);

  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const dataArtikel = await getAllArtikel(currentPage);
    setData(dataArtikel.allArtikel);
  };

  const [sidebar, setSidebar] = useState(false);

  return (
    <div>
      <NavigationBar sidebar={sidebar} setSidebar={setSidebar}></NavigationBar>
      {sidebar ? <Sidebar setSidebar={setSidebar} sidebar={sidebar} /> : null}
      <div className="w-full min-h-screen">
        <div className="w-11/12 mx-auto mt-[30px]">
          <h1>All Artikel</h1>
          <div className=" grid lg:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 ">
            {data ? (
              data.map((d, index) => <Card7 data={d} key={index} />)
            ) : (
              <h1>Please Wait...</h1>
            )}
          </div>
        </div>
      </div>
      <div className="">
        <div className="mt-[160px] mb-[50px]">
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
