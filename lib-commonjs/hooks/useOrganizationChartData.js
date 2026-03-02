"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOrganizationChartData = void 0;
var tslib_1 = require("tslib");
var m365_hooks_1 = require("@spteck/m365-hooks");
var react_1 = require("react");
var useGraphAPIs_1 = require("./useGraphAPIs");
var useUtils_1 = require("./useUtils");
var useOrganizationChartData = function (_a) {
    var context = _a.context;
    // Initialize logging
    if (!context) {
        console.warn("Context not available");
        return {
            userData: undefined,
            organizationTree: undefined,
            isLoading: false,
            error: "Context not available",
            fetchUserData: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            }); }); },
            loadMoreDirectReports: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, ({
                            directReports: [],
                            hasMore: false,
                        })];
                });
            }); },
            loadMorePeers: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, ({
                            peers: [],
                            hasMore: false,
                        })];
                });
            }); },
        };
    }
    var _b = (0, m365_hooks_1.useLogging)(), logError = _b.logError, logInfo = _b.logInfo;
    var sanitizeUserData = (0, useUtils_1.useUtils)().sanitizeUserData;
    // Local state instead of global state
    var _c = (0, react_1.useState)(undefined), userData = _c[0], setUserData = _c[1];
    var _d = (0, react_1.useState)(undefined), organizationTree = _d[0], setOrganizationTree = _d[1];
    var _e = (0, react_1.useState)(false), isLoading = _e[0], setIsLoading = _e[1];
    var _f = (0, react_1.useState)(undefined), error = _f[0], setError = _f[1];
    // Use the Graph API hook
    var _g = (0, useGraphAPIs_1.useGraphAPIs)({ context: context }), getUserProfile = _g.getUserProfile, getUserManager = _g.getUserManager, getAllManagers = _g.getAllManagers, getUserDirectReports = _g.getUserDirectReports, getUserPeers = _g.getUserPeers, getTotalDirectReports = _g.getTotalDirectReports;
    /**
     * Build organization tree structure
     */
    var buildOrganizationTree = (0, react_1.useCallback)(function (user, managers, manager, directReports) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var userNode;
        var _a;
        return tslib_1.__generator(this, function (_b) {
            userNode = {
                id: user.id,
                displayName: user.displayName,
                jobTitle: user.jobTitle,
                department: user.department,
                mail: user.mail,
                userPrincipalName: user.userPrincipalName,
                photoUrl: user.photoUrl,
                location: user.officeLocation,
                skills: user.skills,
                aboutMe: user.aboutMe,
                phone: user.mobilePhone || ((_a = user.businessPhones) === null || _a === void 0 ? void 0 : _a[0]),
                managerId: manager === null || manager === void 0 ? void 0 : manager.id,
                managers: managers,
                level: 0,
                isExpanded: true,
                userType: user.userType,
                hasDirectReports: directReports && directReports > 0 ? true : false,
                totalDirectReports: directReports || 0,
            };
            return [2 /*return*/, userNode];
        });
    }); }, [logError]);
    /**
     * Fetch user data including profile, manager, direct reports, and peers
     * Fetches fresh data from Graph API without caching
     */
    var fetchUserData = (0, react_1.useCallback)(function (targetUserId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var _a, user, manager, allManagers, totalDirectReports, newUserData, orgTree, err_1, errorMessage;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    setIsLoading(true);
                    setError(undefined);
                    logInfo("useOrganizationChartData", "Fetching data from Graph API", sanitizeUserData({
                        operation: "fetchUserData",
                        targetUserId: targetUserId || "current user",
                    }));
                    return [4 /*yield*/, Promise.all([
                            getUserProfile(targetUserId),
                            getUserManager(targetUserId),
                            getAllManagers(targetUserId),
                            getTotalDirectReports(targetUserId),
                        ])];
                case 1:
                    _a = _b.sent(), user = _a[0], manager = _a[1], allManagers = _a[2], totalDirectReports = _a[3];
                    newUserData = {
                        user: user,
                        manager: manager,
                        managers: allManagers,
                        totalDirectReports: totalDirectReports,
                        peers: [],
                    };
                    return [4 /*yield*/, buildOrganizationTree(user, allManagers, manager, totalDirectReports)];
                case 2:
                    orgTree = _b.sent();
                    setUserData(newUserData);
                    setOrganizationTree(orgTree);
                    setIsLoading(false);
                    setError(undefined);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    errorMessage = err_1 instanceof Error ? err_1.message : "An unknown error occurred";
                    setError(errorMessage);
                    setIsLoading(false);
                    logError("useOrganizationChartData", "Error fetching user data", err_1, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                        operation: "fetchUserData",
                        targetUserId: targetUserId || "current user",
                        errorMessage: errorMessage,
                    }));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [
        getUserProfile,
        getUserManager,
        getAllManagers,
        getTotalDirectReports,
        buildOrganizationTree,
        logInfo,
        logError,
    ]);
    /**
     * Load more direct reports with paging support for infinite scroll
     */
    var loadMoreDirectReports = (0, react_1.useCallback)(function (userId, pageSize, nextPageToken) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getUserDirectReports(userId, pageSize, nextPageToken)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    error_1 = _a.sent();
                    logError("useOrganizationChartData", "Error loading more direct reports", error_1, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                        operation: "loadMoreDirectReports",
                        userId: userId,
                        pageSize: pageSize,
                        errorMessage: error_1 === null || error_1 === void 0 ? void 0 : error_1.message,
                    }));
                    return [2 /*return*/, {
                            directReports: [],
                            hasMore: false,
                        }];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [getUserDirectReports, logError]);
    /**
     * Load more peers with paging support for infinite scroll
     */
    var loadMorePeers = (0, react_1.useCallback)(function (userId, pageSize, nextPageToken) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result, error_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getUserPeers(userId, pageSize, nextPageToken)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    error_2 = _a.sent();
                    logError("useOrganizationChartData", "Error loading more peers", error_2, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                        operation: "loadMorePeers",
                        userId: userId,
                        pageSize: pageSize,
                        errorMessage: error_2 === null || error_2 === void 0 ? void 0 : error_2.message,
                    }));
                    return [2 /*return*/, {
                            peers: [],
                            hasMore: false,
                        }];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [getUserPeers, logError]);
    return {
        userData: userData,
        organizationTree: organizationTree,
        isLoading: isLoading,
        error: error,
        fetchUserData: fetchUserData,
        loadMoreDirectReports: loadMoreDirectReports,
        loadMorePeers: loadMorePeers,
    };
};
exports.useOrganizationChartData = useOrganizationChartData;
//# sourceMappingURL=useOrganizationChartData.js.map