"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridView = void 0;
var tslib_1 = require("tslib");
/* eslint-disable require-atomic-updates */
var React = tslib_1.__importStar(require("react"));
var m365_hooks_1 = require("@spteck/m365-hooks");
var react_1 = require("react");
var constants_1 = require("../../constants/constants");
var PersonCard_1 = require("../PersonCard/PersonCard");
var react_components_1 = require("@fluentui/react-components");
var RenderNoUsers_1 = require("../RenderNoUsers/RenderNoUsers");
var SkeletonCards_1 = require("./SkeletonCards");
var appGlobalState_1 = require("../../atoms/appGlobalState");
var index_1 = require("@microsoft/sp-lodash-subset/lib/index");
var jotai_1 = require("jotai");
var useGraphAPIs_1 = require("../../hooks/useGraphAPIs");
var useGridViewStyles_1 = require("./useGridViewStyles");
var useUtils_1 = require("../../hooks/useUtils");
var GridView = function (_a) {
    var onUserSelect = _a.onUserSelect, externalSearchQuery = _a.searchQuery, _b = _a.isSearchMode, externalIsSearchMode = _b === void 0 ? false : _b, onSearchModeChange = _a.onSearchModeChange;
    var appGlobalState = (0, jotai_1.useAtom)(appGlobalState_1.appGlobalStateAtom)[0];
    var context = appGlobalState.context;
    var getUsers = (0, useGraphAPIs_1.useGraphAPIs)({ context: context }).getUsers;
    var logError = (0, m365_hooks_1.useLogging)().logError;
    var _c = (0, useGridViewStyles_1.useGridViewStyles)(appGlobalState), containerStyles = _c.containerStyles, loadingStyles = _c.loadingStyles;
    var sanitizeUserData = (0, useUtils_1.useUtils)().sanitizeUserData;
    // State management
    var _d = (0, react_1.useState)([]), users = _d[0], setUsers = _d[1];
    var _e = (0, react_1.useState)(false), isLoading = _e[0], setIsLoading = _e[1];
    var _f = (0, react_1.useState)(undefined), error = _f[0], setError = _f[1];
    var hasMoreRef = (0, react_1.useRef)(true);
    var nextPageTokenRef = (0, react_1.useRef)(undefined);
    // Search state management - now controlled by parent
    var _g = (0, react_1.useState)(externalSearchQuery || ""), searchQuery = _g[0], setSearchQuery = _g[1];
    var _h = (0, react_1.useState)(externalIsSearchMode), isSearchMode = _h[0], setIsSearchMode = _h[1];
    // Layout state management - removed since it's now in EmployeesView
    // Refs for infinite scroll
    var containerRef = (0, react_1.useRef)(null);
    var _j = (0, react_1.useState)(false), hasInitiallyLoaded = _j[0], setHasInitiallyLoaded = _j[1];
    // SCROLL PROTECTION - Prevent multiple simultaneous scroll requests
    var isScrollLoadingRef = (0, react_1.useRef)(false);
    var scrollDebounceTimeoutRef = (0, react_1.useRef)(null);
    // Load users function - now handles both regular and search with optional filter
    var loadUsers = (0, react_1.useCallback)(function () {
        var args_1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_1[_i] = arguments[_i];
        }
        return tslib_1.__awaiter(void 0, tslib_1.__spreadArray([], args_1, true), void 0, function (isInitial, filter) {
            var pageToken, result_1, err_1, errorMessage;
            if (isInitial === void 0) { isInitial = false; }
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Prevent loading if already loading, no more data, or in error state
                        if (isLoading ||
                            (!hasMoreRef.current && !isInitial) ||
                            (error && !isInitial)) {
                            return [2 /*return*/];
                        }
                        // SCROLL PROTECTION: Prevent multiple simultaneous scroll requests
                        if (!isInitial && isScrollLoadingRef.current) {
                            console.log("Scroll request blocked - already loading");
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        setIsLoading(true);
                        if (!isInitial) {
                            isScrollLoadingRef.current = true;
                        }
                        // Only clear error on initial load or retry
                        if (isInitial) {
                            setError(undefined);
                        }
                        pageToken = isInitial ? undefined : nextPageTokenRef.current;
                        return [4 /*yield*/, getUsers(pageToken, constants_1.PAGE_SIZE, filter)];
                    case 2:
                        result_1 = _a.sent();
                        if (isInitial) {
                            setUsers((0, index_1.sortBy)(result_1.users, ["displayName"]));
                        }
                        else {
                            setUsers(function (prev) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], prev, true), (0, index_1.sortBy)(result_1.users, ["displayName"]), true); });
                        }
                        hasMoreRef.current = result_1.hasMore;
                        nextPageTokenRef.current = result_1.nextPageToken;
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        errorMessage = err_1 instanceof Error ? err_1.message : "Failed to load users";
                        setError(errorMessage);
                        hasMoreRef.current = false; // Stop trying to load more on error
                        logError("GridView", "Error loading users", err_1, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                            isInitial: isInitial,
                            pageToken: isInitial ? undefined : nextPageTokenRef.current,
                            currentUserCount: (users === null || users === void 0 ? void 0 : users.length) || 0,
                            errorMessage: errorMessage,
                            filter: filter ? "present" : "undefined",
                            currentUsers: (users === null || users === void 0 ? void 0 : users.slice(0, 5)) || [], // Include sample of users for debugging, but sanitized
                        }));
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        if (!isInitial) {
                            // Add small delay before allowing next scroll request
                            setTimeout(function () {
                                isScrollLoadingRef.current = false;
                            }, 300); // 300ms cooldown period
                        }
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }, [isLoading, error, getUsers, logError]);
    // Handle search based on search query passed from parent (EmployeesView)
    var handleSearch = (0, react_1.useCallback)(function (searchQuery) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setIsSearchMode(true);
                    setSearchQuery(searchQuery);
                    // Use the search query directly - no parsing needed as it's handled by EmployeesView
                    return [4 /*yield*/, loadUsers(true, searchQuery)];
                case 1:
                    // Use the search query directly - no parsing needed as it's handled by EmployeesView
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    logError("GridView", "Failed to execute search", error_1, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                        component: "GridView",
                        operation: "handleSearch",
                        searchQuery: searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.substring(0, 100),
                    }));
                    // Set error state
                    setError("Search failed. Please try again.");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [loadUsers, logError]);
    // Sync with external search state
    (0, react_1.useEffect)(function () {
        if (externalSearchQuery && externalSearchQuery !== searchQuery) {
            handleSearch(externalSearchQuery).catch(function (error) {
                logError("GridView", "Failed to execute external search", error, m365_hooks_1.ErrorType.SYSTEM, {
                    component: "GridView",
                    operation: "externalSearch",
                    searchQuery: externalSearchQuery,
                });
            });
        }
        else if (!externalIsSearchMode && isSearchMode) {
            // Clear search when parent clears it
            setIsSearchMode(false);
            setSearchQuery("");
            setUsers([]);
            hasMoreRef.current = true;
            nextPageTokenRef.current = undefined;
            setError(undefined);
            // Reset scroll protection
            isScrollLoadingRef.current = false;
            if (scrollDebounceTimeoutRef.current) {
                clearTimeout(scrollDebounceTimeoutRef.current);
                scrollDebounceTimeoutRef.current = null;
            }
            // Reload regular users
            loadUsers(true).catch(function (error) {
                logError("GridView", "Failed to reload users after clearing search", error, m365_hooks_1.ErrorType.SYSTEM, {
                    component: "GridView",
                    operation: "clearSearch",
                });
            });
        }
    }, [
        externalSearchQuery,
        externalIsSearchMode,
        searchQuery,
        isSearchMode,
        logError,
        loadUsers,
    ]);
    // Check if we need to load more data
    var checkShouldLoadMore = (0, react_1.useCallback)(function () {
        if (!containerRef.current || isLoading || !hasMoreRef.current || error) {
            return false;
        }
        // SCROLL PROTECTION: Check if we're already loading from scroll
        if (isScrollLoadingRef.current) {
            return false;
        }
        var _a = containerRef.current, scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
        var scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
        // Load more when we're 90% down the page
        return scrollPercentage >= 0.9;
    }, [isLoading, error]);
    // Load more data for infinite scroll
    var loadMoreData = (0, react_1.useCallback)(function () {
        if (checkShouldLoadMore()) {
            var filter = isSearchMode ? searchQuery : undefined;
            loadUsers(false, filter).catch(function (scrollError) {
                logError("GridView", "Failed to load more users from infinite scroll", scrollError, m365_hooks_1.ErrorType.SYSTEM, {
                    component: "GridView",
                    operation: "infiniteScroll",
                    currentUserCount: (users === null || users === void 0 ? void 0 : users.length) || 0,
                    isSearchMode: isSearchMode,
                    searchQuery: isSearchMode ? searchQuery : undefined,
                });
            });
        }
    }, [
        checkShouldLoadMore,
        isSearchMode,
        searchQuery,
        loadUsers,
        logError,
        users === null || users === void 0 ? void 0 : users.length,
    ]);
    // Handle scroll event - with proper debouncing and protection
    var handleScroll = (0, react_1.useCallback)(function () {
        // Clear existing debounce timeout
        if (scrollDebounceTimeoutRef.current) {
            clearTimeout(scrollDebounceTimeoutRef.current);
        }
        // SCROLL PROTECTION: Debounce scroll events (200ms)
        scrollDebounceTimeoutRef.current = setTimeout(function () {
            if (checkShouldLoadMore()) {
                loadMoreData();
            }
        }, 200);
    }, [checkShouldLoadMore, loadMoreData]);
    // Set up scroll event listener for infinite scroll
    (0, react_1.useEffect)(function () {
        var container = containerRef.current;
        if (!container || !container.clientHeight)
            return;
        var scrollHandler = function () {
            handleScroll();
        };
        container.addEventListener("scroll", scrollHandler, { passive: true });
        return function () {
            container.removeEventListener("scroll", scrollHandler);
            // SCROLL PROTECTION: Clean up debounce timeout on unmount
            if (scrollDebounceTimeoutRef.current) {
                clearTimeout(scrollDebounceTimeoutRef.current);
            }
        };
    }, []);
    // Initial load - only when context is available and not already loaded
    (0, react_1.useEffect)(function () {
        if (!context || hasInitiallyLoaded)
            return;
        setHasInitiallyLoaded(true);
        loadUsers(true).catch(function (error) {
            setHasInitiallyLoaded(false); // Reset on error so it can retry
            console.error("Failed to load initial users:", error);
        });
    }, [context, hasInitiallyLoaded]);
    /* // calculate the number of cards to fit on container height
    if (containerRef?.current) {
      const cardHeight = 232;
      const containerHeight = containerRef.current.clientHeight;
      console.log(`Container height: ${containerHeight}px`);
      const cardsToShow = Math.floor(containerHeight / cardHeight);
      console.log(`Container height: ${containerHeight}px, Cards to show: ${cardsToShow}`);
      const newheight = (cardsToShow + 1) * cardHeight;
     console.log(`Container height set to: ${newheight}px`);
      // container.style.height = `${newheight}px`;
    }  */
    return (React.createElement("div", { className: containerStyles, ref: containerRef },
        isLoading && users.length === 0 && !error && (React.createElement(SkeletonCards_1.SkeletonCards, { count: 12 })),
        !isLoading && users.length === 0 && hasInitiallyLoaded && !error && (React.createElement(RenderNoUsers_1.RenderNoUsers, { isSearchMode: isSearchMode })),
        users.map(function (user) {
            var _a;
            return (React.createElement(PersonCard_1.PersonCard, { key: user.id, person: tslib_1.__assign(tslib_1.__assign({}, user), { managerId: user.managerId, managers: [], level: 0, isExpanded: false, hasDirectReports: false, location: user.officeLocation, skills: user.skills, aboutMe: user.aboutMe, phone: user.mobilePhone || ((_a = user.businessPhones) === null || _a === void 0 ? void 0 : _a[0]) }), showDetails: true, isManager: false, isCurrentUser: false }));
        }),
        isLoading && users.length > 0 && (React.createElement("div", { className: loadingStyles },
            React.createElement(react_components_1.ProgressBar, null)))));
};
exports.GridView = GridView;
//# sourceMappingURL=GridView.js.map