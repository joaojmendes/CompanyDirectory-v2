/** @jsxImportSource @emotion/react */
import * as React from "react";

import { ErrorType, useLogging } from "@spteck/m365-hooks";
import { Field, SearchBox } from "@fluentui/react-components";
import { IAzureOpenAIConfig, useAzureOpenAI } from "../../hooks/useAzureOpenAI";
import { useCallback, useRef, useState } from "react";

import { AISearchIcon } from "./AISearchIcon";
import { useAISearchControlStyles } from "./useAISearchControlStyles";
import { useUtils } from "../../hooks/useUtils";
 
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { useAtomValue } from "jotai";

export interface IAISearchControlProps {
  systemPromptTemplate: string;
  azureOpenAIConfig: IAzureOpenAIConfig;
  placeholder?: string;
  onSearchQueryGenerated?: (searchQuery: string, originalInput: string) => void;
  onSearchStart?: (originalInput: string) => void;
  onSearchError?: (error: string, originalInput: string) => void;
  disabled?: boolean;
  className?: string;
}

export const AISearchControl: React.FunctionComponent<
  IAISearchControlProps
> = ({
  systemPromptTemplate,
  azureOpenAIConfig,
  placeholder = "Ask AI to generate search query... (e.g., 'Find engineers in the Seattle office')",
  onSearchQueryGenerated,
  onSearchStart,
  onSearchError,
  disabled = false,
  className,
}) => {
  const { logError } = useLogging();
  const appGlobalState = useAtomValue(appGlobalStateAtom);
  const { context } = appGlobalState;
  const { generateSearchQuery, isConfigured } = useAzureOpenAI({
    config: azureOpenAIConfig,
    context,
  });
  const { sanitizeUserData } = useUtils();
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Get styles from custom hook
  const { searchBoxStyles, iconWrapperStyles } = useAISearchControlStyles();

  /**
   * Generate AI search query
   */
  const handleAISearch = useCallback(
    async (inputValue: string) => {
      if (!inputValue.trim()) {
        return;
      }

      if (!isConfigured) {
        const configError =
          "Azure OpenAI is not properly configured. Please check your configuration.";
        setSearchError(configError);
        onSearchError?.(configError, inputValue.trim());
        return;
      }

      const trimmedInput = inputValue.trim();
      setIsLoading(true);
      setSearchError(null);

      try {
        onSearchStart?.(trimmedInput);

        // Generate search query using AI
        const searchQuery = await generateSearchQuery(
          systemPromptTemplate,
          trimmedInput,
        );

        // Return the generated search query to the host application
        onSearchQueryGenerated?.(searchQuery, trimmedInput);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An error occurred during AI search query generation";
        setSearchError(errorMessage);
        logError(
          "AISearchControl",
          "Error generating AI search query",
          err as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({
            operation: "handleAISearch",
            userInput: trimmedInput,
            errorMessage,
            isConfigured,
          }),
        );

        onSearchError?.(errorMessage, trimmedInput);
      } finally {
        setIsLoading(false);
      }
    },
    [
      generateSearchQuery,
      systemPromptTemplate,
      onSearchQueryGenerated,
      onSearchStart,
      onSearchError,
      logError,
      isConfigured,
    ],
  );

  /**
   * Handle search input changes
   */
  const handleSearchChange = useCallback(
    (_: unknown, data: { value: string }) => {
      setSearchInput(data.value);
    },
    [],
  );

  /**
   * Handle dismiss/clear button click
   */
  const handleDismiss = useCallback(() => {
    setSearchInput("");

    searchBoxRef.current?.blur();
    // Notify the host that search was cleared
    onSearchQueryGenerated?.("", "");
  }, [onSearchQueryGenerated]);

  /**
   * Handle Enter and Escape key presses
   */
  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && !isLoading && searchInput.trim()) {
        handleAISearch(searchInput).catch((error) => {
          console.error("Error in handleAISearch:", error);
        });
      } else if (event.key === "Escape") {
        searchBoxRef.current?.blur();
        // Clear the search input when Escape is pressed
        setSearchInput("");
        // Notify the host that search was cleared
        onSearchQueryGenerated?.("", "");
      }
    },
    [handleAISearch, isLoading, searchInput, onSearchQueryGenerated],
  );

  return (
    <Field
      validationState={searchError ? "error" : "none"}
      validationMessage={searchError || undefined}
    >
      <SearchBox
        ref={searchBoxRef}
        css={searchBoxStyles}
        className={className}
        placeholder={placeholder}
        value={searchInput}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        disabled={disabled || isLoading}
        contentBefore={
          <span css={iconWrapperStyles}>
            <AISearchIcon size={20} />
          </span>
        }
        dismiss={{
          onClick: handleDismiss,
        }}
      />
    </Field>
  );
};
