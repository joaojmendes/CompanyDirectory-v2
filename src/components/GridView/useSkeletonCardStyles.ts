import { css, keyframes } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export interface ISkeletonCardStyles {
  cardStyles: string;
  headerStyles: string;
  bodyStyles: string;
  avatarStyles: string;
  textLineStyles: string;
}

export const useSkeletonCardStyles = (): ISkeletonCardStyles => {
  // Create shimmer animation
  const shimmer = keyframes({
    "0%": {
      backgroundPosition: "-200px 0"
    },
    "100%": {
      backgroundPosition: "calc(200px + 100%) 0"
    }
  });

  const cardStyles = css({
    padding: 20,
    minWidth: 260,
    borderRadius: "8px",
    position: "relative",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    // Add subtle animation to make it feel more alive
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: `linear-gradient(
        90deg,
        transparent,
        ${tokens.colorNeutralBackground1Hover},
        transparent
      )`,
      backgroundSize: "200px 100%",
      animation: `${shimmer} 2s infinite linear`,
      borderRadius: "8px",
      zIndex: 1,
      opacity: 0.6,
    },
    "& > *": {
      position: "relative",
      zIndex: 2,
    },
  });

  const headerStyles = css({
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    marginBottom: "16px",
  });

  const bodyStyles = css({
    paddingLeft: "0px",
  });

  const avatarStyles = css({
    flexShrink: 0,
  });

  const textLineStyles = css({
    display: "flex",
    width: "100%",
    marginBottom: "4px",
  });

  return {
    cardStyles,
    headerStyles,
    bodyStyles,
    avatarStyles,
    textLineStyles,
  };
};
