import * as React from "react";

import { Actions, RenderPersonHeader, useCardActions } from "../PersonCard";
import {
  Badge,
  CardHeader,
  TableColumnSizingOptions,
  Tooltip,
} from "@fluentui/react-components";
import {
  DataGridV2 as DataGrid,
  IColumnConfig,
  ShowError,
} from "@spteck/react-controls";
import { useCallback, useEffect, useRef, useState } from "react";

import { ErrorType } from "@spteck/m365-hooks";
import { IUserProfile } from "../../models/IUserData";
import { PAGE_SIZE } from "../../constants/constants";
import { RenderNoUsers } from "../RenderNoUsers/RenderNoUsers";
import { ListViewSkeleton } from "./ListViewSkeleton";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { useAtom } from "jotai";
import { useGraphAPIs } from "../../hooks/useGraphAPIs";
import { useListViewStyles } from "./useListViewStyles";
import { useLogging } from "@spteck/m365-hooks";
import { useUtils } from "../../hooks/useUtils";

const columnSizingOptions: TableColumnSizingOptions = {
  displayName: { minWidth: 200, defaultWidth: 230, idealWidth: 250 },
  mail: { minWidth: 200, defaultWidth: 180, idealWidth: 200 },
};

export interface IListViewProps {
  onUserSelect?: (user: IUserProfile) => void;
  searchQuery?: string;
  isSearchMode?: boolean;
  onSearchModeChange?: (isSearchMode: boolean) => void;
}

