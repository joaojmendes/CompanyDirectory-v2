import { IAppGlobalState } from "../../models/IAppGlobalState";
import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export const useGridViewStyles = (globalSState: IAppGlobalState): {
  gridStyles: string;
  containerStyles: string;
  errorStyles: string;
  loadingStyles: string;
  searchIndicatorStyles: string;
  toolbarDividerStyles: string;
  emptyContainer: string;
  emptyIcon: string;
  emptyText: string;
} => {
  const { hasTeamsContext } = globalSState;
  const windowHeight = window.innerHeight;
  // Define maxHeight based on context
  const maxHeight = hasTeamsContext ? windowHeight - 250 : 700;
  
  const gridStyles = css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
    padding: 15,
   
  
  });

  const containerStyles = css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
    padding: 15,
    maxHeight: maxHeight,
    overflowY: "auto",
 
    height: '100%',

    scrollbarColor: `${tokens.colorBrandForeground1}  transparent `,
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar-track": {
      borderRadius: "10px",
      borderWidth: "1px",
  
    },
    "::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      borderWidth: "1px",
    },
    "::-webkit-scrollbar": {
      height: "7px",
      width: "7px",
    },
  });

  const errorStyles = css({
    color: tokens.colorPaletteRedForeground1,
    textAlign: "center",
    padding: "20px",
    gridColumn: "1 / -1", // Span all columns
  });

  const loadingStyles = css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    gridColumn: "1 / -1", // Span all columns
  });

  const searchIndicatorStyles = css({
    padding: "10px 15px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "4px",
    margin: "0 15px 10px 15px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
  });

  const toolbarDividerStyles = css({
    width: "5px",
    flexGrow: 0,
    paddingTop: 5,
    paddingBottom: 5,
  });

  const emptyContainer = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
    textAlign: "center",
    padding: "40px 20px",
     gridColumn: "1 / -1",
  });
  const emptyIcon = css({
   
    color: tokens.colorBrandBackground,
    marginBottom: "16px",
  });
  const emptyText = css({
   
  });

  return {
    gridStyles,
    containerStyles,
    errorStyles,
    loadingStyles,
    searchIndicatorStyles,
    toolbarDividerStyles,
    emptyContainer,
    emptyIcon,
    emptyText,
  } as const;
};
