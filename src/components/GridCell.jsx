const GridCell = ({ children, hideInMobile }) => {
  return (
    <div
      className={`px-1.5 py-1 text-left text-ellipsis overflow-hidden whitespace-nowrap max-h-8 ${hideInMobile ? "hidden md:block" : ""}`}
    >
      {children}
    </div>
  );
};

export default GridCell;
