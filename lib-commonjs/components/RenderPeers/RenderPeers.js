"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderPeers = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var react_controls_1 = require("@spteck/react-controls");
var react_1 = require("react");
var constants_1 = require("../../constants/constants");
var PersonCard_1 = require("../PersonCard/PersonCard");
var appGlobalState_1 = require("../../atoms/appGlobalState");
var jotai_1 = require("jotai");
var useOrganizationChartData_1 = require("../../hooks/useOrganizationChartData");
var useRenderPeersStyles_1 = require("./useRenderPeersStyles");
var RenderPeers = function () {
    var appglobalstate = (0, jotai_1.useAtomValue)(appGlobalState_1.appGlobalStateAtom);
    var context = appglobalstate.context, selectedUser = appglobalstate.selectedUser;
    // Styles
    var styles = (0, useRenderPeersStyles_1.useRenderPeersStyles)();
    // Initialize the organization chart data hook for loading more peers
    var loadMorePeers = (0, useOrganizationChartData_1.useOrganizationChartData)({ context: context }).loadMorePeers;
    // State for infinite scroll
    var _a = (0, react_1.useState)([]), allPeers = _a[0], setAllPeers = _a[1];
    var _b = (0, react_1.useState)(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(false), hasMore = _c[0], setHasMore = _c[1];
    var _d = (0, react_1.useState)(undefined), nextPageToken = _d[0], setNextPageToken = _d[1];
    var _e = (0, react_1.useState)(undefined), error = _e[0], setError = _e[1];
    // Refs for infinite scroll
    var containerRef = (0, react_1.useRef)(null);
    var isScrollLoadingRef = (0, react_1.useRef)(false);
    var scrollDebounceTimeoutRef = (0, react_1.useRef)(null);
    // Initialize peers 
    (0, react_1.useEffect)(function () {
        (function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var peersResults;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loadMorePeers((selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.id) || "", constants_1.PAGE_SIZE, undefined)];
                    case 1:
                        peersResults = _a.sent();
                        if (peersResults.peers && peersResults.peers.length > 0) {
                            setAllPeers(peersResults.peers);
                            // Assume there might be more if we have peers - this will be verified on first scroll
                            setHasMore(peersResults.hasMore); // Default page size assumption
                        }
                        else {
                            setAllPeers([]);
                            setHasMore(false);
                        }
                        return [2 /*return*/];
                }
            });
        }); })().catch(function () { });
    }, []);
    var isCurrentUser = React.useCallback(function (userId) {
        return userId === context.pageContext.legacyPageContext.aadUserId;
    }, [context.pageContext.legacyPageContext.aadUserId]);
    // Load more peers function
    var loadMoreData = (0, react_1.useCallback)(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result_1, err_1, errorMessage;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isLoading || !hasMore || error || isScrollLoadingRef.current) {
                        return [2 /*return*/];
                    }
                    if (!(selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.id)) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setIsLoading(true);
                    isScrollLoadingRef.current = true;
                    return [4 /*yield*/, loadMorePeers(selectedUser.id, constants_1.PAGE_SIZE, // Page size
                        nextPageToken)];
                case 2:
                    result_1 = _a.sent();
                    setAllPeers(function (prev) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], prev, true), result_1.peers, true); });
                    setHasMore(result_1.hasMore);
                    setNextPageToken(result_1.nextPageToken);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    errorMessage = err_1 instanceof Error
                        ? err_1.message
                        : "Failed to load more peers";
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
        selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.id,
        loadMorePeers,
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
    if (!allPeers || allPeers.length === 0) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(react_components_1.Caption1, { style: {
                fontWeight: 600,
                marginBottom: 10,
                marginTop: 10,
                paddingLeft: 20,
                paddingRight: 20,
                display: "inline-flex",
            } }, selectedUser === null || selectedUser === void 0 ? void 0 :
            selectedUser.displayName,
            " also works with  (",
            allPeers.length,
            "  )"),
        React.createElement("div", { ref: containerRef, className: styles.scrollContainer },
            React.createElement("div", { className: styles.gridContainer },
                allPeers.map(function (peer) { return (React.createElement(react_controls_1.StackV2, { key: peer.id, padding: "0px" },
                    React.createElement(PersonCard_1.PersonCard, { person: peer, isCurrentUser: isCurrentUser(peer.id), isManager: false }))); }),
                isLoading && (React.createElement("div", { className: styles.loadingContainer },
                    React.createElement(react_components_1.ProgressBar, null))),
                error && (React.createElement("div", { className: styles.statusContainer },
                    React.createElement(react_controls_1.ShowMessage, { message: error, messageType: react_controls_1.EMessageType.INFO })))))));
};
exports.RenderPeers = RenderPeers;
//# sourceMappingURL=RenderPeers.js.map