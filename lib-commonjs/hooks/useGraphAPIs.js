"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGraphAPIs = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var m365_hooks_1 = require("@spteck/m365-hooks");
var constants_1 = require("../constants/constants");
var useUtils_1 = require("./useUtils");
// Base fields to select for user queries
var USER_BASE_FIELDS = "id,displayName,mail,userPrincipalName,jobTitle,department,officeLocation,businessPhones,mobilePhone,companyName,employeeId,userType";
var USER_EXTENDED_FIELDS = "".concat(USER_BASE_FIELDS, ",aboutMe,skills");
var useGraphAPIs = function (_a) {
    var context = _a.context;
    var logError = (0, m365_hooks_1.useLogging)().logError;
    var _b = (0, useUtils_1.useUtils)(), blobToBase64 = _b.blobToBase64, sanitizeUserData = _b.sanitizeUserData;
    // Create Graph client function
    var getGraphClient = React.useCallback(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!context) {
                        throw new Error("Context not available");
                    }
                    return [4 /*yield*/, context.msGraphClientFactory.getClient("3")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, [context]);
    /**
     * Helper function to handle Graph API errors consistently
     */
    var handleGraphError = React.useCallback(function (error, operation, additionalContext) {
        var graphError = error;
        console.error("Graph API Error in ".concat(operation, ":"), error);
        logError("useGraphAPIs", "Error in ".concat(operation), graphError, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData(tslib_1.__assign({ operation: operation, errorCode: graphError.code, errorStatus: graphError.status, errorMessage: graphError.message }, additionalContext)));
        return new Error("Failed to ".concat(operation, ": ").concat(graphError.message));
    }, []);
    /**
     * Get user photo as base64 data URL
     */
    var getUserPhoto = React.useCallback(function (userId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var endpoint, client, photoBlob, error_1, graphError;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    endpoint = userId
                        ? "/users/".concat(userId, "/photo/$value")
                        : "/me/photo/$value";
                    return [4 /*yield*/, getGraphClient()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.api(endpoint).get()];
                case 2:
                    photoBlob = _a.sent();
                    if (!(photoBlob instanceof Blob)) return [3 /*break*/, 4];
                    return [4 /*yield*/, blobToBase64(photoBlob)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [2 /*return*/, undefined];
                case 5:
                    error_1 = _a.sent();
                    graphError = error_1;
                    // Photo not found is expected and not an error
                    if (graphError.code === "ImageNotFound" || graphError.status === 404) {
                        return [2 /*return*/, undefined];
                    }
                    console.warn("Could not fetch photo for user ".concat(userId || "current", ":"), error_1);
                    return [2 /*return*/, undefined];
                case 6: return [2 /*return*/];
            }
        });
    }); }, []);
    /**
     * Get user profile information
     */
    var getUserProfile = React.useCallback(function (userId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var endpoint, client, response, userProfile, error_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    endpoint = userId ? "/users/".concat(userId) : "/me";
                    return [4 /*yield*/, getGraphClient()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client
                            .api(endpoint)
                            .select(USER_EXTENDED_FIELDS)
                            .get()];
                case 2:
                    response = _a.sent();
                    userProfile = {
                        id: response.id || "",
                        displayName: response.displayName || "",
                        mail: response.mail || response.userPrincipalName || "",
                        userPrincipalName: response.userPrincipalName || "",
                        jobTitle: response.jobTitle || "",
                        department: response.department || "",
                        officeLocation: response.officeLocation || "",
                        businessPhones: response.businessPhones || [],
                        mobilePhone: response.mobilePhone || "",
                        companyName: response.companyName || "",
                        employeeId: response.employeeId || "",
                        aboutMe: response.aboutMe || "",
                        skills: response.skills || [],
                        userType: response.userType || "",
                    };
                    // Fetch photo separately (non-blocking)
                    try {
                        userProfile.photoUrl = "".concat(context.pageContext.web.absoluteUrl, "//_layouts/15/userphoto.aspx?size=L&username=").concat(response.userPrincipalName || "");
                    }
                    catch (_b) {
                        // Photo fetch failure is not critical
                    }
                    return [2 /*return*/, userProfile];
                case 3:
                    error_2 = _a.sent();
                    throw handleGraphError(error_2, "getUserProfile", {
                        userId: userId || "current",
                    });
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    /**
     * Get user's manager
     */
    var getUserManager = React.useCallback(function (userId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var endpoint, client, response, manager, error_3, graphError;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    endpoint = userId ? "/users/".concat(userId, "/manager") : "/me/manager";
                    return [4 /*yield*/, getGraphClient()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client
                            .api(endpoint)
                            .select(USER_BASE_FIELDS)
                            .get()];
                case 2:
                    response = _a.sent();
                    if (!(response === null || response === void 0 ? void 0 : response.id)) {
                        return [2 /*return*/, undefined];
                    }
                    manager = {
                        id: response.id,
                        displayName: response.displayName,
                        jobTitle: response.jobTitle,
                        department: response.department,
                        mail: response.mail || response.userPrincipalName || "",
                        userPrincipalName: response.userPrincipalName,
                    };
                    // Fetch photo separately (non-blocking)
                    try {
                        manager.photoUrl = "".concat(context.pageContext.web.absoluteUrl, "//_layouts/15/userphoto.aspx?size=L&username=").concat(response.userPrincipalName || "");
                    }
                    catch (_b) {
                        // Photo fetch failure is not critical
                    }
                    return [2 /*return*/, manager];
                case 3:
                    error_3 = _a.sent();
                    graphError = error_3;
                    // No manager is expected and not an error
                    if (graphError.code === "Request_ResourceNotFound" ||
                        graphError.status === 404) {
                        return [2 /*return*/, undefined];
                    }
                    throw handleGraphError(error_3, "getUserManager", {
                        userId: userId || "current",
                    });
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    /**
     * Get the total count of direct reports for a user
     */
    var getTotalDirectReports = React.useCallback(function (userId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var endpoint, client, count, error_4, graphError;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    endpoint = userId
                        ? "/users/".concat(userId, "/directReports/$count")
                        : "/me/directReports/$count";
                    return [4 /*yield*/, getGraphClient()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client
                            .api(endpoint)
                            .header("ConsistencyLevel", "eventual")
                            .get()];
                case 2:
                    count = _a.sent();
                    return [2 /*return*/, Number(count) || 0];
                case 3:
                    error_4 = _a.sent();
                    graphError = error_4;
                    // User not found or no direct reports is expected and not an error
                    if (graphError.code === "Request_ResourceNotFound" ||
                        graphError.status === 404) {
                        return [2 /*return*/, 0];
                    }
                    logError("useGraphAPIs", "Could not fetch direct reports count for user ".concat(userId || "current"), error_4, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                        userId: userId || "current",
                        operation: "getTotalDirectReports",
                    }));
                    return [2 /*return*/, 0];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [getGraphClient]);
    /**
     * Get all managers in the hierarchy
     */
    var getAllManagers = React.useCallback(function (userId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var endpoint, client, response, managers_1, currentManager, manager, countPromises, countResults, error_5, error_6, graphError;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    endpoint = userId ? "/users/".concat(userId) : "/me";
                    return [4 /*yield*/, getGraphClient()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client
                            .api(endpoint)
                            .expand("manager($levels=max;$select=".concat(USER_BASE_FIELDS, ")"))
                            .select("id,displayName")
                            .header("ConsistencyLevel", "eventual")
                            .get()];
                case 2:
                    response = _a.sent();
                    managers_1 = [];
                    currentManager = response.manager;
                    while (currentManager) {
                        manager = {
                            id: currentManager.id,
                            displayName: currentManager.displayName,
                            jobTitle: currentManager.jobTitle,
                            department: currentManager.department,
                            mail: currentManager.mail,
                            userPrincipalName: currentManager.userPrincipalName,
                        };
                        // Fetch photo separately (non-blocking)
                        try {
                            manager.photoUrl = "".concat(context.pageContext.web.absoluteUrl, "//_layouts/15/userphoto.aspx?size=L&username=").concat(currentManager.userPrincipalName || "");
                        }
                        catch (_b) {
                            // Photo fetch failure is not critical
                        }
                        managers_1.push(manager);
                        currentManager = currentManager.manager;
                    }
                    if (!(managers_1.length > 0)) return [3 /*break*/, 6];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    countPromises = managers_1.map(function (manager) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var count, error_7;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, getTotalDirectReports(manager.id)];
                                case 1:
                                    count = _a.sent();
                                    return [2 /*return*/, { managerId: manager.id, count: count }];
                                case 2:
                                    error_7 = _a.sent();
                                    logError("useGraphAPIs", "Failed to get direct reports count for manager ".concat(manager.id), error_7, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                                        managerId: manager.id,
                                        operation: "getTotalDirectReports",
                                    }));
                                    return [2 /*return*/, { managerId: manager.id, count: 0 }];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(countPromises)];
                case 4:
                    countResults = _a.sent();
                    // Update managers with their direct reports count
                    countResults.forEach(function (_a) {
                        var managerId = _a.managerId, count = _a.count;
                        var manager = managers_1.find(function (m) { return m.id === managerId; });
                        if (manager) {
                            manager.totalDirectReports = count;
                        }
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_5 = _a.sent();
                    logError("useGraphAPIs", "Error fetching direct reports count for managers", error_5, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                        operation: "getAllManagers_fetchCounts",
                        managersCount: managers_1.length,
                    }));
                    // Set default count to 0 for all managers if parallel fetch fails
                    managers_1.forEach(function (manager) {
                        manager.totalDirectReports = 0;
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/, managers_1.reverse()];
                case 7:
                    error_6 = _a.sent();
                    graphError = error_6;
                    // No managers is expected and not an error
                    if (graphError.code === "Request_ResourceNotFound" ||
                        graphError.status === 404) {
                        return [2 /*return*/, []];
                    }
                    throw handleGraphError(error_6, "getAllManagers", {
                        userId: userId || "current",
                    });
                case 8: return [2 /*return*/];
            }
        });
    }); }, [context, getGraphClient, getTotalDirectReports]);
    /**
     * Get user's direct reports with paging support
     */
    var getUserDirectReports = React.useCallback(function (userId_1) {
        var args_1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args_1[_i - 1] = arguments[_i];
        }
        return tslib_1.__awaiter(void 0, tslib_1.__spreadArray([userId_1], args_1, true), void 0, function (userId, pageSize, nextPageToken) {
            var client, response, endpoint, directReports, error_8;
            var _a;
            if (pageSize === void 0) { pageSize = 20; }
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, getGraphClient()];
                    case 1:
                        client = _b.sent();
                        response = void 0;
                        if (!nextPageToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, client.api(nextPageToken).get()];
                    case 2:
                        // Use next page token
                        response = _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        endpoint = userId
                            ? "/users/".concat(userId, "/directReports")
                            : "/me/directReports";
                        return [4 /*yield*/, client
                                .api(endpoint)
                                .select(USER_BASE_FIELDS)
                                .top(pageSize)
                                .count(true)
                                .get()];
                    case 4:
                        response = _b.sent();
                        _b.label = 5;
                    case 5:
                        if (!((_a = response === null || response === void 0 ? void 0 : response.value) === null || _a === void 0 ? void 0 : _a.length)) {
                            return [2 /*return*/, {
                                    directReports: [],
                                    hasMore: false,
                                    nextPageToken: undefined,
                                    totalCount: response === null || response === void 0 ? void 0 : response["@odata.count"],
                                }];
                        }
                        return [4 /*yield*/, Promise.allSettled(response.value.map(function (report) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                var directReport;
                                return tslib_1.__generator(this, function (_a) {
                                    directReport = {
                                        id: report.id,
                                        displayName: report.displayName,
                                        jobTitle: report.jobTitle,
                                        department: report.department,
                                        mail: report.mail || report.userPrincipalName || "",
                                        userPrincipalName: report.userPrincipalName,
                                    };
                                    // Fetch photo separately (non-blocking)
                                    try {
                                        directReport.photoUrl = "".concat(context.pageContext.web.absoluteUrl, "//_layouts/15/userphoto.aspx?size=L&username=").concat(report.userPrincipalName || "");
                                    }
                                    catch (_b) {
                                        // Photo fetch failure is not critical
                                    }
                                    return [2 /*return*/, directReport];
                                });
                            }); }))];
                    case 6:
                        directReports = _b.sent();
                        return [2 /*return*/, {
                                directReports: directReports
                                    .filter(function (result) {
                                    return result.status === "fulfilled";
                                })
                                    .map(function (result) {
                                    return result.value;
                                }),
                                hasMore: Boolean(response === null || response === void 0 ? void 0 : response["@odata.nextLink"]),
                                nextPageToken: response === null || response === void 0 ? void 0 : response["@odata.nextLink"],
                                totalCount: response === null || response === void 0 ? void 0 : response["@odata.count"],
                            }];
                    case 7:
                        error_8 = _b.sent();
                        throw handleGraphError(error_8, "getUserDirectReports", {
                            userId: userId || "current",
                        });
                    case 8: return [2 /*return*/];
                }
            });
        });
    }, [context]);
    /**
     * Get user's peers (colleagues with the same manager) with pagination support
     */
    var getUserPeers = React.useCallback(function (userId_1) {
        var args_1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args_1[_i - 1] = arguments[_i];
        }
        return tslib_1.__awaiter(void 0, tslib_1.__spreadArray([userId_1], args_1, true), void 0, function (userId, pageSize, nextPageToken) {
            var manager, result, currentUserId_1, _a, peers, error_9;
            if (pageSize === void 0) { pageSize = 20; }
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, getUserManager(userId)];
                    case 1:
                        manager = _b.sent();
                        if (!manager) {
                            return [2 /*return*/, {
                                    peers: [],
                                    hasMore: false,
                                    nextPageToken: undefined,
                                    totalCount: 0,
                                }];
                        }
                        return [4 /*yield*/, getUserDirectReports(manager.id, pageSize, nextPageToken)];
                    case 2:
                        result = _b.sent();
                        _a = userId;
                        if (_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, getUserProfile()];
                    case 3:
                        _a = (_b.sent()).id;
                        _b.label = 4;
                    case 4:
                        currentUserId_1 = _a;
                        peers = result.directReports.filter(function (report) { return report.id !== currentUserId_1; });
                        return [2 /*return*/, {
                                peers: peers,
                                hasMore: result.hasMore,
                                nextPageToken: result.nextPageToken,
                                totalCount: result.totalCount ? result.totalCount - 1 : undefined, // Subtract 1 for the current user
                            }];
                    case 5:
                        error_9 = _b.sent();
                        logError("useGraphAPIs", "Error fetching user peers", error_9, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                            userId: userId || "current",
                            operation: "getUserPeers",
                        }));
                        return [2 /*return*/, {
                                peers: [],
                                hasMore: false,
                                nextPageToken: undefined,
                                totalCount: 0,
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }, [getUserManager, getUserDirectReports, getUserProfile]);
    /**
     * Search users in the organization
     */
    var searchUsers = React.useCallback(function (searchTerm_1) {
        var args_1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args_1[_i - 1] = arguments[_i];
        }
        return tslib_1.__awaiter(void 0, tslib_1.__spreadArray([searchTerm_1], args_1, true), void 0, function (searchTerm, top) {
            var client, apiCall, encodedSearchTerm, encodedSearchTerm, filterExpression, response, users, error_10;
            var _a;
            if (top === void 0) { top = 20; }
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, getGraphClient()];
                    case 1:
                        client = _b.sent();
                        apiCall = client.api("/users");
                        // Build search filter based on term type
                        if (searchTerm.includes(" eq ") ||
                            searchTerm.includes(" and ") ||
                            searchTerm.includes(" or ") ||
                            searchTerm.includes("contains(") ||
                            searchTerm.includes("startswith(")) {
                            encodedSearchTerm = encodeURIComponent(searchTerm);
                            apiCall = apiCall.filter(encodedSearchTerm);
                        }
                        else {
                            encodedSearchTerm = encodeURIComponent(searchTerm);
                            filterExpression = "startswith(displayName,'".concat(encodedSearchTerm, "') or startswith(userPrincipalName,'").concat(encodedSearchTerm, "') or startswith(mail,'").concat(encodedSearchTerm, "')");
                            apiCall = apiCall.filter(filterExpression);
                        }
                        return [4 /*yield*/, apiCall.select(USER_BASE_FIELDS).top(top).get()];
                    case 2:
                        response = _b.sent();
                        if (!((_a = response === null || response === void 0 ? void 0 : response.value) === null || _a === void 0 ? void 0 : _a.length)) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, Promise.allSettled(response.value.map(function (user) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                var userInfo;
                                return tslib_1.__generator(this, function (_a) {
                                    userInfo = {
                                        id: user.id,
                                        displayName: user.displayName,
                                        jobTitle: user.jobTitle,
                                        department: user.department,
                                        mail: user.mail,
                                        userPrincipalName: user.userPrincipalName,
                                    };
                                    // Fetch photo separately (non-blocking)
                                    try {
                                        userInfo.photoUrl = "".concat(context.pageContext.web.absoluteUrl, "//_layouts/15/userphoto.aspx?size=L&username=").concat(user.userPrincipalName || "");
                                    }
                                    catch (_b) {
                                        // Photo fetch failure is not critical
                                    }
                                    return [2 /*return*/, userInfo];
                                });
                            }); }))];
                    case 3:
                        users = _b.sent();
                        return [2 /*return*/, users
                                .filter(function (result) {
                                return result.status === "fulfilled";
                            })
                                .map(function (result) {
                                return result.value;
                            })];
                    case 4:
                        error_10 = _b.sent();
                        throw handleGraphError(error_10, "searchUsers", { searchTerm: searchTerm, top: top });
                    case 5: return [2 /*return*/];
                }
            });
        });
    }, []);
    /**
     * Check if a user has direct reports (lightweight check)
     */
    var hasDirectReports = React.useCallback(function (userId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var client, response, _a;
        var _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getGraphClient()];
                case 1:
                    client = _c.sent();
                    return [4 /*yield*/, client
                            .api("/users/".concat(userId, "/directReports"))
                            .top(1)
                            .get()];
                case 2:
                    response = _c.sent();
                    return [2 /*return*/, Boolean((_b = response === null || response === void 0 ? void 0 : response.value) === null || _b === void 0 ? void 0 : _b.length)];
                case 3:
                    _a = _c.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    /**
     * Get users with pagination support
     */
    var getUsers = React.useCallback(function (pageToken_1) {
        var args_1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args_1[_i - 1] = arguments[_i];
        }
        return tslib_1.__awaiter(void 0, tslib_1.__spreadArray([pageToken_1], args_1, true), void 0, function (pageToken, pageSize, filter, sortColumn, sortDirection) {
            var client, response, apiCall, direction, params, searchParam, searchTerm, filterExpression, filterParam, encodedFilter, orderByParam, encodedFilter, encodedSearchTerm, filterExpression, users, error_11;
            var _a, _b;
            if (pageSize === void 0) { pageSize = 20; }
            if (sortDirection === void 0) { sortDirection = "ascending"; }
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, getGraphClient()];
                    case 1:
                        client = _c.sent();
                        response = void 0;
                        if (!pageToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, client.api(pageToken).get()];
                    case 2:
                        // Use next page token
                        response = _c.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        apiCall = client
                            .api("/users")
                            .select("".concat(USER_BASE_FIELDS, ",managerId"))
                            .top(pageSize)
                            .count(true);
                        // Add sorting if specified and supported
                        if (sortColumn) {
                            // Validate that the sort column is supported by Microsoft Graph API
                            if (!constants_1.SORTABLE_USER_PROPERTIES.includes(sortColumn)) {
                                logError("useGraphAPIs", "Sort property '".concat(sortColumn, "' is not supported by Microsoft Graph API for User objects. Skipping server-side sorting."), new Error("Unsupported sort property: ".concat(sortColumn)), m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                                    sortColumn: sortColumn,
                                    operation: "getUsers_validateSortColumn",
                                }));
                            }
                            else {
                                direction = sortDirection === "descending" ? "desc" : "asc";
                                apiCall = apiCall.orderby("".concat(sortColumn, " ").concat(direction));
                            }
                        }
                        if (filter) {
                            apiCall = apiCall.header("ConsistencyLevel", "eventual");
                            // Parse and apply filter
                            if (filter.includes("$")) {
                                params = new URLSearchParams(filter.startsWith("?") ? filter.slice(1) : filter);
                                searchParam = params.get("$search");
                                if (searchParam) {
                                    searchTerm = searchParam.replace(/^"|"$/g, "");
                                    if (searchTerm.includes(":")) {
                                        apiCall = apiCall.search("\"".concat(searchTerm, "\""));
                                    }
                                    else {
                                        filterExpression = "startswith(displayName,'".concat(searchTerm, "') or startswith(mail,'").concat(searchTerm, "') or contains(displayName,'").concat(searchTerm, "')");
                                        apiCall = apiCall.filter(filterExpression);
                                    }
                                }
                                filterParam = params.get("$filter");
                                if (filterParam) {
                                    encodedFilter = encodeURIComponent(filterParam);
                                    apiCall = apiCall.filter(encodedFilter);
                                }
                                orderByParam = params.get("$orderby");
                                if (orderByParam) {
                                    apiCall = apiCall.orderby(orderByParam);
                                }
                            }
                            else if (filter.includes(" eq ") ||
                                filter.includes("contains(") ||
                                filter.includes("startswith(")) {
                                encodedFilter = encodeURIComponent(filter);
                                apiCall = apiCall.filter(encodedFilter);
                            }
                            else {
                                encodedSearchTerm = encodeURIComponent(filter);
                                filterExpression = "startswith(displayName,'".concat(encodedSearchTerm, "') or contains(displayName,'").concat(encodedSearchTerm, "') or startswith(mail,'").concat(encodedSearchTerm, "')");
                                apiCall = apiCall.filter(filterExpression);
                            }
                        }
                        return [4 /*yield*/, apiCall.get()];
                    case 4:
                        response = _c.sent();
                        _c.label = 5;
                    case 5:
                        users = ((_b = (_a = response === null || response === void 0 ? void 0 : response.value) === null || _a === void 0 ? void 0 : _a.filter(function (user) { return !user["@removed"]; })) === null || _b === void 0 ? void 0 : _b.map(function (user) { return ({
                            id: user.id || "",
                            displayName: user.displayName || "",
                            mail: user.mail || user.userPrincipalName || "",
                            userPrincipalName: user.userPrincipalName || "",
                            jobTitle: user.jobTitle,
                            department: user.department,
                            officeLocation: user.officeLocation,
                            businessPhones: user.businessPhones,
                            mobilePhone: user.mobilePhone,
                            companyName: user.companyName,
                            employeeId: user.employeeId,
                            managerId: user.managerId,
                            aboutMe: undefined,
                            skills: undefined,
                            photoUrl: undefined,
                            userType: user.userType || "",
                        }); })) || [];
                        return [2 /*return*/, {
                                users: users,
                                hasMore: Boolean(response === null || response === void 0 ? void 0 : response["@odata.nextLink"]),
                                nextPageToken: response === null || response === void 0 ? void 0 : response["@odata.nextLink"],
                                totalCount: response === null || response === void 0 ? void 0 : response["@odata.count"],
                            }];
                    case 6:
                        error_11 = _c.sent();
                        throw handleGraphError(error_11, "getUsers", {
                            pageToken: pageToken ? "present" : "undefined",
                            pageSize: pageSize,
                            filter: filter ? filter.substring(0, 100) : "undefined",
                        });
                    case 7: return [2 /*return*/];
                }
            });
        });
    }, [context]);
    // Early return with error functions if context is not available
    if (!context) {
        var errorFn = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                throw new Error("Context not available");
            });
        }); };
        return {
            getUserProfile: errorFn,
            getUserManager: errorFn,
            getAllManagers: errorFn,
            getUserDirectReports: errorFn,
            getUserPeers: errorFn,
            getUserPhoto: errorFn,
            searchUsers: errorFn,
            hasDirectReports: errorFn,
            getTotalDirectReports: errorFn,
            getUsers: errorFn,
        };
    }
    return {
        getUserProfile: getUserProfile,
        getUserManager: getUserManager,
        getAllManagers: getAllManagers,
        getUserDirectReports: getUserDirectReports,
        getUserPeers: getUserPeers,
        getUserPhoto: getUserPhoto,
        searchUsers: searchUsers,
        hasDirectReports: hasDirectReports,
        getTotalDirectReports: getTotalDirectReports,
        getUsers: getUsers,
    };
};
exports.useGraphAPIs = useGraphAPIs;
//# sourceMappingURL=useGraphAPIs.js.map