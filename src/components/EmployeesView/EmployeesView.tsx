import * as React from "react";

import {
  Body1Strong,
  Divider,
  Field,
  ProgressBar,
} from "@fluentui/react-components";
import { Elayout, GridButtons } from "../GridButtons";
import { useCallback, useState } from "react";

import { AISearchControl } from "../AISearchControl";
import { AZURE_API_ENDPOINT } from "../../constants/constants";
import { ErrorType } from "@spteck/m365-hooks";
import { GridView } from "../GridView/GridView";
import { IUserProfile } from "../../models/IUserData";
import { ListView } from "../ListView";
import { OPEN_AI_INSTRUCTIONS } from "../../openAI/instructions";
import { StackV2 as Stack } from "@spteck/react-controls";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { useAtom } from "jotai";
import { useEmployeesViewStyles } from "./useEmployeesViewStyles";
import { useLogging } from "@spteck/m365-hooks";
import { useUtils } from "../../hooks/useUtils";

export interface IEmployeesViewProps {
  onUserSelect?: (user: IUserProfile) => void;
}

export const EmployeesView: React.FunctionComponent<IEmployeesViewProps> = ({
  onUserSelect,
}) => {
  const [appGlobalState] = useAtom(appGlobalStateAtom);
  const { context } = appGlobalState;
  const { logError } = useLogging();
  const { containerStyles, toolbarStyles, toolbarDividerStyles } =
    useEmployeesViewStyles();

  // Layout state management
  const [currentLayout, setCurrentLayout] = useState<Elayout>(Elayout.Grid);
  const { parseAIResponse, sanitizeUserData } = useUtils();
  // Search state management - will be passed down to child components
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchDescription, setSearchDescription] = useState<string>("");
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const [isSearchStarted, setIsSearchStarted] = useState<boolean>(false);

  // Handle layout change
  const handleLayoutChange = useCallback((layout: Elayout) => {
    setCurrentLayout(layout);
  }, []);

  // Handle search query generation or clearing
  const handleSearchQueryGenerated = useCallback((results: string) => {
    if (results && typeof results === "string" && results.trim()) {
      // User performed a search - extract search info for display
      try {
        const { filter, description } = parseAIResponse(results);

        setIsSearchMode(true);
        setSearchQuery(filter);
        setSearchDescription(description);
      } catch (error) {
        // Log parsing error but continue with raw filter
        logError(
          "EmployeesView",
          "Could not parse AI response",
          error as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({
            component: "EmployeesView",
            operation: "parseAIResponse",
            originalResponse:
              results.substring(0, 200) + (results?.length > 200 ? "..." : ""),
          }),
        );
        // For non-JSON responses
        setIsSearchMode(true);
        setSearchQuery(results);
        setSearchDescription("your search criteria");
      } finally {
        setIsSearchStarted(false);
      }
    } else {
      // Search was cleared
      setIsSearchMode(false);
      setSearchQuery("");
      setSearchDescription("");
    }
  }, []);

  const handleSearchStart = useCallback(() => {
    setIsSearchStarted(true);
  }, []);

  const handleSearchError = useCallback(
    (error: string, originalInput: string) => {
      setIsSearchStarted(false);
      logError(
        "EmployeesView",
        "AI Search component error",
        new Error(error),
        ErrorType.SYSTEM,
        sanitizeUserData({
          component: "EmployeesView",
          operation: "aiSearchError",
          originalInput,
        }),
      );
    },
    [],
  );

  const RenderIsSearching = React.useCallback(() => {
    if (isSearchStarted) {
      return (
        <Field validationMessage="Searching..." validationState="none">
          <ProgressBar />
        </Field>
      );
    }
    return null;
  }, [isSearchStarted]);

  if (!context) {
    return null;
  }

  return (
    <>
      <div className={containerStyles}>
        {/* Toolbar with AI Search and Layout Buttons */}
        <Stack
          justifyContent="end"
          direction="horizontal"
          className={toolbarStyles}
          gap="10px"
        >
          <Field>
            <AISearchControl
              systemPromptTemplate={OPEN_AI_INSTRUCTIONS}
              azureOpenAIConfig={{
                endpoint: AZURE_API_ENDPOINT,
              }}
              onSearchQueryGenerated={handleSearchQueryGenerated}
              onSearchStart={handleSearchStart}
              onSearchError={handleSearchError}
              placeholder="Search with AI, add your query with natural language"
            />
          </Field>
          <Divider vertical className={toolbarDividerStyles} />
          <GridButtons
            currentLayout={currentLayout}
            onLayoutChange={handleLayoutChange}
          />
        </Stack>
        {
          <Stack paddingLeft="15px" paddingBottom="20px" paddingRight="15px">
            {isSearchStarted && <RenderIsSearching />}
          </Stack>
        }

        {/* Search mode indicator */}
        {isSearchMode && (
          <Stack paddingLeft="15px" paddingBottom="20px" paddingRight="15px">
            <Body1Strong>
              Showing search results for: &ldquo;{searchDescription}&rdquo;
            </Body1Strong>
          </Stack>
        )}

        {/* Conditional rendering based on layout */}
        <Stack
          paddingLeft="12px"
          paddingBottom="20px"
          paddingRight="12px"
          overflow="hidden"
        >
          {currentLayout === Elayout.Grid ? (
            <GridView
              onUserSelect={onUserSelect}
              searchQuery={searchQuery}
              isSearchMode={isSearchMode}
              onSearchModeChange={setIsSearchMode}
            />
          ) : (
            <ListView
              onUserSelect={onUserSelect}
              searchQuery={searchQuery}
              isSearchMode={isSearchMode}
              onSearchModeChange={setIsSearchMode}
            />
          )}
        </Stack>
      </div>
    </>
  );
};
