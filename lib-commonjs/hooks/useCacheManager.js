"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheMonitor = exports.CacheKeys = exports.useCacheManager = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var m365_hooks_1 = require("@spteck/m365-hooks");
/**
 * Advanced cache management hook for Company Directory
 * Provides centralized cache operations and performance monitoring
 */
var useCacheManager = function () {
    // Organization chart data cache with 2 hour expiration
    var orgCache = (0, m365_hooks_1.useIndexedDBCache)(2 * 60 * 60 * 1000);
    /**
     * Clear all application caches
     */
    var clearAllCaches = (0, react_1.useCallback)(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, orgCache.clearAllCache()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('[CacheManager] Error clearing caches:', error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    }); }, [orgCache]);
    return {
        clearAllCaches: clearAllCaches,
        orgCache: {
            getData: orgCache.getData,
            setData: orgCache.setData,
            deleteData: orgCache.deleteData,
            clearAllCache: orgCache.clearAllCache,
        },
    };
};
exports.useCacheManager = useCacheManager;
/**
 * Cache key generation utilities
 */
exports.CacheKeys = {
    /**
     * Generate cache key for user data
     */
    userData: function (userPrincipalName) {
        return "user_".concat(userPrincipalName);
    },
    /**
     * Generate cache key for direct reports
     */
    directReports: function (userPrincipalName, page) {
        return "directReports_".concat(userPrincipalName, "_").concat(page || 'initial');
    },
    /**
     * Generate cache key for peers
     */
    peers: function (userPrincipalName, page) {
        return "peers_".concat(userPrincipalName, "_").concat(page || 'initial');
    },
    /**
     * Generate cache key for managers
     */
    managers: function (userPrincipalName) {
        return "managers_".concat(userPrincipalName);
    },
    /**
     * Generate cache key for search results
     */
    search: function (query, filters) {
        return "search_".concat(query, "_").concat(filters || 'none');
    },
    /**
     * Generate cache key for organization tree
     */
    orgTree: function (rootUserId, depth) {
        if (depth === void 0) { depth = 3; }
        return "orgTree_".concat(rootUserId, "_depth").concat(depth);
    },
};
/**
 * Cache performance monitoring utilities
 */
exports.CacheMonitor = {
    logCacheAccess: function (_operation, _key, _hit) {
        // Performance monitoring - no-op in production
    },
    logCachePerformance: function (_operation, _key, _duration) {
        // Performance monitoring - no-op in production
    },
};
//# sourceMappingURL=useCacheManager.js.map