import Card2 from "./Card2";

export default function LeftSideHomePage({ data }) {
  return (
    <div className="flex-col w-full p-3 -mt-[5px] ">
      {data?.map((d, index) => (
        <div
          key={index}
          className="w-[100%] my-2 h-[200px] rounded-lg bg-white  transition-transform duration-300  scale-100 hover:scale-105 hover:shadow-2xl cursor-pointer"
        >
          <Card2 data={d} />
        </div>
      ))}
    </div>
  );
}
