import clsx from "clsx";

export default function Button({ onClick, type, kelas, children, text }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(kelas, "px-2 py-2 text-white rounded-md")}
    >
      {children || text}
    </button>
  );
}
