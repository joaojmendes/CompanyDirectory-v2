/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react";

import { tokens } from "@fluentui/react-components";

/**
 * Custom hook for AI Search Control styles
 * Provides emotion CSS styles for the modern circular SearchBox design
 */
export const useAISearchControlStyles = (): {
  searchBoxStyles: SerializedStyles;
  iconWrapperStyles: SerializedStyles;
} => {
  // Main SearchBox styling
  const searchBoxStyles = css`
    border: 1px solid ${tokens.colorNeutralStroke2};
    border-radius: 50px; /* Fully circular/pill shape */
    background-color: ${tokens.colorNeutralBackground1};
    padding: 5px 10px;
    box-shadow: none;
    transition: all 0.2s ease;
    position: relative;

    /* Remove default FluentUI focus styling */
    &::after {
      display: none !important;
    }

    &:hover {
      border-color: ${tokens.colorBrandStroke1};
      
    }

    &:focus-within {
      outline: none;
      border-color: ${tokens.colorBrandStroke1};
      background-color: ${tokens.colorNeutralBackground1} !important;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      border-color: ${tokens.colorNeutralStroke3};
      background-color: ${tokens.colorNeutralBackground3};
    }

    /* Style the input directly */
    input {
      border: none !important;
      outline: none !important;
      background: transparent !important;
      font-size: ${tokens.fontSizeBase300};
      color: ${tokens.colorNeutralForeground1};
      box-shadow: none !important;
      width: 400px;

      &::placeholder {
         
      }

      &:focus {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
      }

      /* Fix autofill background color */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px ${tokens.colorNeutralBackground1} inset !important;
        -webkit-text-fill-color: ${tokens.colorNeutralForeground1} !important;
        background-color: ${tokens.colorNeutralBackground1} !important;
        transition: background-color 5000s ease-in-out 0s;
      }

      /* Firefox autofill */
      &:-moz-autofill {
        background-color: ${tokens.colorNeutralBackground1} !important;
        color: ${tokens.colorNeutralForeground1} !important;
      }
    }

    /* Remove any internal focus indicators */
    * {
      &:focus {
        outline: none !important;
        box-shadow: none !important;
      }
    }



    // add breakpoints for responsive design
    @media (max-width: 768px) {
      border-radius: 30px;
      width: 300px;
    }

    @media (max-width: 480px) {
      border-radius: 20px;
      width: 100%;
    }
  `;

  // Icon wrapper styling
  const iconWrapperStyles = css`
    display: flex;
    align-items: center;
    padding: 2px;
    margin-right: 8px;
  `;

  return {
    searchBoxStyles,
    iconWrapperStyles,
  };
};
