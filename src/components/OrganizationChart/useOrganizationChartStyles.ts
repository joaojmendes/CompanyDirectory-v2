import { IAppGlobalState } from "../../models/IAppGlobalState";
import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export interface IOrganizationChartStyles {
  directReportsContainerGrid: string;
  loadingContainer: string;
  divider: string;
  container: string;
}

export const useOrganizationChartStyles = (
  globalState?: IAppGlobalState
): IOrganizationChartStyles => {
  const { hasTeamsContext } = globalState || {};
  const windowHeight = window.innerHeight;
  // Define maxHeight based on context
  const maxHeight = hasTeamsContext ? windowHeight - 250 : 700;

  const directReportsContainerGrid = css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, max-content))",
    gap: tokens.spacingVerticalL,
    width: "100%",
    paddingTop: tokens.spacingVerticalL,
    justifyContent: "center",
    justifyItems: "stretch",
  });

  const loadingContainer = css({
    width: "100%",
    height: "100%",
    padding: "16px",
  });
  const divider = css({
    height: "1px",
    width: "auto",
    marginLeft: "20px",
    marginRight: "20px",
    flexGrow: 0,
    "::before": {
      borderColor: tokens.colorNeutralStroke1,
    },
    "::after": {
      borderColor: tokens.colorNeutralStroke1,
    },
  });
  const container = css({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: maxHeight,
  });
  return {
    directReportsContainerGrid,
    loadingContainer,
    divider,
    container,
  };
};
