import { IAppGlobalState } from "../../models/IAppGlobalState";
import { css } from "@emotion/css";

export interface IOrganizationChartStyles {
  directReportsContainer: string;
  container: string;
  loadingContainer: string;
  divider: string;
}

export const useCompanyDirectoryStyles = (
  globalState?: IAppGlobalState
): IOrganizationChartStyles => {
  const directReportsContainer = css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    width: "100%",
    paddingTop: "20px",
  });
  const container = css({
    position: "relative",
    overflow: "hidden",
  });
  const loadingContainer = css({
    width: "100%",
    height: "100%",
    padding: "16px",
  });
  const divider = css({
    width: "100%",
    height: "1px",
    padding: 0,
  });
  return {
    directReportsContainer,
    container,
    loadingContainer,
    divider,
  };
};
