import * as React from "react";

import { Caption1, ProgressBar } from "@fluentui/react-components";
import {
  EMessageType,
  ShowMessage,
  StackV2 as Stack,
} from "@spteck/react-controls";
import { useCallback, useEffect, useRef, useState } from "react";

import { IDirectReport, } from "../../models/IUserData";
import { PAGE_SIZE } from "../../constants/constants";
import { PersonCard } from "../PersonCard/PersonCard";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { useAtomValue } from "jotai";
import { useGraphAPIs } from "../../hooks/useGraphAPIs";
import { useOrganizationChartData } from "../../hooks/useOrganizationChartData";
import { useRenderDirectReportsStyles } from "./useRenderDirectReportsStyles";

export interface IRenderDirectReportsProps {}

export const RenderDirectReports: React.FunctionComponent<
  IRenderDirectReportsProps
> = () => {
  const appglobalstate = useAtomValue(appGlobalStateAtom);
  const { context, organizationTree } = appglobalstate;
 const { id } = organizationTree || {};

  // Styles
  const styles = useRenderDirectReportsStyles(appglobalstate);

  // Initialize the organization chart data hook for loading more direct reports
  const { loadMoreDirectReports } = useOrganizationChartData({ context });

  // Initialize Graph APIs hook
  const { getTotalDirectReports } = useGraphAPIs({ context });

  // State for infinite scroll
  const [allDirectReports, setAllDirectReports] = useState<IDirectReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = useState<string | undefined>(undefined);

  // State for tracking direct reports count for each user
  const [userDirectReportsCount, setUserDirectReportsCount] = useState<Map<string, number>>(new Map());

  // Refs for infinite scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollLoadingRef = useRef<boolean>(false);
  const scrollDebounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize direct reports from organization tree
  useEffect(() => {
    (async () => {
      const directoReportsResults = await loadMoreDirectReports(
        id || "",
        PAGE_SIZE // Page size
      );
      if (
        directoReportsResults.directReports &&
        directoReportsResults.directReports.length > 0
      ) {
        setAllDirectReports(directoReportsResults.directReports);
        // Assume there might be more if we have direct reports - this will be verified on first scroll
        setHasMore(directoReportsResults.hasMore); // Default page size assumption
        setNextPageToken(directoReportsResults.nextPageToken);
      } else {
        setAllDirectReports([]);
        setHasMore(false);
      }
    })().catch(() => { /* handled internally */ });
  }, []);

  // Check which direct reports have their own direct reports (parallel execution for performance)
  useEffect(() => {
    if (allDirectReports.length === 0) {
      return;
    }

    const checkDirectReportsInParallel = async (): Promise<void> => {
      try {
        // Create array of promises for parallel execution
        const checkPromises = allDirectReports.map(async (report) => {
          try {
            const count = await getTotalDirectReports(report.id);
            return { userId: report.id, count };
          } catch (error) {
            console.warn(`Failed to check direct reports for user ${report.id}:`, error);
            return { userId: report.id, count: 0 };
          }
        });

        // Wait for all promises to resolve in parallel
        const results = await Promise.all(checkPromises);

        // Update count state with results
        setUserDirectReportsCount((prevMap) => {
          const newMap = new Map(prevMap);
          results.forEach(({ userId, count }) => {
            newMap.set(userId, count);
          });
          return newMap;
        });
      } catch (error) {
        console.error("Error checking direct reports:", error);
      }
    };

    checkDirectReportsInParallel().catch(() => { /* handled internally */ });
  }, [allDirectReports, getTotalDirectReports]);

  const isCurrentUser = React.useCallback(
    (userId: string) =>
      userId === context.pageContext.legacyPageContext.aadUserId,
    [context.pageContext.legacyPageContext.aadUserId]
  );

  // Load more direct reports function
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore || error || isScrollLoadingRef.current) {
      return;
    }

    if (!id) {
      return;
    }

    try {
      setIsLoading(true);
      isScrollLoadingRef.current = true;

      const result = await loadMoreDirectReports(
        id,
        PAGE_SIZE, // Page size
        nextPageToken
      );

      setAllDirectReports((prev) => [...prev, ...result.directReports]);
      setHasMore(result.hasMore);
      setNextPageToken(result.nextPageToken);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to load more direct reports";
      setError(errorMessage);
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        isScrollLoadingRef.current = false;
      }, 300);
    }
  }, [
    isLoading,
    hasMore,
    error,
    id,
    loadMoreDirectReports,
    nextPageToken,
  ]);

  // Check if we need to load more data
  const checkShouldLoadMore = useCallback(() => {
    if (!containerRef.current || isLoading || !hasMore || error) {
      return false;
    }

    if (isScrollLoadingRef.current) {
      return false;
    }

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    // Load more when we're 90% down the page
    return scrollPercentage >= 0.9;
  }, [isLoading, hasMore, error]);

  // Handle scroll event
  const handleScroll = useCallback(() => {
    if (scrollDebounceTimeoutRef.current) {
      clearTimeout(scrollDebounceTimeoutRef.current);
    }

    scrollDebounceTimeoutRef.current = setTimeout(() => {
      if (checkShouldLoadMore()) {
        loadMoreData().catch(console.error);
      }
    }, 200);
  }, [checkShouldLoadMore, loadMoreData]);

  // Set up scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollHandler = (): void => {
      handleScroll();
    };

    container.addEventListener("scroll", scrollHandler, { passive: true });

    return (): void => {
      container.removeEventListener("scroll", scrollHandler);
      if (scrollDebounceTimeoutRef.current) {
        clearTimeout(scrollDebounceTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  if (!allDirectReports || allDirectReports.length === 0) {
    return <></>;
  }



  return (
    <>
      <Caption1
        style={{
          fontWeight: 600,
          marginBottom: 10,
          marginTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
          display: "inline-flex",
        }}
      >
        Showing Direct Reports ({allDirectReports.length})
      </Caption1>
      <div ref={containerRef} className={styles.scrollContainer}>
        <div className={styles.gridContainer}>
          {allDirectReports.map((report) => (
            <Stack key={report.id} padding="0px">
              <PersonCard
                person={report}
                isCurrentUser={isCurrentUser(report.id)}
                isManager={false}
                totalDirectReports={userDirectReportsCount.get(report.id) || 0}
              />
            </Stack>
          ))}

          {isLoading && (
            <div className={styles.loadingContainer}>
              <ProgressBar />
            </div>
          )}

          {error && (
            <div className={styles.statusContainer}>
              <ShowMessage message={error} messageType={EMessageType.INFO} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
