export default function Card5() {
  return (
    <div className="w-full flex hover:bg-slate-100">
      <div className="w-[40%]">
        <img
          src="https://talksport.com/wp-content/uploads/sites/5/2023/07/DF-TALKSPORT-ARSENAL.jpg?strip=all&w=620&h=413&crop=1"
          alt=""
          className="object-cover rounded-md"
        />
      </div>
      <div className="w-[60%] ml-1">
        <h1 className="text-[12px] font-[500]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem,
          ipsum...
        </h1>
        <h3 className="text-[11px] font-[500] italic text-red-500">Sports</h3>
      </div>
    </div>
  );
}
