"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationChart = void 0;
var tslib_1 = require("tslib");
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-floating-promises */
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var m365_hooks_1 = require("@spteck/m365-hooks");
var react_controls_1 = require("@spteck/react-controls");
var RenderDirectReports_1 = require("../RenderDirectReports");
var RenderManagers_1 = require("../RenderManagers");
var RenderSelectedUser_1 = require("../RenderSelectedUser");
var UserPicker_1 = require("../UserPicker");
var appGlobalState_1 = require("../../atoms/appGlobalState");
var jotai_1 = require("jotai");
var hooks_1 = require("../../hooks");
var useOrganizationChartStyles_1 = require("./useOrganizationChartStyles");
var useUtils_1 = require("../../hooks/useUtils");
var OrganizationChart = function (props) {
    var _a = (0, jotai_1.useAtom)(appGlobalState_1.appGlobalStateAtom), appGlobalstate = _a[0], setAppGlobalState = _a[1];
    var styles = (0, useOrganizationChartStyles_1.useOrganizationChartStyles)(appGlobalstate);
    var selectedUser = appGlobalstate.selectedUser, context = appGlobalstate.context, aadUserId = appGlobalstate.aadUserId;
    var _b = (0, m365_hooks_1.useLogging)(), logInfo = _b.logInfo, logError = _b.logError;
    var _c = React.useState([]), selectedPickerUsers = _c[0], setSelectedPickerUsers = _c[1];
    var sanitizeUserData = (0, useUtils_1.useUtils)().sanitizeUserData;
    var _d = (0, hooks_1.useOrganizationChartData)({ context: context }), organizationTree = _d.organizationTree, isLoading = _d.isLoading, error = _d.error, fetchUserData = _d.fetchUserData;
    var handleSelectionChange = React.useCallback(function (users) {
        setSelectedPickerUsers(users);
        // If a user is selected, fetch their organization chart data
        if (users.length > 0) {
            var selectedUser_1 = users[users.length - 1]; // Get the most recently selected user
            logInfo("OrganizationChart", "Fetching organization data for selected user", sanitizeUserData({
                operation: "handleSelectionChange",
                userId: selectedUser_1.id,
                displayName: selectedUser_1.displayName,
                selectedUsersCount: users.length,
            }));
            // Update global state with the selected user
            setAppGlobalState(function (prevState) { return (tslib_1.__assign(tslib_1.__assign({}, prevState), { selectedUser: selectedUser_1 })); });
            // Fetch organization chart data for the selected user
            fetchUserData(selectedUser_1.id).catch(function (error) {
                logError("OrganizationChart", "Error fetching organization data for selected user", error, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                    operation: "fetchUserData",
                    userId: selectedUser_1.id,
                    displayName: selectedUser_1.displayName,
                    errorMessage: error === null || error === void 0 ? void 0 : error.message,
                }));
            });
        }
        else {
            // No users selected, clear the global state and fetch current user data
            logInfo("OrganizationChart", "Selection cleared, fetching data for current user", sanitizeUserData({
                operation: "handleSelectionChange",
                action: "clearSelection",
                aadUserId: aadUserId,
            }));
            setAppGlobalState(function (prevState) { return (tslib_1.__assign(tslib_1.__assign({}, prevState), { selectedUser: undefined })); });
            // Fetch the current user's organization chart data
            fetchUserData(aadUserId).catch(function (error) {
                logError("OrganizationChart", "Error fetching organization data for current user", error, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                    operation: "fetchUserData",
                    userId: aadUserId,
                    action: "fetchCurrentUser",
                    errorMessage: error === null || error === void 0 ? void 0 : error.message,
                }));
            });
        }
        logInfo("OrganizationChart", "Selected users changed", sanitizeUserData({
            operation: "handleSelectionChange",
            selectedUsersCount: users.length,
            userIds: users.map(function (u) { return u.id; }),
        }));
    }, [fetchUserData, setAppGlobalState, aadUserId]);
    React.useEffect(function () {
        (function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setAppGlobalState(function (prevState) { return (tslib_1.__assign(tslib_1.__assign({}, prevState), { selectedUser: undefined, organizationTree: undefined })); });
                        logInfo("OrganizationChart", "Component mounted, fetching data for current user", sanitizeUserData({
                            operation: "componentDidMount",
                            aadUserId: aadUserId,
                        }));
                        return [4 /*yield*/, fetchUserData(aadUserId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    React.useEffect(function () {
        (function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!selectedUser) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetchUserData(selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.id)];
                    case 1:
                        _b.sent();
                        // check if selected user is equal of searchUser
                        if ((selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.id) !== ((_a = selectedPickerUsers[0]) === null || _a === void 0 ? void 0 : _a.id)) {
                            setSelectedPickerUsers([]);
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); })();
    }, [selectedUser]);
    // update Global State
    React.useEffect(function () {
        setAppGlobalState(function (prevState) { return (tslib_1.__assign(tslib_1.__assign({}, prevState), { organizationTree: organizationTree, selectedUser: undefined })); });
    }, [organizationTree]);
    if (isLoading) {
        return (React.createElement(react_controls_1.StackV2, { justifyContent: "center", alignItems: "center", className: styles.loadingContainer, style: { minHeight: "700px" } },
            React.createElement(react_components_1.Spinner, null)));
    }
    if (error) {
        return React.createElement(react_controls_1.ShowError, { message: error });
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(react_controls_1.StackV2, { width: "100%", "data-id": "conatiner-org", style: { minHeight: "700px" } },
            React.createElement(react_controls_1.StackV2, { direction: "horizontal", justifyContent: "end", paddingBottom: "35px", paddingLeft: "15px", paddingRight: "15px" },
                React.createElement(UserPicker_1.UserPicker, { width: "400px", context: context, selectedUsers: selectedPickerUsers, onSelectionChange: handleSelectionChange, placeholder: "Type to search for employee...", maxSelectedOptions: 1 })),
            React.createElement(react_controls_1.StackV2, { padding: "medium", justifyContent: "center", alignItems: "center", width: "100%" },
                React.createElement(RenderManagers_1.RenderManagers, null),
                React.createElement(RenderSelectedUser_1.RenderSelectedUser, null)),
            React.createElement(react_components_1.Divider, { className: styles.divider }),
            React.createElement(RenderDirectReports_1.RenderDirectReports, null))));
};
exports.OrganizationChart = OrganizationChart;
//# sourceMappingURL=OrganizationChart.js.map