"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPicker = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var react_1 = require("react");
var react_controls_1 = require("@spteck/react-controls");
var useUserPickerStyles_1 = require("./useUserPickerStyles");
var useGraphAPIs_1 = require("../../hooks/useGraphAPIs");
var UserPicker = function (_a) {
    var context = _a.context, _b = _a.selectedUsers, selectedUsers = _b === void 0 ? [] : _b, onSelectionChange = _a.onSelectionChange, _c = _a.placeholder, placeholder = _c === void 0 ? "Search for people..." : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d, maxSelectedOptions = _a.maxSelectedOptions, width = _a.width, className = _a.className;
    var styles = (0, useUserPickerStyles_1.useUserPickerStyles)();
    var _e = (0, useGraphAPIs_1.useGraphAPIs)({ context: context }), searchUsers = _e.searchUsers, getUsers = _e.getUsers;
    var _f = (0, react_1.useState)([]), availableUsers = _f[0], setAvailableUsers = _f[1];
    var _g = (0, react_1.useState)(false), isSearching = _g[0], setIsSearching = _g[1];
    var _h = (0, react_1.useState)(""), searchValue = _h[0], setSearchValue = _h[1];
    // Infinite scroll state
    var _j = (0, react_1.useState)(true), hasMore = _j[0], setHasMore = _j[1];
    var _k = (0, react_1.useState)(false), isLoadingMore = _k[0], setIsLoadingMore = _k[1];
    var _l = (0, react_1.useState)(undefined), nextPageToken = _l[0], setNextPageToken = _l[1];
    var listRef = (0, react_1.useRef)(null);
    // Convert selected users to array of IDs for TagPicker
    var selectedUserIds = selectedUsers.map(function (user) { return user.id; });
    /**
     * Load initial users when component mounts
     */
    (0, react_1.useEffect)(function () {
        var loadInitialUsers = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var result, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setIsSearching(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, getUsers(undefined, 20)];
                    case 2:
                        result = _a.sent();
                        setAvailableUsers(result.users);
                        setHasMore(result.hasMore);
                        setNextPageToken(result.nextPageToken);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error loading initial users:', error_1);
                        setAvailableUsers([]);
                        setHasMore(false);
                        setNextPageToken(undefined);
                        return [3 /*break*/, 5];
                    case 4:
                        setIsSearching(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        loadInitialUsers().catch(console.error);
    }, [getUsers]);
    /**
     * Handle search input changes
     */
    var handleInputChange = (0, react_1.useCallback)(function (value) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result, error_2, results, error_3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSearchValue(value);
                    if (!!value.trim()) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getUsers(undefined, 20)];
                case 2:
                    result = _a.sent();
                    setAvailableUsers(result.users);
                    setHasMore(result.hasMore);
                    setNextPageToken(result.nextPageToken);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error loading users:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
                case 5:
                    setIsSearching(true);
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, 9, 10]);
                    return [4 /*yield*/, searchUsers(value.trim(), 20)];
                case 7:
                    results = _a.sent();
                    setAvailableUsers(results);
                    // For search results, disable infinite scroll for now
                    setHasMore(false);
                    setNextPageToken(undefined);
                    return [3 /*break*/, 10];
                case 8:
                    error_3 = _a.sent();
                    console.error('Error searching users:', error_3);
                    setAvailableUsers([]);
                    setHasMore(false);
                    setNextPageToken(undefined);
                    return [3 /*break*/, 10];
                case 9:
                    setIsSearching(false);
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    }); }, [searchUsers, getUsers]);
    /**
     * Load more users for infinite scroll
     */
    var loadMoreUsers = (0, react_1.useCallback)(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result_1, error_4;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!hasMore || isLoadingMore || !nextPageToken || searchValue.trim()) {
                        return [2 /*return*/];
                    }
                    setIsLoadingMore(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, getUsers(nextPageToken, 20)];
                case 2:
                    result_1 = _a.sent();
                    setAvailableUsers(function (prev) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], prev, true), result_1.users, true); });
                    setHasMore(result_1.hasMore);
                    setNextPageToken(result_1.nextPageToken);
                    return [3 /*break*/, 5];
                case 3:
                    error_4 = _a.sent();
                    console.error('Error loading more users:', error_4);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoadingMore(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [getUsers, hasMore, isLoadingMore, nextPageToken, searchValue]);
    /**
     * Handle scroll event for infinite scroll
     */
    var handleScroll = (0, react_1.useCallback)(function (event) {
        if (!hasMore || isLoadingMore || searchValue.trim()) {
            return;
        }
        var _a = event.currentTarget, scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
        var threshold = 100;
        var isNearBottom = scrollTop + clientHeight >= scrollHeight - threshold;
        if (isNearBottom) {
            loadMoreUsers().catch(console.error);
        }
    }, [hasMore, isLoadingMore, searchValue, loadMoreUsers]);
    /**
     * Handle option selection and dismissal - follows the example pattern
     */
    var onOptionSelect = (0, react_1.useCallback)(function (e, data) {
        if (data.value === "no-options" || data.value === "loading" || data.value === "loading-more") {
            return;
        }
        // Use the selectedOptions from data to update the selection
        var newSelectedUserIds = data.selectedOptions;
        var newSelectedUsers = selectedUsers.filter(function (user) {
            return newSelectedUserIds.includes(user.id);
        });
        // If a new option was selected (not just dismissed), add it
        if (newSelectedUserIds.length > selectedUserIds.length) {
            var newUserId_1 = newSelectedUserIds.find(function (id) { return !selectedUserIds.includes(id); });
            if (newUserId_1) {
                var selectedUser = availableUsers.find(function (user) { return user.id === newUserId_1; });
                if (selectedUser) {
                    // Check max limit
                    if (maxSelectedOptions && selectedUsers.length >= maxSelectedOptions) {
                        return;
                    }
                    newSelectedUsers.push(selectedUser);
                }
            }
            // Clear search input and reset to initial users after selection
            setSearchValue("");
            // Load initial users to reset the list
            getUsers(undefined, 20).then(function (result) {
                setAvailableUsers(result.users);
                setHasMore(result.hasMore);
                setNextPageToken(result.nextPageToken);
            }).catch(console.error);
        }
        onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange(newSelectedUsers);
    }, [availableUsers, selectedUsers, selectedUserIds, onSelectionChange, maxSelectedOptions, getUsers]);
    // Filter available users to exclude already selected ones
    var tagPickerOptions = availableUsers.filter(function (user) { return !selectedUserIds.includes(user.id); });
    return (React.createElement("div", tslib_1.__assign({ className: "".concat(styles.container, " ").concat(className || '') }, (width && { style: { width: width } })),
        React.createElement("div", { className: styles.tagPickerStyles },
            React.createElement(react_components_1.TagPicker, { onOptionSelect: onOptionSelect, selectedOptions: selectedUserIds },
                React.createElement(react_components_1.TagPickerControl, null,
                    React.createElement(react_components_1.TagPickerGroup, { "aria-label": "Selected Users" }, selectedUsers.map(function (user) { return (React.createElement(react_components_1.Tag, { key: user.id, shape: "circular", media: React.createElement(react_controls_1.UserCard, { userId: user.userPrincipalName, avatarSize: 20, context: context, avatarOnly: true }), value: user.id, dismissible: true, disabled: disabled }, user.displayName)); })),
                    React.createElement(react_components_1.TagPickerInput, { "aria-label": "Select Users", placeholder: placeholder, value: searchValue, onChange: function (e) { return handleInputChange(e.target.value); }, disabled: disabled })),
                React.createElement(react_components_1.TagPickerList, { ref: listRef, onScroll: handleScroll, className: styles.pickerList }, isSearching ? (React.createElement(react_components_1.TagPickerOption, { value: "loading" }, "Searching...")) : tagPickerOptions.length > 0 ? (React.createElement(React.Fragment, null,
                    tagPickerOptions.map(function (user) { return (React.createElement(react_components_1.TagPickerOption, { key: user.id, value: user.id, text: user.displayName, media: React.createElement(react_controls_1.UserCard, { userId: user.userPrincipalName, avatarSize: 36, context: context, avatarOnly: true }) },
                        React.createElement("div", { className: styles.optionContent },
                            React.createElement(react_components_1.Text, { weight: "semibold" }, user.displayName),
                            user.jobTitle && (React.createElement(react_components_1.Text, { size: 200, className: styles.optionSecondary }, user.jobTitle))))); }),
                    isLoadingMore && !searchValue.trim() && (React.createElement(react_components_1.TagPickerOption, { value: "loading-more" }, "Loading more...")))) : (React.createElement(react_components_1.TagPickerOption, { value: "no-options" }, searchValue ? "No users found" : "Start typing to search...")))))));
};
exports.UserPicker = UserPicker;
//# sourceMappingURL=UserPicker.js.map