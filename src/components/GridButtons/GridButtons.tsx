import * as React from "react";

import { Button, Tooltip, tokens } from "@fluentui/react-components";
import {
  Grid20Filled,
  Grid20Regular as GridIcon,
  List20Filled as ListFilled,
  List20Regular as ListIcon
} from "@fluentui/react-icons";

import { StackV2 as Stack } from "@spteck/react-controls";

// Assuming these are the layout options
export enum Elayout {
  Grid = "grid",
  List = "list"
}

export interface IGridButtonsProps {
  currentLayout: Elayout;
  onLayoutChange: (layout: Elayout) => void;
  className?: string;
}

/**
 * Component for rendering grid/list layout toggle buttons
 */
export const GridButtons: React.FunctionComponent<IGridButtonsProps> = React.memo(({
  currentLayout,
  onLayoutChange,
  className
}) => {
  const isGridLayout = currentLayout === Elayout.Grid;
  const isListLayout = currentLayout === Elayout.List;

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = event.currentTarget.name as Elayout;
    onLayoutChange(buttonName);
  }, [onLayoutChange]);

  return (
    <Stack
      background="transparent"
      direction="horizontal"
      justifyContent="start"
      alignItems="center"
      columnGap={"5"}
       
    >
      <Tooltip content="Grid layout" relationship={"label"}>
        <Button
          className={className}
          name={Elayout.Grid}
          onClick={handleClick}
          icon={
          isGridLayout ? (
            <Grid20Filled color={tokens.colorBrandBackground} />
          ) : (
            <GridIcon />
          )
        }
        appearance="transparent"
        aria-label="Grid layout"
        
      />
      </Tooltip>
      <Tooltip content="List layout" relationship={"label"}>
      <Button
        className={className}
        name={Elayout.List}
        onClick={handleClick}
        icon={
          isListLayout ? (
            <ListFilled color={tokens.colorBrandBackground} />
          ) : (
            <ListIcon />
          )
        }
        appearance="transparent"
        aria-label="List layout"
         
      />
      </Tooltip>
    </Stack>
  );
});

GridButtons.displayName = 'GridButtons';
