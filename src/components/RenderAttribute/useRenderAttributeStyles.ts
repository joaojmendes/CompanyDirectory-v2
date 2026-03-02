/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from '@emotion/css';
import { tokens } from '@fluentui/react-components';

export const useRenderAttributeStyles = (): Record<string, string> => {
  return {
    attributeContainer: css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      gap: "8px",
      padding: "12px 0px",
      borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
      minHeight: "fit-content",
      height: "auto",
    }),

    labelSection: css({
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "8px",
    }),

    infoLabel: css({
      marginLeft: "4px",
    }),

    valueContainer: css({
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingLeft: "20px", // Align with icon + gap from label
      minHeight: "fit-content",
      minWidth: 0, // Allow shrinking
      maxWidth: "100%",
      overflow: "visible",
      
      // Apply text truncation to text content
      '& > *': {
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        lineHeight: "1.4",
        minHeight: "fit-content",
      },
      
      // But allow links and badges to overflow naturally
      '& a, & [role="img"], & [data-testid*="badge"]': {
        whiteSpace: "normal",
        wordBreak: "break-all",
        overflowWrap: "break-word",
      },
    }),

    valueContainerMultiline: css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      paddingLeft: "20px", // Align with icon + gap from label
      minHeight: "20px",
      minWidth: 0, // Allow shrinking
      maxWidth: "100%",
      wordBreak: "break-word" as const,
      overflowWrap: "break-word",
    }),

    textContent: css({
      color: tokens.colorNeutralForeground1,
      maxWidth: "100% !important",
      overflow: "hidden !important",
      textOverflow: "ellipsis !important",
      whiteSpace: "nowrap !important",
      display: "block !important",
      minWidth: "0 !important",
    }),

    textContentMultiline: css({
      color: tokens.colorNeutralForeground1,
      maxWidth: "100%",
      wordBreak: "break-word",
      overflowWrap: "break-word",
      whiteSpace: "pre-wrap",
      display: "block",
    }),
  };
};
