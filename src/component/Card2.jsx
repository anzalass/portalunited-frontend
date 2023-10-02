export default function Card2() {
  return (
    <div className="w-full flex items-center justify-center  hover:bg-slate-100">
      <div className="w-[36%]">
        <img
          src="https://talksport.com/wp-content/uploads/sites/5/2023/07/DF-TALKSPORT-ARSENAL.jpg?strip=all&w=620&h=413&crop=1"
          alt=""
          className="h-[180px] w-[230px] object-cover rounded-md"
        />
      </div>
      <div className="flex-col pl-3 h-[200px] justify-center items-center w-[70%]">
        <div className="flex-col my-auto items-center w-full ">
          <h1 className="flex py-auto mt-[50px] font-[600]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus
            sed sequi ratione itaque blanditiis...
          </h1>
          <h3 className=" font-[500] text-zinc-400">Sports</h3>
          <h4 className="italic  text-sky-600 font-[400]">Fabrizio Romano</h4>
        </div>
      </div>
    </div>
  );
}
