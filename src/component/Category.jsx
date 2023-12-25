import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { server } from "../server";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Category({ navigasi }) {
  const [cat, setCat] = useState([]);
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(false);
  const [idc, setId] = useState("");
  const [img, setImg] = useState(null);
  const nav = useNavigate();

  const getAllCategory = async () => {
    const { data } = await axios.get(`${server}category/`);
    setCat(data.category);
  };

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
      })
      .catch((error) => {
        toast.error("Category already exists");
      });
  };

  const addCategory = async () => {
    const Form = new FormData();

    Form.append("file", img),
      Form.append("name", name),
      await axios
        .post(`${server}category/create`, Form, { withCredentials: true })
        .then((response) => {
          toast.success("Category created successfully");
          setName("");
          setImg(null);
          window.location.href("/profile");
          nav("/profile");
          navigasi(3);
        })
        .catch((error) => {
          console.log(error);
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
            <div className="">
              <div className="">
                <input
                  type="text"
                  placeholder="Masukan Category"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-[40px] w-[100%] border-black rounded-md pl-2"
                />
              </div>
              <div className="">
                <input
                  type="file"
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </div>
            </div>

            <button
              type="submit"
              onClick={addCategory}
              className="h-[40px] rounded-md px-2 bg-sky-700 text-white"
            >
              Add Category
            </button>
          </div>
        )}
        {img ? (
          <img
            src={URL.createObjectURL(img)}
            className="h-[100px] w-[200px] object-cover"
          />
        ) : null}
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
