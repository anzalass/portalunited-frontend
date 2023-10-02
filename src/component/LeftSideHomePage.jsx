import Card2 from "./Card2";

export default function LeftSideHomePage() {
  return (
    <div className="flex-col w-full p-3 mt-[10px] ">
      <div className="w-[80%] my-2 h-[200px] bg-white">
        <Card2 />
      </div>
      <div className="w-[80%]  my-2  h-[200px] bg-white">
        <Card2 />
      </div>
      <div className="w-[80%]   my-2 h-[200px] bg-white">
        <Card2 />
      </div>
      <div className="w-[80%]  my-2 h-[200px] bg-white">
        <Card2 />
      </div>
      <div className="w-[80%]  my-2  h-[200px] bg-white">
        <Card2 />
      </div>
    </div>
  );
}
