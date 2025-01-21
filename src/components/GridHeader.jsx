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
      <GridCell hideInMobile>
        <strong>Mass</strong>
      </GridCell>
      <GridCell hideInMobile>
        <strong>Created</strong>
      </GridCell>
      <GridCell hideInMobile>
        <strong>Edited</strong>
      </GridCell>
      <GridCell>
        <strong>Planet</strong>
      </GridCell>
    </GridRow>
  );
};

export default GridHeader;
