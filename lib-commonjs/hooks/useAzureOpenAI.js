"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAzureOpenAI = void 0;
var tslib_1 = require("tslib");
var m365_hooks_1 = require("@spteck/m365-hooks");
var sp_http_1 = require("@microsoft/sp-http");
var useAccessToken_1 = require("./useAccessToken");
var react_1 = require("react");
var useUtils_1 = require("./useUtils");
/**
 * Hook for interacting with Azure OpenAI API
 */
var useAzureOpenAI = function (_a) {
    var config = _a.config, context = _a.context;
    var _b = (0, m365_hooks_1.useLogging)(), logError = _b.logError, logInfo = _b.logInfo;
    var sanitizeUserData = (0, useUtils_1.useUtils)().sanitizeUserData;
    var getAccessToken = (0, useAccessToken_1.useAccessToken)({ context: context }).getAccessToken;
    var isConfigured = Boolean(config === null || config === void 0 ? void 0 : config.endpoint);
    /**
     * Generate a search query using Azure OpenAI
     */
    var generateSearchQuery = (0, react_1.useCallback)(function (systemPrompt, userInput) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var endpoint, accessToken, requestBody, httpClientOptions, response, errorText, generatedQuery, processedQuery, lines, contentLines, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isConfigured) {
                        throw new Error("Azure OpenAI is not properly configured. Please provide endpoint.");
                    }
                    endpoint = config.endpoint;
                    return [4 /*yield*/, getAccessToken()];
                case 1:
                    accessToken = _a.sent();
                    requestBody = {
                        input: userInput,
                        instructions: systemPrompt,
                    };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, , 8]);
                    logInfo("useAzureOpenAI", "Calling Azure OpenAI endpoint", sanitizeUserData({
                        operation: "generateSearchQuery",
                        endpoint: endpoint,
                        hasUserInput: Boolean(userInput),
                        hasSystemPrompt: Boolean(systemPrompt),
                    }));
                    httpClientOptions = {
                        body: JSON.stringify(requestBody),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer ".concat(accessToken),
                        },
                    };
                    return [4 /*yield*/, context.httpClient.post(endpoint, sp_http_1.HttpClient.configurations.v1, httpClientOptions)];
                case 3:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 5];
                    return [4 /*yield*/, response.text()];
                case 4:
                    errorText = _a.sent();
                    throw new Error("Azure OpenAI API error: ".concat(response.status, " ").concat(response.statusText, " - ").concat(errorText));
                case 5: return [4 /*yield*/, response.text()];
                case 6:
                    generatedQuery = _a.sent();
                    if (!generatedQuery || !generatedQuery.trim()) {
                        throw new Error("Azure OpenAI returned empty response");
                    }
                    processedQuery = generatedQuery.trim();
                    // Handle streaming data format (data: prefix lines)
                    if (processedQuery.includes("data:")) {
                        lines = processedQuery.split("\n");
                        contentLines = lines
                            .filter(function (line) { return line.startsWith("data:") && !line.includes("event:") && !line.includes('"requestId"'); })
                            .map(function (line) { return line.replace(/^data:\s*/, "").trim(); })
                            .filter(function (line) { return line && line !== "[DONE]"; });
                        processedQuery = contentLines.join("");
                    }
                    // Remove markdown code block formatting if present (```json ... ```)
                    processedQuery = processedQuery.replace(/```json\s*/gi, "");
                    processedQuery = processedQuery.replace(/```\s*/g, "");
                    // Remove any remaining backticks
                    processedQuery = processedQuery.replace(/`/g, "").trim();
                    logInfo("useAzureOpenAI", "AI generated search query successfully", sanitizeUserData({
                        operation: "generateSearchQuery",
                        processedQuery: processedQuery,
                        userInput: userInput,
                        queryLength: processedQuery.length,
                    }));
                    return [2 /*return*/, processedQuery];
                case 7:
                    error_1 = _a.sent();
                    logError("useAzureOpenAI", "Error calling Azure OpenAI API", error_1, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                        operation: "generateSearchQuery",
                        userInput: userInput,
                        endpoint: config.endpoint,
                        errorMessage: error_1 === null || error_1 === void 0 ? void 0 : error_1.message,
                        responseStatus: error_1 === null || error_1 === void 0 ? void 0 : error_1.status,
                    }));
                    throw error_1;
                case 8: return [2 /*return*/];
            }
        });
    }); }, [config, context, isConfigured, logError, logInfo, getAccessToken, sanitizeUserData]);
    return {
        generateSearchQuery: generateSearchQuery,
        isConfigured: isConfigured,
    };
};
exports.useAzureOpenAI = useAzureOpenAI;
//# sourceMappingURL=useAzureOpenAI.js.map