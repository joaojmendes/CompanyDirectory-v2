import { useCallback, useState } from "react";

import { IPersonCardProps } from "./PersonCard";
import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";
import { useUtils } from "../../hooks";
import * as React from "react";

export interface IUsePersonCardStylesResult {
  getStyles: (params: IPersonCardProps) => string | undefined;
  styles: {
    card: string;
    textStyle: string;
    linkTruncate: string;
    currentUser: string;
    icon: string;
    headerContainer: string;

    clickable: string;
    expanded: string;
    expandButton: string;
    totalDirectReports: string;
  };
}

export const usePersonCardStyles = (): IUsePersonCardStylesResult => {
  const { generateColorForManagers } = useUtils();
  const [userColors, setUserColors] = useState<{ [userId: string]: string }>(
    {}
  );
  const userColorsRef = React.useRef<{ [userId: string]: string }>({});

  // Function to get or generate color for a user
  const getUserColor = useCallback(
    async (userId: string): Promise<string> => {
      if (userColorsRef.current[userId]) {
        return userColorsRef.current[userId];
      }

      const color = await generateColorForManagers(userId);
      setUserColors((prev) => ({ ...prev, [userId]: color }));
      return color;
    },
    [userColors, generateColorForManagers]
  );

  const styles = {
    card: css({
      padding: tokens.spacingVerticalL,
      minWidth: 260,
      borderRadius: tokens.borderRadiusMedium,

      position: "relative",
    }),
    textStyle: css({
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "150px",
    }),
    linkTruncate: css({
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "150px",
    }),
    currentUser: css({
      border: `1px solid  ${tokens.colorBrandBackground}`,
    }),
    icon: css({
      color: tokens.colorBrandBackground,
      width: "16px",
      height: "16px",
    }),

    clickable: css({
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      ":hover": {
        transform: "translateY(-2px)",
        boxShadow: tokens.shadow8,
      },
    }),
    expanded: css({
      boxShadow: tokens.shadow4,
      backgroundColor: tokens.colorNeutralBackground2,
    }),
    expandButton: css({
      minWidth: "24px",
      height: "24px",
      padding: 0,
      color: tokens.colorBrandBackground,
      ":hover": {
        backgroundColor: tokens.colorNeutralBackground1Hover,
      },
    }),
    headerContainer: css({
      maxWidth: "100%",
      minWidth: "0",
      overflow: "hidden",
    }),
    totalDirectReports: css({
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "150px",
      fontWeight: "semibold",
      color: tokens.colorBrandBackground,
    }),
  };

  const getStyles = useCallback(
    (params: IPersonCardProps): string | undefined => {
      const { isCurrentUser, isManager, person, isSelectedUser } = params;

      // Load color for user if needed (fire and forget)
      if (!isCurrentUser && isManager && !userColors[person.id]) {
        getUserColor(person.id).catch(console.error);
      }

      const defaultColor = css({
        borderTop: `3px solid "transparent"`,
      });

      const userColor = userColors[person.id] || tokens.colorNeutralBackground1;
      const cardManager = css({
        backgroundColor: isSelectedUser
          ?  tokens.colorNeutralBackground1Hover
          : undefined,
        borderTop:
          !isCurrentUser && isManager ? `3px solid  ${userColor}` : undefined,
      });
      const cardSelected = css({
        backgroundColor: tokens.colorNeutralBackground1Hover,
        
      });

      switch (true) {
        case isManager && !isSelectedUser:
          return cardManager;
        case isSelectedUser && isManager:
          return cardManager;
        case isSelectedUser && !isManager:
          return cardSelected;

        default:
          return defaultColor;
      }
    },
    [userColors, getUserColor]
  );

  return {
    getStyles,
    styles,
  };
};
