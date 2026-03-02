/** @jsxImportSource @emotion/react */
import * as React from 'react';

import { SerializedStyles, css } from '@emotion/react';

import { SearchRegular } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-components';

export interface IAISearchIconProps {
  size?: number;
  className?: string;
  color?: string;
  aiIndicatorColor?: string;
}

// Emotion CSS styles
const containerStyle = css`
  position: relative;
  display: inline-block;
  line-height: 0;
 
`;

const searchIconStyle = css`
  display: block;
`;

// Simple AI text badge overlay - Theme aware using only tokens
const aiBadgeStyle = css`
  position: absolute;
  top: -1px;
  right: -6px;
  font-size: 8px;
  font-weight: 700;
  font-family: ${tokens.fontFamilyBase};
  color: ${tokens.colorNeutralForegroundOnBrand};
  background: ${tokens.colorBrandBackground};
  padding: 1px 3px;
  border-radius: ${tokens.borderRadiusSmall};
  line-height: 1;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  box-shadow: ${tokens.shadow4};
  border: 1px solid ${tokens.colorTransparentStroke};
  transform: scale(0.9);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1);
    box-shadow: ${tokens.shadow8};
    background: ${tokens.colorBrandBackgroundHover};
  }
`;

const aiBadgeLargeStyle = css`
  ${aiBadgeStyle};
  font-size: 9px;
  padding: 2px 4px;
  border-radius: 8px;
  top: -2px;
  right: -7px;
`;

const aiBadgeSmallStyle = css`
  ${aiBadgeStyle};
  font-size: 6px;
  padding: 1px 2px;
  border-radius: 4px;
  top: 0px;
  right: -4px;
  letter-spacing: 0.1px;
`;

/**
 * AI Search Icon Component
 * Theme-aware icon that adapts to different button backgrounds like FluentUI icons
 */
export const AISearchIcon: React.FunctionComponent<IAISearchIconProps> = ({
  size = 20,
  className,
  color, // If not provided, will inherit from parent context
  aiIndicatorColor,
}) => {
  const getBadgeStyle = (): SerializedStyles => {
    if (size >= 24) return aiBadgeLargeStyle;
    if (size <= 16) return aiBadgeSmallStyle;
    return aiBadgeStyle;
  };

  // Create dynamic badge style that respects custom colors but falls back to theme
  const dynamicBadgeStyle = css`
    ${getBadgeStyle()};
    ${aiIndicatorColor ? `
      background: ${aiIndicatorColor};
      border-color: ${aiIndicatorColor};
    ` : ''}
  `;

  // Search icon inherits color from parent if not specified (like FluentUI icons)
  const searchIconDynamicStyle = css`
    ${searchIconStyle};
    font-size: ${size}px;
    ${color ? `color: ${color};` : 'color: inherit;'}
  `;

  return (
    <span css={[containerStyle, className && css`${className}`]}>
      <SearchRegular css={searchIconDynamicStyle} />
      <span css={dynamicBadgeStyle}>
        AI
      </span>
    </span>
  );
};

export default AISearchIcon;
