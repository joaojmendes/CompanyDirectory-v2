"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAccessToken = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
/**
 * Hook for getting Azure AD access tokens in SPFx
 *
 * @example
 * ```typescript
 * const { getAccessToken } = useAccessToken({ context });
 *
 * // Get current user's token (Microsoft Graph)
 * const token = await getAccessToken();
 *
 * // Get token for a specific resource (if needed)
 * const customToken = await getAccessTokenForResource("https://my-api.azurewebsites.net");
 * ```
 */
var useAccessToken = function (_a) {
    var context = _a.context;
    /**
     * Get the AAD Token Provider
     */
    var getTokenProvider = React.useCallback(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!context) {
                        throw new Error("SPFx context is not available");
                    }
                    if (!context.aadTokenProviderFactory) {
                        throw new Error("AAD Token Provider Factory is not available in the context");
                    }
                    return [4 /*yield*/, context.aadTokenProviderFactory.getTokenProvider()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, [context]);
    /**
     * Get the current user's access token (Microsoft Graph by default)
     */
    var getAccessToken = React.useCallback(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var tokenProvider, token;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTokenProvider()];
                case 1:
                    tokenProvider = _a.sent();
                    return [4 /*yield*/, tokenProvider.getToken("https://graph.microsoft.com")];
                case 2:
                    token = _a.sent();
                    if (!token) {
                        throw new Error("Failed to get access token");
                    }
                    return [2 /*return*/, token];
            }
        });
    }); }, [getTokenProvider]);
    /**
     * Get an access token for a specific resource
     */
    var getAccessTokenForResource = React.useCallback(function (resource) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var tokenProvider, token;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!resource) {
                        throw new Error("Resource URL is required");
                    }
                    return [4 /*yield*/, getTokenProvider()];
                case 1:
                    tokenProvider = _a.sent();
                    return [4 /*yield*/, tokenProvider.getToken(resource)];
                case 2:
                    token = _a.sent();
                    if (!token) {
                        throw new Error("Failed to get access token for resource: ".concat(resource));
                    }
                    return [2 /*return*/, token];
            }
        });
    }); }, [getTokenProvider]);
    return {
        getAccessToken: getAccessToken,
        getAccessTokenForResource: getAccessTokenForResource,
        getTokenProvider: getTokenProvider,
    };
};
exports.useAccessToken = useAccessToken;
//# sourceMappingURL=useAccessToken.js.map