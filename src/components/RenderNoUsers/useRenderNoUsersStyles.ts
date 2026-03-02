import { css } from "@emotion/css"
import { tokens } from "@fluentui/react-components"

export const useRenderNoUsersStyles = (): {
  styles: {
    emptyContainer: string;
    emptyIcon: string;
  };
} => {
  const styles = {
    emptyContainer:  css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        textAlign: "center",
        padding: "40px 20px",
         gridColumn: "1 / -1",
      }),
      emptyIcon: css({
         
          color: tokens.colorBrandBackground,
          marginBottom: "16px",
        })
  }
    return {styles};
}