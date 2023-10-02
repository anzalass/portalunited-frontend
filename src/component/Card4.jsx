export default function Card4({ data }) {
  return (
    <div className="w-full h-[120px] flex bg-white hover:bg-slate-100">
      <div className="w-[30%]">
        <img
          src={`http://localhost:8000/${data?.images[0]}`}
          alt=""
          className="object-cover w-[100px] h-[120px] rounded-md"
        />
      </div>
      <div className="w-[70%] px-2 mt-4">
        <h1 className=" text-black font-[500]">
          {" "}
          {data?.title.length > 80
            ? data.title.slice(0, 77) + "..."
            : data.title}
        </h1>
        <h1 className="italic font-[300]">{data?.author?.username}</h1>
      </div>
    </div>
  );
}
