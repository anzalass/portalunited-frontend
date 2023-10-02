export default function JudulBlog() {
  return (
    <div className="w-full h-[400px] relative justify-center items-center bg-white">
      <div className="absolute w-11/12 bg-[#0B0B0B] opacity-40  h-[400px] left-[54px]"></div>
      <h1 className="absolute text-4xl text-white font-[700] mx-auto left-[30vw] top-[10vw] right-[25vw]">
        Manchester United Fanspage Blog
      </h1>
      <h1 className="absolute text-xl text-white font-[600] mx-auto left-[30vw] top-[13vw] right-[25vw]">
        Only Manchunian can visit and write here
      </h1>
      <div className=" items-center bg-[#0B0B0B] -z-40">
        <img
          src="https://wallpaperaccess.com/full/4732898.jpg"
          alt=""
          className="mt-2 mx-auto object-cover -z-[999] h-[400px] w-11/12"
        />
      </div>
    </div>
  );
}
