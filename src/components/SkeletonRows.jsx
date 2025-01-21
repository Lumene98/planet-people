import GridRow from "./GridRow";

const SkeletonRow = ({ size }) => (
  <GridRow>
    {[...Array(size)].map((_, index) => (
      <div className="px-1.5 py-1  h-8 col-span-full" key={index}>
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
      </div>
    ))}
  </GridRow>
);

export default SkeletonRow;
