"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListView = void 0;
var tslib_1 = require("tslib");
/* eslint-disable require-atomic-updates */
var React = tslib_1.__importStar(require("react"));
var PersonCard_1 = require("../PersonCard");
var react_components_1 = require("@fluentui/react-components");
var react_controls_1 = require("@spteck/react-controls");
var react_1 = require("react");
var m365_hooks_1 = require("@spteck/m365-hooks");
var constants_1 = require("../../constants/constants");
var RenderNoUsers_1 = require("../RenderNoUsers/RenderNoUsers");
var ListViewSkeleton_1 = require("./ListViewSkeleton");
var appGlobalState_1 = require("../../atoms/appGlobalState");
var jotai_1 = require("jotai");
var useGraphAPIs_1 = require("../../hooks/useGraphAPIs");
var useListViewStyles_1 = require("./useListViewStyles");
var m365_hooks_2 = require("@spteck/m365-hooks");
var useUtils_1 = require("../../hooks/useUtils");
var columnSizingOptions = {
    displayName: { minWidth: 200, defaultWidth: 230, idealWidth: 250 },
    mail: { minWidth: 200, defaultWidth: 180, idealWidth: 200 },
};
var ListView = function (_a) {
    var onUserSelect = _a.onUserSelect, externalSearchQuery = _a.searchQuery, externalIsSearchMode = _a.isSearchMode, onSearchModeChange = _a.onSearchModeChange;
    var sanitizeUserData = (0, useUtils_1.useUtils)().sanitizeUserData;
    var appGlobalState = (0, jotai_1.useAtom)(appGlobalState_1.appGlobalStateAtom)[0];
    var context = appGlobalState.context, hasTeamsContext = appGlobalState.hasTeamsContext;
    var getUsers = (0, useGraphAPIs_1.useGraphAPIs)({ context: context }).getUsers;
    var logError = (0, m365_hooks_2.useLogging)().logError;
    var _b = (0, useListViewStyles_1.useListViewStyles)(appGlobalState), containerStyles = _b.containerStyles, dataGridStyles = _b.dataGridStyles, cellTextStyles = _b.cellTextStyles;
    var windowHeight = window.innerHeight;
    // Define maxHeight based on context
    var maxHeight = hasTeamsContext ? windowHeight - 300 : 700;
    var _c = (0, react_1.useState)(null), actionUser = _c[0], setActionUser = _c[1];
    var executeAction = (0, PersonCard_1.useCardActions)({ person: actionUser || {} }).executeAction;
    var columns = React.useMemo(function () { return [
        {
            column: "displayName",
            header: "Name",
            onRender: function (user) { return (React.createElement(react_components_1.CardHeader, { header: React.createElement(PersonCard_1.RenderPersonHeader, { person: user, avatarSize: 28 }), action: React.createElement(PersonCard_1.Actions, { person: user, onActionClick: function (action) {
                        setActionUser(user);
                        setTimeout(function () {
                            executeAction(action);
                        }, 100);
                    } }) })); },
            order: function (a, b) {
                return a.displayName.localeCompare(b.displayName);
            },
        },
        {
            column: "mail",
            header: "Email",
            onRender: function (user) { return (React.createElement(React.Fragment, null, user.mail ? (React.createElement(react_components_1.Tooltip, { content: user === null || user === void 0 ? void 0 : user.mail, relationship: "label" },
                React.createElement("span", { className: cellTextStyles }, user.mail))) : (React.createElement(React.Fragment, null)))); },
            order: function (a, b) {
                return (a.mail || "").localeCompare(b.mail || "");
            },
        },
        {
            column: "department",
            header: "Department",
            onRender: function (user) { return (React.createElement(React.Fragment, null, user.department ? (React.createElement(react_components_1.Tooltip, { content: user === null || user === void 0 ? void 0 : user.department, relationship: "label" },
                React.createElement("span", { className: cellTextStyles }, user.department))) : (React.createElement(React.Fragment, null)))); },
            order: function (a, b) {
                return (a.department || "").localeCompare(b.department || "");
            },
        },
        {
            column: "mobilePhone",
            header: "Mobile",
            onRender: function (user) { return (React.createElement(React.Fragment, null, user.mobilePhone ? (React.createElement(react_components_1.Tooltip, { content: user === null || user === void 0 ? void 0 : user.mobilePhone, relationship: "label" },
                React.createElement("span", { className: cellTextStyles }, user.mobilePhone))) : (React.createElement(React.Fragment, null)))); },
            order: function (a, b) {
                return (a.mobilePhone || "").localeCompare(b.mobilePhone || "");
            },
        },
        {
            column: "officeLocation",
            header: "Office",
            onRender: function (user) { return (React.createElement(React.Fragment, null, user.officeLocation && (React.createElement(react_components_1.Tooltip, { content: user === null || user === void 0 ? void 0 : user.officeLocation, relationship: "label" },
                React.createElement("span", { className: cellTextStyles }, user.officeLocation))))); },
            order: function (a, b) {
                return (a.officeLocation || "").localeCompare(b.officeLocation || "");
            },
        },
        {
            column: "userType",
            header: "User Type",
            onRender: function (user) {
                if (user.userType === "Guest") {
                    return React.createElement(react_components_1.Badge, { color: "warning" }, user.userType);
                }
                return React.createElement(React.Fragment, null);
            },
            order: function (a, b) {
                return (a.userType || "").localeCompare(b.userType || "");
            },
        },
    ]; }, [context, cellTextStyles, executeAction]);
    var _d = (0, react_1.useState)([]), users = _d[0], setUsers = _d[1];
    var _e = (0, react_1.useState)(true), isLoading = _e[0], setIsLoading = _e[1];
    var _f = (0, react_1.useState)(true), hasMore = _f[0], setHasMore = _f[1];
    var _g = (0, react_1.useState)(undefined), nextPageToken = _g[0], setNextPageToken = _g[1];
    var _h = (0, react_1.useState)(undefined), error = _h[0], setError = _h[1];
    var _j = (0, react_1.useState)(""), searchQuery = _j[0], setSearchQuery = _j[1];
    var _k = (0, react_1.useState)(false), isSearchMode = _k[0], setIsSearchMode = _k[1];
    var _l = (0, react_1.useState)(false), hasInitiallyLoaded = _l[0], setHasInitiallyLoaded = _l[1];
    // SCROLL PROTECTION - Prevent multiple simultaneous scroll requests
    var isScrollLoadingRef = (0, react_1.useRef)(false);
    // Load users function
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
                        if (isLoading || (!hasMore && !isInitial) || (error && !isInitial)) {
                            return [2 /*return*/];
                        }
                        if (isScrollLoadingRef.current)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        if (!isInitial) {
                            isScrollLoadingRef.current = true;
                        }
                        // Only clear error on initial load or retry
                        if (isInitial) {
                            setError(undefined);
                        }
                        pageToken = isInitial ? undefined : nextPageToken;
                        return [4 /*yield*/, getUsers(pageToken, constants_1.PAGE_SIZE, filter)];
                    case 2:
                        result_1 = _a.sent();
                        if (isInitial) {
                            setUsers(result_1.users);
                        }
                        else {
                            setUsers(function (prev) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], prev, true), result_1.users, true); });
                        }
                        setHasMore(result_1.hasMore);
                        setNextPageToken(result_1.nextPageToken);
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        errorMessage = err_1 instanceof Error ? err_1.message : "Failed to load users";
                        setError(errorMessage);
                        setHasMore(false);
                        logError("ListView", "Error loading users", err_1, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                            isInitial: isInitial,
                            pageToken: isInitial ? undefined : nextPageToken,
                            errorMessage: errorMessage,
                            filter: filter ? "present" : "undefined",
                        }));
                        return [3 /*break*/, 5];
                    case 4:
                        isScrollLoadingRef.current = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }, [isLoading, hasMore, error, nextPageToken, getUsers, logError]);
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
                    logError("ListView", "Failed to execute search", error_1, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                        component: "ListView",
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
                logError("ListView", "Failed to execute external search", error, m365_hooks_1.ErrorType.SYSTEM, {
                    component: "ListView",
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
            setHasMore(true);
            setNextPageToken(undefined);
            setError(undefined);
            // Reset scroll protection
            isScrollLoadingRef.current = false;
            // Reload regular users
            loadUsers(true).catch(function (error) {
                logError("ListView", "Failed to reload users after clearing search", error, m365_hooks_1.ErrorType.SYSTEM, {
                    component: "ListView",
                    operation: "clearSearch",
                });
            });
        }
    }, [
        externalSearchQuery,
        externalIsSearchMode,
        searchQuery,
        isSearchMode,
        handleSearch,
        loadUsers,
        logError,
    ]);
    // Handle DataGrid scroll event for infinite scrolling
    var handleScroll = (0, react_1.useCallback)(function () {
        // DataGrid handles scroll position calculation, we just need to load more data if available
        if (hasMore && !isLoading && !isScrollLoadingRef.current) {
            var filter = isSearchMode ? searchQuery : undefined;
            loadUsers(false, filter).catch(function (scrollError) {
                logError("ListView", "Failed to load more users from infinite scroll", scrollError, m365_hooks_1.ErrorType.SYSTEM, {
                    component: "ListView",
                    operation: "infiniteScroll",
                    isSearchMode: isSearchMode,
                    searchQuery: isSearchMode ? searchQuery : undefined,
                });
            });
        }
    }, [hasMore, isLoading, isSearchMode, searchQuery, loadUsers, logError]);
    (0, react_1.useEffect)(function () {
        var loadInitialUsers = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var result, error_2, errorMessage;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!context || hasInitiallyLoaded)
                            return [2 /*return*/];
                        setHasInitiallyLoaded(true);
                        setIsLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, getUsers(undefined, constants_1.PAGE_SIZE, undefined)];
                    case 2:
                        result = _a.sent();
                        setUsers(result.users);
                        setHasMore(result.hasMore);
                        setNextPageToken(result.nextPageToken);
                        setError(undefined);
                        return [3 /*break*/, 5];
                    case 3:
                        error_2 = _a.sent();
                        errorMessage = error_2 instanceof Error ? error_2.message : "Failed to load users";
                        setError(errorMessage);
                        setHasMore(false);
                        setHasInitiallyLoaded(false);
                        logError("ListView", "Failed to load initial users in useEffect", error_2, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({ component: "ListView", operation: "initialLoad" }));
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        loadInitialUsers().catch(function (err) {
            logError("ListView", "Failed to load initial users in catch block", err, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                component: "ListView",
                operation: "initialLoadCatch",
                errorMessage: err === null || err === void 0 ? void 0 : err.message,
            }));
        });
    }, [context, hasInitiallyLoaded, getUsers, logError]);
    if (!context)
        return null;
    if (error) {
        return React.createElement(react_controls_1.ShowError, { title: "User Loading Error", message: error });
    }
    return (React.createElement("div", { className: containerStyles },
        React.createElement("div", { className: dataGridStyles },
            React.createElement(react_controls_1.DataGridV2, { items: users, columns: columns, columnSizingOptions: columnSizingOptions, enableSorting: false, selectionMode: "none", onSelectionChange: function (selectedUsers) {
                    var users = selectedUsers;
                    if (users.length > 0 && onUserSelect) {
                        onUserSelect(users[0]);
                    }
                }, enableResizing: true, isLoadingData: isLoading, isLoadingDataMessage: React.createElement(ListViewSkeleton_1.ListViewSkeleton, { rows: 5, hasTeamsContext: hasTeamsContext }), noItemsMessage: React.createElement(RenderNoUsers_1.RenderNoUsers, { isSearchMode: isSearchMode }), enableInfiniteScroll: true, onLoadMore: handleScroll, hasNextPage: hasMore, infiniteScrollPageSize: constants_1.PAGE_SIZE, virtualizedHeight: maxHeight, virtualizedItemSize: 50, startIndex: users.length > 0 ? users.length : 0 }))));
};
exports.ListView = ListView;
//# sourceMappingURL=ListView.js.map