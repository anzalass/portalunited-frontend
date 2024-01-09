export default function JudulBlog() {
  return (
    <div className="w-full h-[430px] relative justify-center -mt-[10px] items-center bg-white">
      <div className="absolute  bg-[#1a1a1a] opacity-40  h-[430px] w-full "></div>
      <div className="relative w-full">
        <div className="absolute xl:text-4xl lg:text-4xl md:text-3xl sm:text-2xl text-2xl text-white font-[700] mx-auto left-[30vw] top-[10vw] right-[25vw]">
          Manchester United Fanspage Blog
          <div className="text-xl">
            Manchester is RED 4EVER🤘
          </div>
        </div>
      </div>
      <div className=" items-center bg-[#0B0B0B] -z-40">
        <img
          src="https://wallpaperaccess.com/full/4732898.jpg"
          alt=""
          className="mt-2 mx-auto object-cover -z-[999] h-[430px] w-11/12"
        />
      </div>
    </div>
  );
}
