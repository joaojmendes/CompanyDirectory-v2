"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesView = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var GridButtons_1 = require("../GridButtons");
var react_1 = require("react");
var AISearchControl_1 = require("../AISearchControl");
var constants_1 = require("../../constants/constants");
var m365_hooks_1 = require("@spteck/m365-hooks");
var GridView_1 = require("../GridView/GridView");
var ListView_1 = require("../ListView");
var instructions_1 = require("../../openAI/instructions");
var react_controls_1 = require("@spteck/react-controls");
var appGlobalState_1 = require("../../atoms/appGlobalState");
var jotai_1 = require("jotai");
var useEmployeesViewStyles_1 = require("./useEmployeesViewStyles");
var m365_hooks_2 = require("@spteck/m365-hooks");
var useUtils_1 = require("../../hooks/useUtils");
var EmployeesView = function (_a) {
    var onUserSelect = _a.onUserSelect;
    var appGlobalState = (0, jotai_1.useAtom)(appGlobalState_1.appGlobalStateAtom)[0];
    var context = appGlobalState.context;
    var logError = (0, m365_hooks_2.useLogging)().logError;
    var _b = (0, useEmployeesViewStyles_1.useEmployeesViewStyles)(), containerStyles = _b.containerStyles, toolbarStyles = _b.toolbarStyles, toolbarDividerStyles = _b.toolbarDividerStyles;
    // Layout state management
    var _c = (0, react_1.useState)(GridButtons_1.Elayout.Grid), currentLayout = _c[0], setCurrentLayout = _c[1];
    var _d = (0, useUtils_1.useUtils)(), parseAIResponse = _d.parseAIResponse, sanitizeUserData = _d.sanitizeUserData;
    // Search state management - will be passed down to child components
    var _e = (0, react_1.useState)(""), searchQuery = _e[0], setSearchQuery = _e[1];
    var _f = (0, react_1.useState)(""), searchDescription = _f[0], setSearchDescription = _f[1];
    var _g = (0, react_1.useState)(false), isSearchMode = _g[0], setIsSearchMode = _g[1];
    var _h = (0, react_1.useState)(false), isSearchStarted = _h[0], setIsSearchStarted = _h[1];
    // Handle layout change
    var handleLayoutChange = (0, react_1.useCallback)(function (layout) {
        setCurrentLayout(layout);
    }, []);
    // Handle search query generation or clearing
    var handleSearchQueryGenerated = (0, react_1.useCallback)(function (results) {
        if (results && typeof results === "string" && results.trim()) {
            // User performed a search - extract search info for display
            try {
                var _a = parseAIResponse(results), filter = _a.filter, description = _a.description;
                setIsSearchMode(true);
                setSearchQuery(filter);
                setSearchDescription(description);
            }
            catch (error) {
                // Log parsing error but continue with raw filter
                logError("EmployeesView", "Could not parse AI response", error, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                    component: "EmployeesView",
                    operation: "parseAIResponse",
                    originalResponse: results.substring(0, 200) + ((results === null || results === void 0 ? void 0 : results.length) > 200 ? "..." : ""),
                }));
                // For non-JSON responses
                setIsSearchMode(true);
                setSearchQuery(results);
                setSearchDescription("your search criteria");
            }
            finally {
                setIsSearchStarted(false);
            }
        }
        else {
            // Search was cleared
            setIsSearchMode(false);
            setSearchQuery("");
            setSearchDescription("");
        }
    }, []);
    var handleSearchStart = (0, react_1.useCallback)(function () {
        // Search initiated - no logging needed for normal operation
        setIsSearchStarted(true);
        console.log("AI search started", isSearchStarted);
    }, []);
    var handleSearchError = (0, react_1.useCallback)(function (error, originalInput) {
        setIsSearchStarted(false);
        logError("EmployeesView", "AI Search component error", new Error(error), m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
            component: "EmployeesView",
            operation: "aiSearchError",
            originalInput: originalInput,
        }));
    }, []);
    var RenderIsSearching = React.useCallback(function () {
        if (isSearchStarted) {
            return (React.createElement(react_components_1.Field, { validationMessage: "Searching...", validationState: "none" },
                React.createElement(react_components_1.ProgressBar, null)));
        }
        return null;
    }, [isSearchStarted]);
    if (!context) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: containerStyles },
            React.createElement(react_controls_1.StackV2, { justifyContent: "end", direction: "horizontal", className: toolbarStyles, gap: "10px" },
                React.createElement(react_components_1.Field, null,
                    React.createElement(AISearchControl_1.AISearchControl, { systemPromptTemplate: instructions_1.OPEN_AI_INSTRUCTIONS, azureOpenAIConfig: {
                            endpoint: constants_1.AZURE_API_ENDPOINT,
                        }, onSearchQueryGenerated: handleSearchQueryGenerated, onSearchStart: handleSearchStart, onSearchError: handleSearchError, placeholder: "Search with AI, add your query with natural language" })),
                React.createElement(react_components_1.Divider, { vertical: true, className: toolbarDividerStyles }),
                React.createElement(GridButtons_1.GridButtons, { currentLayout: currentLayout, onLayoutChange: handleLayoutChange })),
            React.createElement(react_controls_1.StackV2, { paddingLeft: "15px", paddingBottom: "20px", paddingRight: "15px" }, isSearchStarted && React.createElement(RenderIsSearching, null)),
            isSearchMode && (React.createElement(react_controls_1.StackV2, { paddingLeft: "15px", paddingBottom: "20px", paddingRight: "15px" },
                React.createElement(react_components_1.Body1Strong, null,
                    "Showing search results for: \u201C",
                    searchDescription,
                    "\u201D"))),
            React.createElement(react_controls_1.StackV2, { paddingLeft: "12px", paddingBottom: "20px", paddingRight: "12px", overflow: "hidden" }, currentLayout === GridButtons_1.Elayout.Grid ? (React.createElement(GridView_1.GridView, { onUserSelect: onUserSelect, searchQuery: searchQuery, isSearchMode: isSearchMode, onSearchModeChange: setIsSearchMode })) : (React.createElement(ListView_1.ListView, { onUserSelect: onUserSelect, searchQuery: searchQuery, isSearchMode: isSearchMode, onSearchModeChange: setIsSearchMode }))))));
};
exports.EmployeesView = EmployeesView;
//# sourceMappingURL=EmployeesView.js.map