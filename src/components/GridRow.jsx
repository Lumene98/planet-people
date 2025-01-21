const GridRow = ({ children }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 max-h-8">{children}</div>
  );
};

export default GridRow;
