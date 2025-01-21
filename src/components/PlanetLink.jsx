import { Link } from "react-router-dom";

const PlanetLink = ({ planetUrl }) => {
  const planetId = planetUrl?.split("/").filter(Boolean).pop();

  return (
    <Link
      className="h-6 flex flex-row flex-nowrap gap-[13px] items-center rounded-md py-1 px-3 bg-black hover:opacity-50 text-white justify-around cursor-pointer"
      to={`planet/${planetId}`}
    >
      <span className="flex-1">{planetId}</span>
      <span className="flex flex-row flex-nowrap items-center gap-1 text-sm">
        <span className="hidden sm:block">See more</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          className="h-4"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.75 4.75 13.25 8m0 0-3.5 3.25M13.25 8H2.75"
          ></path>
        </svg>
      </span>
    </Link>
  );
};

export default PlanetLink;
