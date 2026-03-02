"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaManager = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var react_icons_1 = require("@fluentui/react-icons");
var UpdateUserSchema_1 = require("../UpdateExtendAttribute/UpdateUserSchema");
var SchemaManager = function (_a) {
    var context = _a.context, isOpen = _a.isOpen, onClose = _a.onClose, className = _a.className;
    return (React.createElement(react_components_1.Drawer, { type: "overlay", separator: true, open: isOpen, onOpenChange: function (_, _a) {
            var open = _a.open;
            return !open && onClose();
        }, position: "end", size: "large" },
        React.createElement(react_components_1.DrawerHeader, null,
            React.createElement(react_components_1.DrawerHeaderTitle, { action: React.createElement(react_components_1.Button, { appearance: "subtle", "aria-label": "Close", icon: React.createElement(react_icons_1.Dismiss24Regular, null), onClick: onClose }) }, "User Schema Manager")),
        React.createElement(react_components_1.DrawerBody, null,
            React.createElement(UpdateUserSchema_1.UpdateUserSchema, { context: context, onClose: onClose, onSuccess: function (userId, data) {
                    console.log("Schema updated successfully for user:", userId, data);
                } }))));
};
exports.SchemaManager = SchemaManager;
//# sourceMappingURL=SchemaManager.js.map