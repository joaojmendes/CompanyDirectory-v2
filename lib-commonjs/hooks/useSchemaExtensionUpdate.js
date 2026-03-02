"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSchemaExtensionUpdate = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var m365_hooks_1 = require("@spteck/m365-hooks");
var useUtils_1 = require("./useUtils");
var SCHEMA_EXTENSION_ID = "extinwbntrw_spUserProfile";
var useSchemaExtensionUpdate = function (_a) {
    var context = _a.context;
    var logError = (0, m365_hooks_1.useLogging)().logError;
    var sanitizeUserData = (0, useUtils_1.useUtils)().sanitizeUserData;
    var _b = React.useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = React.useState(undefined), error = _c[0], setError = _c[1];
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
        logError("useSchemaExtensionUpdate", "Error in ".concat(operation), graphError, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData(tslib_1.__assign({ operation: operation, errorCode: graphError.code, statusCode: graphError.status }, additionalContext)));
        // Create user-friendly error message
        var errorMessage = "Failed to ".concat(operation.toLowerCase().replace(/([A-Z])/g, ' $1'));
        if (graphError.code === "Forbidden" || graphError.status === 403) {
            errorMessage = "You don't have permission to perform this operation";
        }
        else if (graphError.code === "NotFound" || graphError.status === 404) {
            errorMessage = "User not found";
        }
        else if (graphError.code === "BadRequest" || graphError.status === 400) {
            errorMessage = "Invalid request. Please check the data provided";
        }
        else if (graphError.code === "TooManyRequests" || graphError.status === 429) {
            errorMessage = "Too many requests. Please try again later";
        }
        return new Error(errorMessage);
    }, [logError, sanitizeUserData]);
    /**
     * Get user's schema extension data
     */
    var getUserSchemaExtension = React.useCallback(function (userId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var client, response, extensionData, error_1, graphError, handledError;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(userId === null || userId === void 0 ? void 0 : userId.trim())) {
                        throw new Error("User ID is required");
                    }
                    setIsLoading(true);
                    setError(undefined);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, getGraphClient()];
                case 2:
                    client = _a.sent();
                    return [4 /*yield*/, client
                            .api("/users/".concat(userId))
                            .select("".concat(SCHEMA_EXTENSION_ID))
                            .get()];
                case 3:
                    response = _a.sent();
                    extensionData = response[SCHEMA_EXTENSION_ID];
                    if (!extensionData) {
                        return [2 /*return*/, {
                                skillsline1: "",
                                skillsline2: "",
                                skillsline3: "",
                                skillsline4: "",
                                skillsline5: "",
                                projectsline1: "",
                                projectsline2: "",
                                projectsline3: "",
                                projectsline4: "",
                                projectsline5: "",
                            }];
                    }
                    return [2 /*return*/, {
                            skillsline1: extensionData.skillsline1 || "",
                            skillsline2: extensionData.skillsline2 || "",
                            skillsline3: extensionData.skillsline3 || "",
                            skillsline4: extensionData.skillsline4 || "",
                            skillsline5: extensionData.skillsline5 || "",
                            projectsline1: extensionData.projectsline1 || "",
                            projectsline2: extensionData.projectsline2 || "",
                            projectsline3: extensionData.projectsline3 || "",
                            projectsline4: extensionData.projectsline4 || "",
                            projectsline5: extensionData.projectsline5 || "",
                        }];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error fetching user schema extension:", error_1);
                    graphError = error_1;
                    // Handle specific Graph API errors without causing loops
                    if (graphError.code === "Request_ResourceNotFound" || graphError.status === 404) {
                        // User doesn't have extension data - return empty data
                        return [2 /*return*/, {
                                skillsline1: "",
                                skillsline2: "",
                                skillsline3: "",
                                skillsline4: "",
                                skillsline5: "",
                                projectsline1: "",
                                projectsline2: "",
                                projectsline3: "",
                                projectsline4: "",
                                projectsline5: "",
                            }];
                    }
                    handledError = handleGraphError(error_1, "getUserSchemaExtension", { userId: userId });
                    setError(handledError.message);
                    throw handledError;
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [getGraphClient]);
    /**
     * Update user's schema extension data
     */
    var updateUserSchemaExtension = React.useCallback(function (userId, data) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var client, updatePayload, error_2, handledError;
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(userId === null || userId === void 0 ? void 0 : userId.trim())) {
                        throw new Error("User ID is required");
                    }
                    setIsLoading(true);
                    setError(undefined);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, getGraphClient()];
                case 2:
                    client = _b.sent();
                    updatePayload = (_a = {},
                        _a[SCHEMA_EXTENSION_ID] = {
                            skillsline1: data.skillsline1 || null,
                            skillsline2: data.skillsline2 || null,
                            skillsline3: data.skillsline3 || null,
                            skillsline4: data.skillsline4 || null,
                            skillsline5: data.skillsline5 || null,
                            projectsline1: data.projectsline1 || null,
                            projectsline2: data.projectsline2 || null,
                            projectsline3: data.projectsline3 || null,
                            projectsline4: data.projectsline4 || null,
                            projectsline5: data.projectsline5 || null,
                        },
                        _a);
                    return [4 /*yield*/, client
                            .api("/users/".concat(userId))
                            .patch(updatePayload)];
                case 3:
                    _b.sent();
                    return [2 /*return*/, true];
                case 4:
                    error_2 = _b.sent();
                    console.error("Error updating user schema extension:", error_2);
                    handledError = handleGraphError(error_2, "updateUserSchemaExtension", {
                        userId: userId,
                        dataKeys: Object.keys(data)
                    });
                    setError(handledError.message);
                    throw handledError;
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [getGraphClient]);
    return {
        getUserSchemaExtension: getUserSchemaExtension,
        updateUserSchemaExtension: updateUserSchemaExtension,
        isLoading: isLoading,
        error: error,
    };
};
exports.useSchemaExtensionUpdate = useSchemaExtensionUpdate;
//# sourceMappingURL=useSchemaExtensionUpdate.js.map