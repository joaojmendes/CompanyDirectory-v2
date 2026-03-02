import { css } from "@emotion/css";

export const useEmployeesViewStyles = (): {
  containerStyles: string;
  toolbarStyles: string;
  toolbarDividerStyles: string;
} => {
  const containerStyles = css({
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    minHeight: "700px",
  });

  const toolbarStyles = css({
    paddingBottom: "20px",
    paddingLeft: "15px",
    paddingRight: "15px",
  });

  const toolbarDividerStyles = css({
    width: "5px",
    flexGrow: 0,
    paddingTop: 5,
    paddingBottom: 5,
  });

  return {
    containerStyles,
    toolbarStyles,
    toolbarDividerStyles,
  } as const;
};
