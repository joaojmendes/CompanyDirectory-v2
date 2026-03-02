import * as React from "react";

import { ErrorType, useLogging } from "@spteck/m365-hooks";
import { useCallback, useEffect, useRef, useState } from "react";

import { IUserProfile } from "../../models/IUserData";
import { PAGE_SIZE } from "../../constants/constants";
import { PersonCard } from "../PersonCard/PersonCard";
import { ProgressBar, } from "@fluentui/react-components";
import { RenderNoUsers } from "../RenderNoUsers/RenderNoUsers";
import { SkeletonCards } from "./SkeletonCards";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { sortBy } from "@microsoft/sp-lodash-subset/lib/index";
import { useAtom } from "jotai";
import { useGraphAPIs } from "../../hooks/useGraphAPIs";
import { useGridViewStyles } from "./useGridViewStyles";
import { useUtils } from "../../hooks/useUtils";

export interface IGridViewProps {
  onUserSelect?: (user: IUserProfile) => void;
  searchQuery?: string;
  isSearchMode?: boolean;
  onSearchModeChange?: (isSearchMode: boolean) => void;
}

export const GridView: React.FunctionComponent<IGridViewProps> = ({
  onUserSelect,
  searchQuery: externalSearchQuery,
  isSearchMode: externalIsSearchMode = false,
  onSearchModeChange,
}) => {
  const [appGlobalState] = useAtom(appGlobalStateAtom);
  const { context } = appGlobalState;
  const { getUsers } = useGraphAPIs({ context });
  const { logError } = useLogging();
  const { containerStyles, loadingStyles,  } =
    useGridViewStyles(appGlobalState);
  const { sanitizeUserData } = useUtils();

  // State management
  const [users, setUsers] = useState<IUserProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | undefined>(undefined);
  const hasMoreRef = useRef<boolean>(true);
  const nextPageTokenRef = useRef<string | undefined>(undefined);

  // Search state management - now controlled by parent
  const [searchQuery, setSearchQuery] = useState<string>(
    externalSearchQuery || ""
  );

  const [isSearchMode, setIsSearchMode] =
    useState<boolean>(externalIsSearchMode);

  // Layout state management - removed since it's now in EmployeesView

  // Refs for infinite scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState<boolean>(false);

  // SCROLL PROTECTION - Prevent multiple simultaneous scroll requests
  const isScrollLoadingRef = useRef<boolean>(false);
  const scrollDebounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load users function - now handles both regular and search with optional filter
  const loadUsers = useCallback(
    async (isInitial: boolean = false, filter?: string) => {
      // Prevent loading if already loading, no more data, or in error state
      if (
        isLoading ||
        (!hasMoreRef.current && !isInitial) ||
        (error && !isInitial)
      ) {
        return;
      }

      if (!isInitial && isScrollLoadingRef.current) {
        return;
      }

      try {
        setIsLoading(true);
        if (!isInitial) {
          isScrollLoadingRef.current = true;
        }

        // Only clear error on initial load or retry
        if (isInitial) {
          setError(undefined);
        }

        const pageToken = isInitial ? undefined : nextPageTokenRef.current;
        const result = await getUsers(pageToken, PAGE_SIZE, filter);

        if (isInitial) {
          setUsers(sortBy(result.users, ["displayName"]));
        } else {
          setUsers((prev) => [
            ...prev,
            ...sortBy(result.users, ["displayName"]),
          ]);
        }

        // eslint-disable-next-line require-atomic-updates
        hasMoreRef.current = result.hasMore;
        // eslint-disable-next-line require-atomic-updates
        nextPageTokenRef.current = result.nextPageToken;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load users";
        setError(errorMessage);
        // eslint-disable-next-line require-atomic-updates
        hasMoreRef.current = false; // Stop trying to load more on error

        logError(
          "GridView",
          "Error loading users",
          err as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({
            isInitial,
            pageToken: isInitial ? undefined : nextPageTokenRef.current,
            currentUserCount: users?.length || 0,
            errorMessage,
            filter: filter ? "present" : "undefined",
            currentUsers: users?.slice(0, 5) || [], // Include sample of users for debugging, but sanitized
          })
        );
      } finally {
        setIsLoading(false);
        if (!isInitial) {
          // Add small delay before allowing next scroll request
          setTimeout(() => {
            isScrollLoadingRef.current = false;
          }, 300); // 300ms cooldown period
        }
      }
    },
    [isLoading, error, getUsers, logError]
  );

  // Handle search based on search query passed from parent (EmployeesView)
  const handleSearch = useCallback(
    async (searchQuery: string) => {
      try {
        setIsSearchMode(true);
        setSearchQuery(searchQuery);

        // Use the search query directly - no parsing needed as it's handled by EmployeesView
        await loadUsers(true, searchQuery);
      } catch (error) {
        logError(
          "GridView",
          "Failed to execute search",
          error as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({
            component: "GridView",
            operation: "handleSearch",
            searchQuery: searchQuery?.substring(0, 100),
          })
        );

        // Set error state
        setError("Search failed. Please try again.");
      }
    },
    [loadUsers, logError]
  );

  // Sync with external search state
  useEffect(() => {
    if (externalSearchQuery && externalSearchQuery !== searchQuery) {
      handleSearch(externalSearchQuery).catch((error) => {
        logError(
          "GridView",
          "Failed to execute external search",
          error,
          ErrorType.SYSTEM,
          {
            component: "GridView",
            operation: "externalSearch",
            searchQuery: externalSearchQuery,
          }
        );
      });
    } else if (!externalIsSearchMode && isSearchMode) {
      // Clear search when parent clears it
      setIsSearchMode(false);
      setSearchQuery("");

      setUsers([]);
      hasMoreRef.current = true;
      nextPageTokenRef.current = undefined;
      setError(undefined);

      // Reset scroll protection
      isScrollLoadingRef.current = false;
      if (scrollDebounceTimeoutRef.current) {
        clearTimeout(scrollDebounceTimeoutRef.current);
        scrollDebounceTimeoutRef.current = null;
      }

      // Reload regular users
      loadUsers(true).catch((error) => {
        logError(
          "GridView",
          "Failed to reload users after clearing search",
          error,
          ErrorType.SYSTEM,
          {
            component: "GridView",
            operation: "clearSearch",
          }
        );
      });
    }
  }, [
    externalSearchQuery,
    externalIsSearchMode,
    searchQuery,
    isSearchMode,
    logError,
    loadUsers,
  ]);

  // Check if we need to load more data
  const checkShouldLoadMore = useCallback(() => {
    if (!containerRef.current || isLoading || !hasMoreRef.current || error) {
      return false;
    }

    // SCROLL PROTECTION: Check if we're already loading from scroll
    if (isScrollLoadingRef.current) {
      return false;
    }

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    // Load more when we're 90% down the page
    return scrollPercentage >= 0.9;
  }, [isLoading, error]);

  // Load more data for infinite scroll
  const loadMoreData = useCallback(() => {
    if (checkShouldLoadMore()) {
      const filter = isSearchMode ? searchQuery : undefined;
      loadUsers(false, filter).catch((scrollError) => {
        logError(
          "GridView",
          "Failed to load more users from infinite scroll",
          scrollError,
          ErrorType.SYSTEM,
          {
            component: "GridView",
            operation: "infiniteScroll",
            currentUserCount: users?.length || 0,
            isSearchMode,
            searchQuery: isSearchMode ? searchQuery : undefined,
          }
        );
      });
    }
  }, [
    checkShouldLoadMore,
    isSearchMode,
    searchQuery,
    loadUsers,
    logError,
    users?.length,
  ]);

  // Handle scroll event - with proper debouncing and protection
  const handleScroll = useCallback(() => {
    // Clear existing debounce timeout
    if (scrollDebounceTimeoutRef.current) {
      clearTimeout(scrollDebounceTimeoutRef.current);
    }

    // SCROLL PROTECTION: Debounce scroll events (200ms)
    scrollDebounceTimeoutRef.current = setTimeout(() => {
      if (checkShouldLoadMore()) {
        loadMoreData();
      }
    }, 200);
  }, [checkShouldLoadMore, loadMoreData]);

  // Set up scroll event listener for infinite scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !container.clientHeight) return;

    const scrollHandler = (): void => {
      handleScroll();
    };

    container.addEventListener("scroll", scrollHandler, { passive: true });

    return (): void => {
      container.removeEventListener("scroll", scrollHandler);
      // SCROLL PROTECTION: Clean up debounce timeout on unmount
      if (scrollDebounceTimeoutRef.current) {
        clearTimeout(scrollDebounceTimeoutRef.current);
      }
    };
  }, []);

  // Initial load - only when context is available and not already loaded
  useEffect(() => {
    if (!context || hasInitiallyLoaded) return;

    setHasInitiallyLoaded(true);
    loadUsers(true).catch((error) => {
      setHasInitiallyLoaded(false); // Reset on error so it can retry
      console.error("Failed to load initial users:", error);
    });
  }, [context, hasInitiallyLoaded]);




  return (
    <div className={containerStyles} ref={containerRef}>
      {/* Show skeleton cards during initial load */}
      {isLoading && users.length === 0 && !error && (
        <SkeletonCards count={12} />
      )}
      
      {/* Show no users message */}
      {!isLoading && users.length === 0 && hasInitiallyLoaded && !error && (
        <RenderNoUsers isSearchMode={isSearchMode} />
      )}
      
      {/* Render user cards */}
      {users.map((user) => (
        <PersonCard
          key={user.id}
          person={{
            ...user,
            managerId: user.managerId,
            managers: [],
            level: 0,
            isExpanded: false,
            hasDirectReports: false,
            location: user.officeLocation,
            skills: user.skills,
            aboutMe: user.aboutMe,
            phone: user.mobilePhone || user.businessPhones?.[0],
          }}
          showDetails={true}
          isManager={false}
          isCurrentUser={false}
        />
      ))}

      {/* Loading indicator for infinite scroll */}
      {isLoading && users.length > 0 && (
        <div className={loadingStyles}>
          <ProgressBar />
        </div>
      )}
    </div>
  );
};
