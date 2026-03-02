/** @jsxImportSource @emotion/react */
import * as React from "react";
import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export interface IListViewSkeletonProps {
  rows?: number;
  hasTeamsContext?: boolean;
}

export const ListViewSkeleton: React.FunctionComponent<IListViewSkeletonProps> = ({
  rows = 10,
  hasTeamsContext = false,
}) => {
  const windowHeight = window.innerHeight;
  const maxHeight = hasTeamsContext ? windowHeight - 250 : 700;

  const containerStyles = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: ${maxHeight}px;
    padding: ${tokens.spacingVerticalM};
    border-radius: ${tokens.borderRadiusMedium};
    background-color: ${tokens.colorNeutralBackground1};
    overflow: hidden;
  `;



  const rowStyles = css`
    display: grid;
    grid-template-columns: 250px 200px 150px 130px 130px 100px;
    gap: ${tokens.spacingHorizontalM};
    padding: ${tokens.spacingVerticalM};
    border-bottom: 1px solid ${tokens.colorNeutralStroke3};
    align-items: center;
    transition: all 0.2s ease-in-out;
    border-radius: ${tokens.borderRadiusSmall};

    &:hover {
      background-color: ${tokens.colorNeutralBackground1Hover};
    }

    &:last-child {
      border-bottom: none;
    }

    @media (max-width: 768px) {
      grid-template-columns: 250px 200px;
      gap: ${tokens.spacingHorizontalS};
      padding: ${tokens.spacingVerticalS};
    }
  `;

  const avatarSkeletonStyles = css`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(90deg, 
      ${tokens.colorNeutralBackground3} 25%, 
      ${tokens.colorSubtleBackground} 50%, 
      ${tokens.colorNeutralBackground3} 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    margin-right: ${tokens.spacingHorizontalS};
    box-shadow: ${tokens.shadow2};

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `;

  const nameContainerStyles = css`
    display: flex;
    align-items: center;
  `;

  const textSkeletonStyles = css`
    height: 16px;
    background: linear-gradient(90deg, 
      ${tokens.colorNeutralBackground3} 25%, 
      ${tokens.colorSubtleBackground} 50%, 
      ${tokens.colorNeutralBackground3} 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: ${tokens.borderRadiusSmall};
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `;

  const shortTextStyles = css`
    ${textSkeletonStyles};
    width: 80%;
  `;

  const mediumTextStyles = css`
    ${textSkeletonStyles};
    width: 60%;
  `;

  const longTextStyles = css`
    ${textSkeletonStyles};
    width: 90%;
  `;

  const nameTextStyles = css`
    height: 16px;
    background: linear-gradient(90deg, 
      ${tokens.colorNeutralBackground3} 25%, 
      ${tokens.colorSubtleBackground} 50%, 
      ${tokens.colorNeutralBackground3} 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: ${tokens.borderRadiusSmall};
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
    width: 140px;
    flex-shrink: 0;

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `;

  return (
    <div className={containerStyles}>

      {/* Row Skeletons - matches ListView structure */}
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className={rowStyles}>
          {/* Name column with avatar and actions (matches CardHeader with RenderPersonHeader) */}
          <div className={nameContainerStyles}>
            <div className={avatarSkeletonStyles} />
            <div className={nameTextStyles} />
          </div>

          {/* Email column (matches mail field) */}
          <div className={index % 3 === 0 ? longTextStyles : mediumTextStyles} />

          {/* Department column - hidden on mobile (matches department field) */}
          <div 
            className={index % 4 === 0 ? mediumTextStyles : shortTextStyles}
            css={css`
              @media (max-width: 768px) {
                display: none;
              }
            `}
          />

          {/* Mobile Phone column - hidden on mobile (matches mobilePhone field) */}
          <div 
            className={index % 2 === 0 ? mediumTextStyles : shortTextStyles}
            css={css`
              @media (max-width: 768px) {
                display: none;
              }
            `}
          />

          {/* Office Location column - hidden on mobile (matches officeLocation field) */}
          <div 
            className={index % 3 === 1 ? shortTextStyles : mediumTextStyles}
            css={css`
              @media (max-width: 768px) {
                display: none;
              }
            `}
          />

          {/* User Type column - hidden on mobile (matches userType Badge) */}
          <div 
            className={index % 5 === 0 ? shortTextStyles : css`height: 20px; width: 50px; ${textSkeletonStyles}; border-radius: 12px;`}
            css={css`
              @media (max-width: 768px) {
                display: none;
              }
            `}
          />
        </div>
      ))}
    </div>
  );
};