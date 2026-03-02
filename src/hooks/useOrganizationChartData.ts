import { ErrorType, useLogging } from "@spteck/m365-hooks";
import {
  IDirectReport,
  IManager,
  IOrganizationNode,
  IUserData,
  IUserProfile,
} from "../models/IUserData";
import { useCallback, useState } from "react";

import { BaseComponentContext } from "@microsoft/sp-component-base";
import { useGraphAPIs } from "./useGraphAPIs";
import { useUtils } from "./useUtils";

export interface IUseOrganizationChartDataProps {
  context: BaseComponentContext;
}

export interface IUseOrganizationChartDataResult {
  userData: IUserData | undefined;
  organizationTree: IOrganizationNode | undefined;
  isLoading: boolean;
  error: string | undefined;
  fetchUserData: (targetUserId?: string) => Promise<void>;
  loadMoreDirectReports: (
    userId: string,
    pageSize?: number,
    nextPageToken?: string
  ) => Promise<{
    directReports: IDirectReport[];
    hasMore: boolean;
    nextPageToken?: string;
    totalCount?: number;
  }>;
  loadMorePeers: (
    userId: string,
    pageSize?: number,
    nextPageToken?: string
  ) => Promise<{
    peers: IDirectReport[];
    hasMore: boolean;
    nextPageToken?: string;
    totalCount?: number;
  }>;
}

export const useOrganizationChartData = ({
  context,
}: IUseOrganizationChartDataProps): IUseOrganizationChartDataResult => {
  // Initialize logging
  if (!context) {
    console.warn("Context not available");
    return {
      userData: undefined,
      organizationTree: undefined,
      isLoading: false,
      error: "Context not available",
      fetchUserData: async () => {},  
      loadMoreDirectReports: async () => ({
        directReports: [],
        hasMore: false,
      }),
      loadMorePeers: async () => ({
        peers: [],
        hasMore: false,
      }),
    };
  }
  const { logError, logInfo } = useLogging();
const { sanitizeUserData } = useUtils();
  // Local state instead of global state
  const [userData, setUserData] = useState<IUserData | undefined>(undefined);
  const [organizationTree, setOrganizationTree] = useState<
    IOrganizationNode | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Use the Graph API hook
  const {
    getUserProfile,
    getUserManager,
    getAllManagers,
    getUserDirectReports,
    getUserPeers,
    getTotalDirectReports,
  } = useGraphAPIs({ context });

  /**
   * Build organization tree structure
   */
  const buildOrganizationTree = useCallback(
    async (
      user: IUserProfile,
      managers: IManager[],
      manager?: IManager,
      directReports?: number
    ): Promise<IOrganizationNode> => {
      const userNode: IOrganizationNode = {
        id: user.id,
        displayName: user.displayName,
        jobTitle: user.jobTitle,
        department: user.department,
        mail: user.mail,
        userPrincipalName: user.userPrincipalName,
        photoUrl: user.photoUrl,
        location: user.officeLocation,
        skills: user.skills,
        aboutMe: user.aboutMe,
        phone: user.mobilePhone || user.businessPhones?.[0],
        managerId: manager?.id,
        managers: managers,
        level: 0,
       
        isExpanded: true,
        userType: user.userType,
        hasDirectReports: directReports && directReports > 0 ? true : false,
        totalDirectReports: directReports || 0,
      };

   
      return userNode;
    },
    [logError]
  );

  /**
   * Fetch user data including profile, manager, direct reports, and peers
   * Fetches fresh data from Graph API without caching
   */
  const fetchUserData = useCallback(
    async (targetUserId?: string): Promise<void> => {
      try {
        setIsLoading(true);
        setError(undefined);

        logInfo(
          "useOrganizationChartData",
          "Fetching data from Graph API",
          sanitizeUserData({
            operation: "fetchUserData",
            targetUserId: targetUserId || "current user",
          })
        );

        // Fetch user profile, manager, and manager chain for navigation
        const [user, manager, allManagers, totalDirectReports] = await Promise.all([
          getUserProfile(targetUserId),
          getUserManager(targetUserId),
          getAllManagers(targetUserId),
          getTotalDirectReports(targetUserId),
        ]);

        const newUserData: IUserData = {
          user,
          manager,
          managers: allManagers,
          totalDirectReports: totalDirectReports,
          peers: [],
        };

        // Build organization tree
        const orgTree = await buildOrganizationTree(
          user,
          allManagers,
          manager,
          totalDirectReports
        );

        setUserData(newUserData);
        setOrganizationTree(orgTree);
        setIsLoading(false);
        setError(undefined);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        setIsLoading(false);
        logError(
          "useOrganizationChartData",
          "Error fetching user data",
          err as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({
            operation: "fetchUserData",
            targetUserId: targetUserId || "current user",
            errorMessage,
          })
        );
      }
    },
    [
      getUserProfile,
      getUserManager,
      getAllManagers,
      getTotalDirectReports,
      buildOrganizationTree,
      logInfo,
      logError,
    ]
  );

  /**
   * Load more direct reports with paging support for infinite scroll
   */
  const loadMoreDirectReports = useCallback(
    async (
      userId: string,
      pageSize?: number,
      nextPageToken?: string
    ): Promise<{
      directReports: IDirectReport[];
      hasMore: boolean;
      nextPageToken?: string;
      totalCount?: number;
    }> => {
      try {
        const result = await getUserDirectReports(
          userId,
          pageSize,
          nextPageToken
        );
        return result;
      } catch (error) {
        logError(
          "useOrganizationChartData",
          "Error loading more direct reports",
          error as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({
            operation: "loadMoreDirectReports",
            userId,
            pageSize,
            errorMessage: (error as Error)?.message,
          })
        );
        return {
          directReports: [],
          hasMore: false,
        };
      }
    },
    [getUserDirectReports, logError]
  );

  /**
   * Load more peers with paging support for infinite scroll
   */
  const loadMorePeers = useCallback(
    async (
      userId: string,
      pageSize?: number,
      nextPageToken?: string
    ): Promise<{
      peers: IDirectReport[];
      hasMore: boolean;
      nextPageToken?: string;
      totalCount?: number;
    }> => {
      try {
        const result = await getUserPeers(userId, pageSize, nextPageToken);
        return result;
      } catch (error) {
        logError(
          "useOrganizationChartData",
          "Error loading more peers",
          error as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({
            operation: "loadMorePeers",
            userId,
            pageSize,
            errorMessage: (error as Error)?.message,
          })
        );
        return {
          peers: [],
          hasMore: false,
        };
      }
    },
    [getUserPeers, logError]
  );

  return {
    userData,
    organizationTree,
    isLoading,
    error,
    fetchUserData,
    loadMoreDirectReports,
    loadMorePeers,
  };
};