export const ListView: React.FunctionComponent<IListViewProps> = ({
  onUserSelect,
  searchQuery: externalSearchQuery,
  isSearchMode: externalIsSearchMode,
  onSearchModeChange,
}) => {
  const { sanitizeUserData } = useUtils();
  const [appGlobalState] = useAtom(appGlobalStateAtom);
  const { context, hasTeamsContext } = appGlobalState;
  const { getUsers } = useGraphAPIs({ context });
  const { logError } = useLogging();
  const { containerStyles, dataGridStyles, cellTextStyles } =
    useListViewStyles(appGlobalState);
  const windowHeight = window.innerHeight;
  // Define maxHeight based on context
  const maxHeight = hasTeamsContext ? windowHeight - 300 : 700;
  const [actionUser, setActionUser] = useState<IUserProfile | null>(null);
  const { executeAction } = useCardActions( { person: actionUser || {} as IUserProfile } );

  const columns: IColumnConfig<IUserProfile>[] = React.useMemo(
    () => [
      {
        column: "displayName",
        header: "Name",
        onRender: (user: IUserProfile) => (
          <CardHeader
            header={<RenderPersonHeader person={user} avatarSize={28} />}
            action={
              <Actions
                person={user}
                onActionClick={(action: string) => {
                  setActionUser(user);
                  setTimeout(() => {
                    executeAction(action);
                  }, 100);
                }}
              />
            }
          />
        ),
        order: (a: IUserProfile, b: IUserProfile) =>
          a.displayName.localeCompare(b.displayName),
      },
      {
        column: "mail",
        header: "Email",
        onRender: (user: IUserProfile) => (
          <>
            {user.mail ? (
              <Tooltip content={user?.mail} relationship="label">
                <span className={cellTextStyles}>{user.mail}</span>
              </Tooltip>
            ) : (
              <></>
            )}
          </>
        ),
        order: (a: IUserProfile, b: IUserProfile) =>
          (a.mail || "").localeCompare(b.mail || ""),
      },
      {
        column: "department",
        header: "Department",
        onRender: (user: IUserProfile) => (
          <>
            {user.department ? (
              <Tooltip content={user?.department} relationship="label">
                <span className={cellTextStyles}>{user.department}</span>
              </Tooltip>
            ) : (
              <></>
            )}
          </>
        ),
        order: (a: IUserProfile, b: IUserProfile) =>
          (a.department || "").localeCompare(b.department || ""),
      },
      {
        column: "mobilePhone",
        header: "Mobile",
        onRender: (user: IUserProfile) => (
          <>
            {user.mobilePhone ? (
              <Tooltip content={user?.mobilePhone} relationship="label">
                <span className={cellTextStyles}>{user.mobilePhone}</span>
              </Tooltip>
            ) : (
              <></>
            )}
          </>
        ),
        order: (a: IUserProfile, b: IUserProfile) =>
          (a.mobilePhone || "").localeCompare(b.mobilePhone || ""),
      },
      {
        column: "officeLocation",
        header: "Office",
        onRender: (user: IUserProfile) => (
          <>
            {user.officeLocation && (
              <Tooltip content={user?.officeLocation} relationship="label">
                <span className={cellTextStyles}>{user.officeLocation}</span>
              </Tooltip>
            )}
          </>
        ),
        order: (a: IUserProfile, b: IUserProfile) =>
          (a.officeLocation || "").localeCompare(b.officeLocation || ""),
      },
      {
        column: "userType",
        header: "User Type",
        onRender: (user: IUserProfile) => {
          if (user.userType === "Guest") {
            return <Badge color="warning">{user.userType}</Badge>;
          }
          return <></>;
        },
        order: (a: IUserProfile, b: IUserProfile) =>
          (a.userType || "").localeCompare(b.userType || ""),
      },
    ],
    [context, cellTextStyles, executeAction]
  );

  const [users, setUsers] = useState<IUserProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState<boolean>(false);

  // SCROLL PROTECTION - Prevent multiple simultaneous scroll requests
  const isScrollLoadingRef = useRef<boolean>(false);

  // Load users function
  const loadUsers = useCallback(
    async (isInitial: boolean = false, filter?: string) => {
      // Prevent loading if already loading, no more data, or in error state
      if (isLoading || (!hasMore && !isInitial) || (error && !isInitial)) {
        return;
      }

      if (isScrollLoadingRef.current) return;

      try {
        
        if (!isInitial) {
          isScrollLoadingRef.current = true;
        }

        // Only clear error on initial load or retry
        if (isInitial) {
          setError(undefined);
        }

        const pageToken = isInitial ? undefined : nextPageToken;
        const result = await getUsers(pageToken, PAGE_SIZE, filter);

        if (isInitial) {
          setUsers(result.users);
        } else {
          setUsers((prev) => [...prev, ...result.users]);
        }
        setHasMore(result.hasMore);
        setNextPageToken(result.nextPageToken);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load users";
        setError(errorMessage);
        setHasMore(false);
        logError(
          "ListView",
          "Error loading users",
          err as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({
            isInitial,
            pageToken: isInitial ? undefined : nextPageToken,
            errorMessage,
            filter: filter ? "present" : "undefined",
          })
        );
      } finally {
        // eslint-disable-next-line require-atomic-updates
        isScrollLoadingRef.current = false;
      }
    },
    [isLoading, hasMore, error, nextPageToken, getUsers, logError]
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
          "ListView",
          "Failed to execute search",
          error as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({
            component: "ListView",
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
          "ListView",
          "Failed to execute external search",
          error,
          ErrorType.SYSTEM,
          {
            component: "ListView",
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
      setHasMore(true);
      setNextPageToken(undefined);
      setError(undefined);

      // Reset scroll protection
      isScrollLoadingRef.current = false;

      // Reload regular users
      loadUsers(true).catch((error) => {
        logError(
          "ListView",
          "Failed to reload users after clearing search",
          error,
          ErrorType.SYSTEM,
          {
            component: "ListView",
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
    handleSearch,
    loadUsers,
    logError,
  ]);

  // Handle DataGrid scroll event for infinite scrolling
  const handleScroll = useCallback(() => {
    // DataGrid handles scroll position calculation, we just need to load more data if available
    if (hasMore && !isLoading && !isScrollLoadingRef.current) {
      const filter = isSearchMode ? searchQuery : undefined;
      loadUsers(false, filter).catch((scrollError) => {
        logError(
          "ListView",
          "Failed to load more users from infinite scroll",
          scrollError,
          ErrorType.SYSTEM,
          {
            component: "ListView",
            operation: "infiniteScroll",
            isSearchMode,
            searchQuery: isSearchMode ? searchQuery : undefined,
          }
        );
      });
    }
  }, [hasMore, isLoading, isSearchMode, searchQuery, loadUsers, logError]);


  useEffect(() => {
    const loadInitialUsers = async (): Promise<void> => {
      if (!context || hasInitiallyLoaded) return;
      setHasInitiallyLoaded(true);
      setIsLoading(true);
      try {
        const result = await getUsers(undefined, PAGE_SIZE, undefined);
        setUsers(result.users);
        setHasMore(result.hasMore);
        setNextPageToken(result.nextPageToken);
        setError(undefined);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to load users";
        setError(errorMessage);
        setHasMore(false);
        setHasInitiallyLoaded(false);
        logError(
          "ListView",
          "Failed to load initial users in useEffect",
          error as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({ component: "ListView", operation: "initialLoad" })
        );
      }
      finally {
        setIsLoading(false);
      }
    };
    loadInitialUsers().catch((err) => {
      logError(
        "ListView",
        "Failed to load initial users in catch block",
        err as Error,
        ErrorType.SYSTEM,
        sanitizeUserData({
          component: "ListView",
          operation: "initialLoadCatch",
          errorMessage: (err as Error)?.message,
        })
      );
    });
  }, [context, hasInitiallyLoaded, getUsers, logError]);

  if (!context) return null;

  if (error) {
    return <ShowError title="User Loading Error" message={error} />;
  }


  return (
    <div className={containerStyles}>
      <div className={dataGridStyles}>
        <DataGrid
          items={users}
          columns={columns as IColumnConfig<unknown>[]}
          columnSizingOptions={columnSizingOptions}
          enableSorting={false}
          selectionMode="none"
          onSelectionChange={(selectedUsers: unknown[]) => {
            const users = selectedUsers as IUserProfile[];
            if (users.length > 0 && onUserSelect) {
              onUserSelect(users[0]);
            }
          }}
          enableResizing={true}
          isLoadingData={isLoading}
          isLoadingDataMessage={
            <ListViewSkeleton rows={5} hasTeamsContext={hasTeamsContext} />
          }
          noItemsMessage={<RenderNoUsers isSearchMode={isSearchMode} />}
          enableInfiniteScroll={true}
          onLoadMore={handleScroll}
          hasNextPage={hasMore}
          infiniteScrollPageSize={PAGE_SIZE}
          virtualizedHeight={maxHeight}
          virtualizedItemSize={50}
          startIndex={users.length > 0 ? users.length : 0}
        />
      </div>
    </div>
  );
};
