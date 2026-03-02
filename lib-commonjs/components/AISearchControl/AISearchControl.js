"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AISearchControl = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var m365_hooks_1 = require("@spteck/m365-hooks");
var react_components_1 = require("@fluentui/react-components");
var useAzureOpenAI_1 = require("../../hooks/useAzureOpenAI");
var react_1 = require("react");
var AISearchIcon_1 = require("./AISearchIcon");
var useAISearchControlStyles_1 = require("./useAISearchControlStyles");
var useUtils_1 = require("../../hooks/useUtils");
var appGlobalState_1 = require("../../atoms/appGlobalState");
var jotai_1 = require("jotai");
var AISearchControl = function (_a) {
    var systemPromptTemplate = _a.systemPromptTemplate, azureOpenAIConfig = _a.azureOpenAIConfig, _b = _a.placeholder, placeholder = _b === void 0 ? "Ask AI to generate search query... (e.g., 'Find engineers in the Seattle office')" : _b, onSearchQueryGenerated = _a.onSearchQueryGenerated, onSearchStart = _a.onSearchStart, onSearchError = _a.onSearchError, _c = _a.disabled, disabled = _c === void 0 ? false : _c, className = _a.className;
    var logError = (0, m365_hooks_1.useLogging)().logError;
    var appGlobalState = (0, jotai_1.useAtomValue)(appGlobalState_1.appGlobalStateAtom);
    var context = appGlobalState.context;
    var _d = (0, useAzureOpenAI_1.useAzureOpenAI)({
        config: azureOpenAIConfig,
        context: context,
    }), generateSearchQuery = _d.generateSearchQuery, isConfigured = _d.isConfigured;
    var sanitizeUserData = (0, useUtils_1.useUtils)().sanitizeUserData;
    var _e = (0, react_1.useState)(false), isLoading = _e[0], setIsLoading = _e[1];
    var _f = (0, react_1.useState)(""), searchInput = _f[0], setSearchInput = _f[1];
    var searchBoxRef = (0, react_1.useRef)(null);
    var _g = (0, react_1.useState)(null), searchError = _g[0], setSearchError = _g[1];
    // Get styles from custom hook
    var _h = (0, useAISearchControlStyles_1.useAISearchControlStyles)(), searchBoxStyles = _h.searchBoxStyles, iconWrapperStyles = _h.iconWrapperStyles;
    /**
     * Generate AI search query
     */
    var handleAISearch = (0, react_1.useCallback)(function (inputValue) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var configError, trimmedInput, searchQuery, err_1, errorMessage;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!inputValue.trim()) {
                        return [2 /*return*/];
                    }
                    if (!isConfigured) {
                        configError = "Azure OpenAI is not properly configured. Please check your configuration.";
                        setSearchError(configError);
                        onSearchError === null || onSearchError === void 0 ? void 0 : onSearchError(configError, inputValue.trim());
                        return [2 /*return*/];
                    }
                    trimmedInput = inputValue.trim();
                    setIsLoading(true);
                    setSearchError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    onSearchStart === null || onSearchStart === void 0 ? void 0 : onSearchStart(trimmedInput);
                    return [4 /*yield*/, generateSearchQuery(systemPromptTemplate, trimmedInput)];
                case 2:
                    searchQuery = _a.sent();
                    // Return the generated search query to the host application
                    onSearchQueryGenerated === null || onSearchQueryGenerated === void 0 ? void 0 : onSearchQueryGenerated(searchQuery, trimmedInput);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    errorMessage = err_1 instanceof Error
                        ? err_1.message
                        : "An error occurred during AI search query generation";
                    setSearchError(errorMessage);
                    logError("AISearchControl", "Error generating AI search query", err_1, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                        operation: "handleAISearch",
                        userInput: trimmedInput,
                        errorMessage: errorMessage,
                        isConfigured: isConfigured,
                    }));
                    onSearchError === null || onSearchError === void 0 ? void 0 : onSearchError(errorMessage, trimmedInput);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [
        generateSearchQuery,
        systemPromptTemplate,
        onSearchQueryGenerated,
        onSearchStart,
        onSearchError,
        logError,
        isConfigured,
    ]);
    /**
     * Handle search input changes
     */
    var handleSearchChange = (0, react_1.useCallback)(function (_, data) {
        setSearchInput(data.value);
    }, []);
    /**
     * Handle dismiss/clear button click
     */
    var handleDismiss = (0, react_1.useCallback)(function () {
        var _a;
        setSearchInput("");
        (_a = searchBoxRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        // Notify the host that search was cleared
        onSearchQueryGenerated === null || onSearchQueryGenerated === void 0 ? void 0 : onSearchQueryGenerated("", "");
    }, [onSearchQueryGenerated]);
    /**
     * Handle Enter and Escape key presses
     */
    var handleKeyPress = (0, react_1.useCallback)(function (event) {
        var _a;
        if (event.key === "Enter" && !isLoading && searchInput.trim()) {
            handleAISearch(searchInput).catch(function (error) {
                console.error("Error in handleAISearch:", error);
            });
        }
        else if (event.key === "Escape") {
            (_a = searchBoxRef.current) === null || _a === void 0 ? void 0 : _a.blur();
            // Clear the search input when Escape is pressed
            setSearchInput("");
            // Notify the host that search was cleared
            onSearchQueryGenerated === null || onSearchQueryGenerated === void 0 ? void 0 : onSearchQueryGenerated("", "");
        }
    }, [handleAISearch, isLoading, searchInput, onSearchQueryGenerated]);
    return ((0, jsx_runtime_1.jsx)(react_components_1.Field, { validationState: searchError ? "error" : "none", validationMessage: searchError || undefined, children: (0, jsx_runtime_1.jsx)(react_components_1.SearchBox, { ref: searchBoxRef, css: searchBoxStyles, className: className, placeholder: placeholder, value: searchInput, onChange: handleSearchChange, onKeyDown: handleKeyPress, disabled: disabled || isLoading, contentBefore: (0, jsx_runtime_1.jsx)("span", { css: iconWrapperStyles, children: (0, jsx_runtime_1.jsx)(AISearchIcon_1.AISearchIcon, { size: 20 }) }), dismiss: {
                onClick: handleDismiss,
            } }) }));
};
exports.AISearchControl = AISearchControl;
//# sourceMappingURL=AISearchControl.js.map