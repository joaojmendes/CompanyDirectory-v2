import { IAppGlobalState } from "../../models/IAppGlobalState";
import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export const useRenderDirectReportsStyles = (appGlobalState:IAppGlobalState): {
  scrollContainer: string;
  loadingContainer: string;
  statusContainer: string;
  gridContainer: string;
} => {

  const { hasTeamsContext } = appGlobalState || {};
  const windowHeight = window.innerHeight;
  // Define maxHeight based on context
  const maxHeight = hasTeamsContext ? windowHeight - 500 : 400;

  const gridContainer = css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, max-content))",
    gap: "12px",
    width: "100%",
        justifyContent: "center",
     alignContent: "center",
  });

  const loadingContainer = css({
    padding: tokens.spacingVerticalM,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalS,
  });

  const statusContainer = css({
    padding: tokens.spacingVerticalM,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  const scrollContainer = css({
    padding: tokens.spacingVerticalM,
    maxHeight: maxHeight,
    overflowY: "auto",

    height: "100%",
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

  return {
    scrollContainer,
    loadingContainer,
    statusContainer,
    gridContainer,
  };
};
