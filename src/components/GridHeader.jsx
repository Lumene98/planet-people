import GridCell from "./GridCell";
import GridRow from "./GridRow";

const GridHeader = () => {
  return (
    <GridRow>
      <GridCell>
        <strong>Name</strong>
      </GridCell>
      <GridCell>
        <strong>Height</strong>
      </GridCell>
      <GridCell>
        <strong>Mass</strong>
      </GridCell>
      <GridCell>
        <strong>Created</strong>
      </GridCell>
      <GridCell>
        <strong>Edited</strong>
      </GridCell>
      <GridCell>
        <strong>Planet</strong>
      </GridCell>
    </GridRow>
  );
};

export default GridHeader;
