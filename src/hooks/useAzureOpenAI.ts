import { ErrorType, useLogging } from "@spteck/m365-hooks";

import { BaseComponentContext } from "@microsoft/sp-component-base";
import { HttpClient, HttpClientResponse, IHttpClientOptions } from "@microsoft/sp-http";
import { useAccessToken } from "./useAccessToken";
import { useCallback } from "react";
import { useUtils } from "./useUtils";

export interface IAzureOpenAIConfig {
  endpoint: string;
}

export interface IUseAzureOpenAIProps {
  config: IAzureOpenAIConfig;
  context: BaseComponentContext;
}

export interface IUseAzureOpenAIResult {
  generateSearchQuery: (
    systemPrompt: string,
    userInput: string
  ) => Promise<string>;
  isConfigured: boolean;
}

/**
 * Hook for interacting with Azure OpenAI API
 */
export const useAzureOpenAI = ({
  config,
  context,
}: IUseAzureOpenAIProps): IUseAzureOpenAIResult => {
  const { logError, logInfo } = useLogging();
  const { sanitizeUserData } = useUtils();
  const { getAccessToken } = useAccessToken({ context });
  const isConfigured = Boolean(config?.endpoint);

  /**
   * Generate a search query using Azure OpenAI
   */
  const generateSearchQuery = useCallback(
    async (systemPrompt: string, userInput: string): Promise<string> => {
      if (!isConfigured) {
        throw new Error(
          "Azure OpenAI is not properly configured. Please provide endpoint."
        );
      }

      const { endpoint } = config;

      // Get access token for the current user
      const accessToken = await getAccessToken();

      const requestBody = {
        input: userInput,
        instructions: systemPrompt,
      };

      try {
        logInfo(
          "useAzureOpenAI",
          "Calling Azure OpenAI endpoint",
          sanitizeUserData({
            operation: "generateSearchQuery",
            endpoint: endpoint,
            hasUserInput: Boolean(userInput),
            hasSystemPrompt: Boolean(systemPrompt),
          })
        );

        const httpClientOptions: IHttpClientOptions = {
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        };

        const response: HttpClientResponse = await context.httpClient.post(
          endpoint,
          HttpClient.configurations.v1,
          httpClientOptions
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Azure OpenAI API error: ${response.status} ${response.statusText} - ${errorText}`
          );
        }

        // Handle streaming response - read the full text response
        const generatedQuery = await response.text();

        if (!generatedQuery || !generatedQuery.trim()) {
          throw new Error("Azure OpenAI returned empty response");
        }

        let processedQuery = generatedQuery.trim();

        // Handle streaming data format (data: prefix lines)
        if (processedQuery.includes("data:")) {
          // Extract content from streaming format
          const lines = processedQuery.split("\n");
          const contentLines = lines
            .filter(line => line.startsWith("data:") && !line.includes("event:") && !line.includes('"requestId"'))
            .map(line => line.replace(/^data:\s*/, "").trim())
            .filter(line => line && line !== "[DONE]");
          processedQuery = contentLines.join("");
        }

        // Remove markdown code block formatting if present (```json ... ```)
        processedQuery = processedQuery.replace(/```json\s*/gi, "");
        processedQuery = processedQuery.replace(/```\s*/g, "");
        
        // Remove any remaining backticks
        processedQuery = processedQuery.replace(/`/g, "").trim();

        logInfo(
          "useAzureOpenAI",
          "AI generated search query successfully",
          sanitizeUserData({
            operation: "generateSearchQuery",
            processedQuery: processedQuery,
            userInput: userInput,
            queryLength: processedQuery.length,
          })
        );

        return processedQuery;
      } catch (error) {
        logError(
          "useAzureOpenAI",
          "Error calling Azure OpenAI API",
          error as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({
            operation: "generateSearchQuery",
            userInput,
            endpoint: config.endpoint,
            errorMessage: (error as Error)?.message,
            responseStatus: (error as Error & { status?: number })?.status,
          })
        );
        throw error;
      }
    },
    [config, context, isConfigured, logError, logInfo, getAccessToken, sanitizeUserData]
  );

  return {
    generateSearchQuery,
    isConfigured,
  };
};
