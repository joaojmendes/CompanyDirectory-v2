import { IAppGlobalState } from "../../models/IAppGlobalState";
import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export const useListViewStyles = (
  globalState: IAppGlobalState
): {
  containerStyles: string;
  toolbarStyles: string;
  dividerStyles: string;
  searchInfoStyles: string;
  dataGridStyles: string;
  loadingStyles: string;
  endOfResultsStyles: string;
  errorStyles: string;
  headerRowStyles: string;
  headerCellStyles: string;
  dataRowStyles: string;
  cellTextStyles: string;
} => {
  const windowHeight = window.innerHeight;
  const hasTeamsContext = globalState?.hasTeamsContext;
  // Define maxHeight based on context
  const maxHeight = hasTeamsContext ? windowHeight - 250 : 700;
  const containerStyles = css({
    display: "flex",
    flexDirection: "column",
    height: "100%",

    minHeight: maxHeight,
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: tokens.colorNeutralBackground1,
    overflow: "hidden", // Let DataGrid handle its own scrolling
    scrollbarColor: `${tokens.colorBrandForeground1} ${tokens.colorNeutralBackground1}`,
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

  const toolbarStyles = css({
    display: "flex",
    alignItems: "center",
    padding: "15px 15px 20px 15px",
    gap: "10px",
  });

  const dividerStyles = css({
    marginLeft: "16px",
    marginRight: "16px",
  });

  const searchInfoStyles = css({
    paddingLeft: "15px",
    paddingBottom: "20px",
    paddingRight: "15px",
  });

  const dataGridStyles = css({
    overflowY: "hidden",
    overflowX: "auto",
  });

  const loadingStyles = css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  });

  const endOfResultsStyles = css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    color: tokens.colorNeutralForeground2,
  });

  const errorStyles = css({
    padding: "20px",
    color: tokens.colorPaletteRedForeground1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  });

  const headerRowStyles = css({
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingBottom: "10px",
  });

  const headerCellStyles = css({
    fontWeight: "bold",
    color: tokens.colorNeutralForeground1,
  });

  const dataRowStyles = css({
    borderBottom: `1px solid ${tokens.colorNeutralStroke3}`,
    paddingBottom: "10px",
    paddingTop: "10px",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  });

  const cellTextStyles = css({
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    paddingBottom: "0px",
    textAlign: "start",
    wordBreak: "break-all",
    textOverflow: "ellipsis",
    textOverlay: "hidden",
  });

  return {
    containerStyles,
    toolbarStyles,
    dividerStyles,
    searchInfoStyles,
    dataGridStyles,
    loadingStyles,
    endOfResultsStyles,
    errorStyles,
    headerRowStyles,
    headerCellStyles,
    dataRowStyles,
    cellTextStyles,
  } as const;
};
