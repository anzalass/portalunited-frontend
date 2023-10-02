import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { server } from "../server";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

export default function Category() {
  const [cat, setCat] = useState([]);
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(false);
  const [idc, setId] = useState("");

  const getAllCategory = async () => {
    const { data } = await axios.get(`${server}category/`);
    setCat(data.category);
  };
  console.log(cat);

  useEffect(() => {
    getAllCategory();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 100, flex: 0.7 },
    { field: "category", headerName: "Category", minWidth: 150, flex: 0.7 },
    {
      field: "detail",
      headerName: "Detail",
      flex: 1,
      minWidth: 150,

      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button
              className="mr-4"
              onClick={() => {
                editCategory(params.id);
                setId(params.id);
              }}
            >
              <AiOutlineArrowRight size={20} />
            </button>
            <button
              className="mr-4"
              //  onClick={() => deleteArtikel(params.id)}
            >
              <BsTrash3 color="red" size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  const row = [];

  cat &&
    cat.forEach((a) => {
      row.push({
        id: a._id,
        category: a.name,
      });
    });

  const editCategory = async (id) => {
    try {
      const { data } = await axios.get(`${server}category/getbyid/${id}`);
      setName(data?.category.name);
    } catch (error) {
      console.log(error);
    }
    setEdit(true);
  };

  const editCatt = async () => {
    await axios
      .put(
        `${server}category/update/${idc}`,
        { name },
        { withCredentials: true }
      )
      .then((response) => {
        toast.success("Category created successfully");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Category already exists");
      });
  };

  //     try {
  //       await axios
  //       .put(
  //         `${server}category/update/${id}`,
  //         { name },

  //       )
  //       .then((response) => {
  //         toast.success("Category created successfully");
  //         window.location.reload();
  //       })
  //       .catch((error) => {
  //         toast.error("Category already exists");
  //       });
  //   } catch (error) {
  //       console.log(error);
  //   }

  const addCategory = async () => {
    await axios
      .post(`${server}category/create`, { name }, { withCredentials: true })
      .then((response) => {
        toast.success("Category created successfully");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Category already exists");
      });
  };

  return (
    <div className="w-full justify-center items-center flex-col mt-8">
      <div className="">
        {edit ? (
          <div className="flex">
            <input
              type="text"
              placeholder="Masukan Category"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-[40px] w-[20%] border-black rounded-md pl-2"
            />
            <button
              type="submit"
              onClick={editCatt}
              className="h-[40px] rounded-md px-2 bg-yellow-600 text-white"
            >
              edit Category
            </button>
          </div>
        ) : (
          <div className="flex">
            <input
              type="text"
              placeholder="Masukan Category"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-[40px] w-[20%] border-black rounded-md pl-2"
            />
            <button
              type="submit"
              onClick={addCategory}
              className="h-[40px] rounded-md px-2 bg-sky-700 text-white"
            >
              Add Category
            </button>
          </div>
        )}
      </div>
      <div className="w-full mt-4">
        {cat ? (
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="bg-white"
            autoHeight
          />
        ) : null}
      </div>
    </div>
  );
}
