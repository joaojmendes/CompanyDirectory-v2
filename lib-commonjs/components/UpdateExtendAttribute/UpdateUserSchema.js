"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var react_icons_1 = require("@fluentui/react-icons");
var UserPicker_1 = require("../UserPicker/UserPicker");
var useSchemaExtensionUpdate_1 = require("../../hooks/useSchemaExtensionUpdate");
var useUpdateUserSchemaStyles_1 = require("./useUpdateUserSchemaStyles");
var UpdateUserSchema = function (_a) {
    var context = _a.context, onClose = _a.onClose, onSuccess = _a.onSuccess, className = _a.className;
    var styles = useUpdateUserSchemaStyles_1.useUpdateUserSchemaStyles;
    var _b = (0, useSchemaExtensionUpdate_1.useSchemaExtensionUpdate)({ context: context }), getUserSchemaExtension = _b.getUserSchemaExtension, updateUserSchemaExtension = _b.updateUserSchemaExtension, isLoading = _b.isLoading, error = _b.error;
    // State management
    var _c = React.useState(undefined), selectedUser = _c[0], setSelectedUser = _c[1];
    var _d = React.useState({
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
    }), formData = _d[0], setFormData = _d[1];
    var _e = React.useState(""), successMessage = _e[0], setSuccessMessage = _e[1];
    var _f = React.useState(false), isLoadingUserData = _f[0], setIsLoadingUserData = _f[1];
    var _g = React.useState(false), hasLoadedUserData = _g[0], setHasLoadedUserData = _g[1];
    // Load user data when a user is selected
    React.useEffect(function () {
        var isCancelled = false;
        var loadUserData = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var userData, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Loading user data for:", {
                            userId: selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.id,
                            displayName: selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.displayName
                        });
                        if (!(selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.id)) {
                            console.log("No user selected, skipping data load");
                            setHasLoadedUserData(false);
                            return [2 /*return*/];
                        }
                        setIsLoadingUserData(true);
                        setSuccessMessage(""); // Clear any previous success message
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        console.log("Fetching schema extension data for user:", selectedUser.id);
                        return [4 /*yield*/, getUserSchemaExtension(selectedUser.id)];
                    case 2:
                        userData = _a.sent();
                        console.log("Received user data:", userData);
                        if (!isCancelled && userData) {
                            setFormData(userData);
                        }
                        if (!isCancelled) {
                            setHasLoadedUserData(true);
                            console.log("User data loaded successfully");
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error loading user schema data:", error_1);
                        if (!isCancelled) {
                            setHasLoadedUserData(true);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        if (!isCancelled) {
                            setIsLoadingUserData(false);
                        }
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        loadUserData().catch(console.error);
        // Cleanup function to prevent state updates on unmounted component
        return function () {
            isCancelled = true;
        };
    }, [selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.id]); // Only depend on the user ID, not the function
    // Handle user selection
    var handleUserSelection = React.useCallback(function (users) {
        var user = users.length > 0 ? users[0] : undefined;
        console.log("User selection changed:", {
            selectedUsers: users,
            selectedUser: user,
            userId: user === null || user === void 0 ? void 0 : user.id,
            displayName: user === null || user === void 0 ? void 0 : user.displayName
        });
        setSelectedUser(user);
        setSuccessMessage("");
        if (!user) {
            setHasLoadedUserData(false);
            setFormData({
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
            });
        }
    }, []);
    // Handle form input changes
    var handleInputChange = React.useCallback(function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
        setSuccessMessage(""); // Clear success message when user starts editing
    }, []);
    // Handle form submission
    var handleSubmit = React.useCallback(function (event) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    event.stopPropagation();
                    console.log("Form submit triggered. Current state:", {
                        selectedUser: selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.displayName,
                        selectedUserId: selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.id,
                        hasLoadedUserData: hasLoadedUserData,
                        isLoading: isLoading,
                        isLoadingUserData: isLoadingUserData
                    });
                    // Clear any previous messages
                    setSuccessMessage("");
                    // Validate that a user is selected
                    if (!(selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.id)) {
                        console.error("No user selected for update");
                        return [2 /*return*/];
                    }
                    // Validate that user data has been loaded
                    if (!hasLoadedUserData) {
                        console.error("User data not loaded yet");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.log("Updating user schema for:", selectedUser.displayName, "with data:", formData);
                    return [4 /*yield*/, updateUserSchemaExtension(selectedUser.id, formData)];
                case 2:
                    _a.sent();
                    setSuccessMessage("Successfully updated schema properties for ".concat(selectedUser.displayName));
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(selectedUser.id, formData);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error updating user schema:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [selectedUser, formData, updateUserSchemaExtension, onSuccess, hasLoadedUserData]);
    // Handle reset form
    var handleReset = React.useCallback(function () {
        if (selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.id) {
            // Reload the original data
            setIsLoadingUserData(true);
            getUserSchemaExtension(selectedUser.id)
                .then(function (userData) {
                if (userData) {
                    setFormData(userData);
                }
            })
                .catch(console.error)
                .finally(function () {
                setIsLoadingUserData(false);
            });
        }
        else {
            setFormData({
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
            });
        }
        setSuccessMessage("");
    }, [selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.id, getUserSchemaExtension]);
    // Skill input fields
    var renderSkillsSection = function () { return (React.createElement("div", { className: styles.sectionGroup },
        React.createElement(react_components_1.Text, { className: styles.sectionTitle }, "Skills"),
        React.createElement("div", { className: styles.inputGroup }, [1, 2, 3, 4, 5].map(function (num) { return (React.createElement(react_components_1.Field, { key: "skill-".concat(num), label: "Skill ".concat(num) },
            React.createElement(react_components_1.Input, { value: formData["skillsline".concat(num)] || "", onChange: function (_, data) { return handleInputChange("skillsline".concat(num), data.value); }, placeholder: "Enter skill ".concat(num, "..."), disabled: !selectedUser || isLoading || isLoadingUserData }))); })))); };
    // Project input fields
    var renderProjectsSection = function () { return (React.createElement("div", { className: styles.sectionGroup },
        React.createElement(react_components_1.Text, { className: styles.sectionTitle }, "Projects"),
        React.createElement("div", { className: styles.inputGroup }, [1, 2, 3, 4, 5].map(function (num) { return (React.createElement(react_components_1.Field, { key: "project-".concat(num), label: "Project ".concat(num) },
            React.createElement(react_components_1.Input, { value: formData["projectsline".concat(num)] || "", onChange: function (_, data) { return handleInputChange("projectsline".concat(num), data.value); }, placeholder: "Enter project ".concat(num, "..."), disabled: !selectedUser || isLoading || isLoadingUserData }))); })))); };
    // Selected user display
    var renderSelectedUser = function () {
        if (!selectedUser)
            return null;
        return (React.createElement(react_components_1.Card, { className: styles.selectedUserCard },
            React.createElement(react_components_1.Persona, { name: selectedUser.displayName, secondaryText: selectedUser.mail || selectedUser.userPrincipalName, tertiaryText: selectedUser.jobTitle, presence: {
                    status: "available"
                }, avatar: {
                    image: {
                        src: selectedUser.photoUrl || "".concat(context.pageContext.web.absoluteUrl, "//_layouts/15/userphoto.aspx?size=L&username=").concat(selectedUser.userPrincipalName || "")
                    },
                    initials: selectedUser.displayName.split(' ').map(function (n) { return n[0]; }).join('').substring(0, 2).toUpperCase()
                }, size: "extra-large" })));
    };
    if (isLoading || isLoadingUserData) {
        return (React.createElement("div", { className: "".concat(styles.container, " ").concat(className) },
            React.createElement("div", { className: styles.loadingContainer },
                React.createElement(react_components_1.Spinner, { size: "medium" }),
                React.createElement(react_components_1.Text, null, isLoadingUserData ? "Loading user data..." : "Updating user properties..."))));
    }
    return (React.createElement("div", { className: "".concat(styles.container, " ").concat(className) },
        React.createElement("div", { className: styles.header },
            React.createElement(react_components_1.Text, { className: styles.title }, "Update User Schema Properties"),
            React.createElement(react_components_1.Text, { className: styles.subtitle }, "Update custom skills and projects for a user using the extinwbntrw_spUserProfile schema extension")),
        error && (React.createElement(react_components_1.MessageBar, { intent: "error" }, error)),
        successMessage && (React.createElement(react_components_1.MessageBar, { intent: "success" }, successMessage)),
        React.createElement("form", { className: styles.form, onSubmit: handleSubmit, noValidate: true },
            React.createElement("div", { className: styles.userPickerSection },
                React.createElement(react_components_1.Field, { label: "Select User", required: true, validationState: selectedUser ? "success" : undefined, validationMessage: !selectedUser ? "Please select a user" : undefined },
                    React.createElement(UserPicker_1.UserPicker, { context: context, selectedUsers: selectedUser ? [selectedUser] : [], onSelectionChange: handleUserSelection, placeholder: "Search and select a user...", maxSelectedOptions: 1 }))),
            renderSelectedUser(),
            selectedUser && hasLoadedUserData && (React.createElement(React.Fragment, null,
                renderSkillsSection(),
                renderProjectsSection(),
                React.createElement("div", { className: styles.buttonGroup },
                    React.createElement(react_components_1.Button, { appearance: "secondary", icon: React.createElement(react_icons_1.ArrowReset24Regular, null), onClick: handleReset, disabled: isLoading }, "Reset"),
                    onClose && (React.createElement(react_components_1.Button, { appearance: "secondary", icon: React.createElement(react_icons_1.Dismiss24Regular, null), onClick: onClose, disabled: isLoading }, "Close")),
                    React.createElement(react_components_1.Button, { appearance: "primary", icon: React.createElement(react_icons_1.Save24Regular, null), type: "submit", disabled: isLoading || isLoadingUserData || !selectedUser || !hasLoadedUserData }, "Update Properties")))))));
};
exports.UpdateUserSchema = UpdateUserSchema;
//# sourceMappingURL=UpdateUserSchema.js.map