import * as React from "react";

import { Caption1, ProgressBar } from "@fluentui/react-components";
import {
  EMessageType,
  ShowMessage,
  StackV2 as Stack,
} from "@spteck/react-controls";
import { useCallback, useEffect, useRef, useState } from "react";

import { IDirectReport } from "../../models/IUserData";
import { PAGE_SIZE } from "../../constants/constants";
import { PersonCard } from "../PersonCard/PersonCard";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { useAtomValue } from "jotai";
import { useOrganizationChartData } from "../../hooks/useOrganizationChartData";
import { useRenderPeersStyles } from "./useRenderPeersStyles";

export interface IRenderPeersProps {}

export const RenderPeers: React.FunctionComponent<IRenderPeersProps> = () => {
  const appglobalstate = useAtomValue(appGlobalStateAtom);
  const { context,   selectedUser } = appglobalstate;
 

  // Styles
  const styles = useRenderPeersStyles();

  // Initialize the organization chart data hook for loading more peers
  const { loadMorePeers,   } = useOrganizationChartData({ context });

  // State for infinite scroll
  const [allPeers, setAllPeers] = useState<IDirectReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = useState<string | undefined>(undefined);

  // Refs for infinite scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollLoadingRef = useRef<boolean>(false);
  const scrollDebounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize peers 
  useEffect(() => {
    (async () =>{
        const peersResults =   await loadMorePeers(selectedUser?.id || "", PAGE_SIZE, undefined) 
        if (peersResults.peers && peersResults.peers.length > 0) {
          setAllPeers(peersResults.peers);
          // Assume there might be more if we have peers - this will be verified on first scroll
          setHasMore(peersResults.hasMore ); // Default page size assumption
        } else {
          setAllPeers([]);
          setHasMore(false);
        }
     })().catch(() => { /* handled internally */ });
    
  }, []);

  const isCurrentUser = React.useCallback(
    (userId: string) =>
      userId === context.pageContext.legacyPageContext.aadUserId,
    [context.pageContext.legacyPageContext.aadUserId]
  );

  // Load more peers function
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore || error || isScrollLoadingRef.current) {
      return;
    }

    if (!selectedUser?.id) {
      return;
    }

    try {
      setIsLoading(true);
      isScrollLoadingRef.current = true;

      const result = await loadMorePeers(
        selectedUser.id,
        PAGE_SIZE, // Page size
        nextPageToken
      );

      setAllPeers((prev) => [...prev, ...result.peers]);
      setHasMore(result.hasMore);
      setNextPageToken(result.nextPageToken);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to load more peers";
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
    selectedUser?.id,
    loadMorePeers,
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

  if (!allPeers || allPeers.length === 0) {
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
       {selectedUser?.displayName} also works with  ({allPeers.length}  )
      </Caption1>

      <div ref={containerRef} className={styles.scrollContainer}>
        <div className={styles.gridContainer}>
          {allPeers.map((peer) => (
            <Stack key={peer.id} padding="0px">
              <PersonCard
                person={peer}
                isCurrentUser={isCurrentUser(peer.id)}
                isManager={false}
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
