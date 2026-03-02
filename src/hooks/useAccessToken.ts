import * as React from "react";

import { BaseComponentContext } from "@microsoft/sp-component-base";
import { AadTokenProvider } from "@microsoft/sp-http";

export interface IUseAccessTokenProps {
  context: BaseComponentContext;
}

export interface IUseAccessTokenResult {
  /**
   * Get the current user's access token (for Microsoft Graph by default)
   * @returns The access token string
   */
  getAccessToken: () => Promise<string>;

  /**
   * Get an access token for a specific resource
   * @param resource - The resource URL to get a token for
   * @returns The access token string
   */
  getAccessTokenForResource: (resource: string) => Promise<string>;

  /**
   * Get the token provider instance for advanced scenarios
   * @returns The AadTokenProvider instance
   */
  getTokenProvider: () => Promise<AadTokenProvider>;
}

/**
 * Hook for getting Azure AD access tokens in SPFx
 *
 * @example
 * ```typescript
 * const { getAccessToken } = useAccessToken({ context });
 *
 * // Get current user's token (Microsoft Graph)
 * const token = await getAccessToken();
 *
 * // Get token for a specific resource (if needed)
 * const customToken = await getAccessTokenForResource("https://my-api.azurewebsites.net");
 * ```
 */
export const useAccessToken = ({
  context,
}: IUseAccessTokenProps): IUseAccessTokenResult => {
  /**
   * Get the AAD Token Provider
   */
  const getTokenProvider = React.useCallback(async (): Promise<AadTokenProvider> => {
    if (!context) {
      throw new Error("SPFx context is not available");
    }

    if (!context.aadTokenProviderFactory) {
      throw new Error("AAD Token Provider Factory is not available in the context");
    }

    return await context.aadTokenProviderFactory.getTokenProvider();
  }, [context]);

  /**
   * Get the current user's access token (Microsoft Graph by default)
   */
  const getAccessToken = React.useCallback(async (): Promise<string> => {
    const tokenProvider = await getTokenProvider();
    const token = await tokenProvider.getToken("https://graph.microsoft.com");

    if (!token) {
      throw new Error("Failed to get access token");
    }

    return token;
  }, [getTokenProvider]);

  /**
   * Get an access token for a specific resource
   */
  const getAccessTokenForResource = React.useCallback(
    async (resource: string): Promise<string> => {
      if (!resource) {
        throw new Error("Resource URL is required");
      }

      const tokenProvider = await getTokenProvider();
      const token = await tokenProvider.getToken(resource);

      if (!token) {
        throw new Error(`Failed to get access token for resource: ${resource}`);
      }

      return token;
    },
    [getTokenProvider]
  );

  return {
    getAccessToken,
    getAccessTokenForResource,
    getTokenProvider,
  };
};
