"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderDirectReports = void 0;
var tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var react_controls_1 = require("@spteck/react-controls");
var react_1 = require("react");
var constants_1 = require("../../constants/constants");
var PersonCard_1 = require("../PersonCard/PersonCard");
var appGlobalState_1 = require("../../atoms/appGlobalState");
var jotai_1 = require("jotai");
var useGraphAPIs_1 = require("../../hooks/useGraphAPIs");
var useOrganizationChartData_1 = require("../../hooks/useOrganizationChartData");
var useRenderDirectReportsStyles_1 = require("./useRenderDirectReportsStyles");
var RenderDirectReports = function () {
    var appglobalstate = (0, jotai_1.useAtomValue)(appGlobalState_1.appGlobalStateAtom);
    var context = appglobalstate.context, organizationTree = appglobalstate.organizationTree;
    var id = (organizationTree || {}).id;
    // Styles
    var styles = (0, useRenderDirectReportsStyles_1.useRenderDirectReportsStyles)(appglobalstate);
    // Initialize the organization chart data hook for loading more direct reports
    var loadMoreDirectReports = (0, useOrganizationChartData_1.useOrganizationChartData)({ context: context }).loadMoreDirectReports;
    // Initialize Graph APIs hook
    var getTotalDirectReports = (0, useGraphAPIs_1.useGraphAPIs)({ context: context }).getTotalDirectReports;
    // State for infinite scroll
    var _a = (0, react_1.useState)([]), allDirectReports = _a[0], setAllDirectReports = _a[1];
    var _b = (0, react_1.useState)(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(false), hasMore = _c[0], setHasMore = _c[1];
    var _d = (0, react_1.useState)(undefined), nextPageToken = _d[0], setNextPageToken = _d[1];
    var _e = (0, react_1.useState)(undefined), error = _e[0], setError = _e[1];
    // State for tracking direct reports count for each user
    var _f = (0, react_1.useState)(new Map()), userDirectReportsCount = _f[0], setUserDirectReportsCount = _f[1];
    // Refs for infinite scroll
    var containerRef = (0, react_1.useRef)(null);
    var isScrollLoadingRef = (0, react_1.useRef)(false);
    var scrollDebounceTimeoutRef = (0, react_1.useRef)(null);
    // Initialize direct reports from organization tree
    (0, react_1.useEffect)(function () {
        (function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var directoReportsResults;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loadMoreDirectReports(id || "", constants_1.PAGE_SIZE // Page size
                        )];
                    case 1:
                        directoReportsResults = _a.sent();
                        if (directoReportsResults.directReports &&
                            directoReportsResults.directReports.length > 0) {
                            setAllDirectReports(directoReportsResults.directReports);
                            // Assume there might be more if we have direct reports - this will be verified on first scroll
                            setHasMore(directoReportsResults.hasMore); // Default page size assumption
                            setNextPageToken(directoReportsResults.nextPageToken);
                        }
                        else {
                            setAllDirectReports([]);
                            setHasMore(false);
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    // Check which direct reports have their own direct reports (parallel execution for performance)
    (0, react_1.useEffect)(function () {
        if (allDirectReports.length === 0) {
            return;
        }
        var checkDirectReportsInParallel = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var checkPromises, results_1, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        checkPromises = allDirectReports.map(function (report) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var count, error_2;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, getTotalDirectReports(report.id)];
                                    case 1:
                                        count = _a.sent();
                                        return [2 /*return*/, { userId: report.id, count: count }];
                                    case 2:
                                        error_2 = _a.sent();
                                        console.warn("Failed to check direct reports for user ".concat(report.id, ":"), error_2);
                                        return [2 /*return*/, { userId: report.id, count: 0 }];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(checkPromises)];
                    case 1:
                        results_1 = _a.sent();
                        // Update count state with results
                        setUserDirectReportsCount(function (prevMap) {
                            var newMap = new Map(prevMap);
                            results_1.forEach(function (_a) {
                                var userId = _a.userId, count = _a.count;
                                newMap.set(userId, count);
                            });
                            return newMap;
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error checking direct reports:", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        checkDirectReportsInParallel();
    }, [allDirectReports, getTotalDirectReports]);
    var isCurrentUser = React.useCallback(function (userId) {
        return userId === context.pageContext.legacyPageContext.aadUserId;
    }, [context.pageContext.legacyPageContext.aadUserId]);
    // Load more direct reports function
    var loadMoreData = (0, react_1.useCallback)(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result_1, err_1, errorMessage;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isLoading || !hasMore || error || isScrollLoadingRef.current) {
                        return [2 /*return*/];
                    }
                    if (!id) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setIsLoading(true);
                    isScrollLoadingRef.current = true;
                    return [4 /*yield*/, loadMoreDirectReports(id, constants_1.PAGE_SIZE, // Page size
                        nextPageToken)];
                case 2:
                    result_1 = _a.sent();
                    setAllDirectReports(function (prev) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], prev, true), result_1.directReports, true); });
                    setHasMore(result_1.hasMore);
                    setNextPageToken(result_1.nextPageToken);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    errorMessage = err_1 instanceof Error
                        ? err_1.message
                        : "Failed to load more direct reports";
                    setError(errorMessage);
                    setHasMore(false);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    setTimeout(function () {
                        isScrollLoadingRef.current = false;
                    }, 300);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [
        isLoading,
        hasMore,
        error,
        id,
        loadMoreDirectReports,
        nextPageToken,
    ]);
    // Check if we need to load more data
    var checkShouldLoadMore = (0, react_1.useCallback)(function () {
        if (!containerRef.current || isLoading || !hasMore || error) {
            return false;
        }
        if (isScrollLoadingRef.current) {
            return false;
        }
        var _a = containerRef.current, scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
        var scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
        // Load more when we're 90% down the page
        return scrollPercentage >= 0.9;
    }, [isLoading, hasMore, error]);
    // Handle scroll event
    var handleScroll = (0, react_1.useCallback)(function () {
        if (scrollDebounceTimeoutRef.current) {
            clearTimeout(scrollDebounceTimeoutRef.current);
        }
        scrollDebounceTimeoutRef.current = setTimeout(function () {
            if (checkShouldLoadMore()) {
                loadMoreData().catch(console.error);
            }
        }, 200);
    }, [checkShouldLoadMore, loadMoreData]);
    // Set up scroll event listener
    (0, react_1.useEffect)(function () {
        var container = containerRef.current;
        if (!container)
            return;
        var scrollHandler = function () {
            handleScroll();
        };
        container.addEventListener("scroll", scrollHandler, { passive: true });
        return function () {
            container.removeEventListener("scroll", scrollHandler);
            if (scrollDebounceTimeoutRef.current) {
                clearTimeout(scrollDebounceTimeoutRef.current);
            }
        };
    }, [handleScroll]);
    if (!allDirectReports || allDirectReports.length === 0) {
        return React.createElement(React.Fragment, null);
    }
    else {
        console.log("direct reports count", allDirectReports.length);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(react_components_1.Caption1, { style: {
                fontWeight: 600,
                marginBottom: 10,
                marginTop: 10,
                paddingLeft: 20,
                paddingRight: 20,
                display: "inline-flex",
            } },
            "Showing Direct Reports (",
            allDirectReports.length,
            ")"),
        React.createElement("div", { ref: containerRef, className: styles.scrollContainer },
            React.createElement("div", { className: styles.gridContainer },
                allDirectReports.map(function (report) { return (React.createElement(react_controls_1.StackV2, { key: report.id, padding: "0px" },
                    React.createElement(PersonCard_1.PersonCard, { person: report, isCurrentUser: isCurrentUser(report.id), isManager: false, totalDirectReports: userDirectReportsCount.get(report.id) || 0 }))); }),
                isLoading && (React.createElement("div", { className: styles.loadingContainer },
                    React.createElement(react_components_1.ProgressBar, null))),
                error && (React.createElement("div", { className: styles.statusContainer },
                    React.createElement(react_controls_1.ShowMessage, { message: error, messageType: react_controls_1.EMessageType.INFO })))))));
};
exports.RenderDirectReports = RenderDirectReports;
//# sourceMappingURL=RenderDirectReports.js.map