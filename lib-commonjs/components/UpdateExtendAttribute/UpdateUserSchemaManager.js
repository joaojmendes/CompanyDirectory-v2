"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchemaManager = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var react_icons_1 = require("@fluentui/react-icons");
var UpdateUserSchema_1 = require("./UpdateUserSchema");
var UpdateUserSchemaManager = function (_a) {
    var context = _a.context, _b = _a.buttonText, buttonText = _b === void 0 ? "Update User Properties" : _b, _c = _a.drawerTitle, drawerTitle = _c === void 0 ? "Update User Schema Properties" : _c, className = _a.className;
    var _d = React.useState(false), isDrawerOpen = _d[0], setIsDrawerOpen = _d[1];
    var handleOpenDrawer = React.useCallback(function () {
        setIsDrawerOpen(true);
    }, []);
    var handleCloseDrawer = React.useCallback(function () {
        setIsDrawerOpen(false);
    }, []);
    var handleSuccess = React.useCallback(function (_userId, _data) {
        // Schema update succeeded
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: className, children: [(0, jsx_runtime_1.jsx)(react_components_1.Button, { appearance: "primary", icon: (0, jsx_runtime_1.jsx)(react_icons_1.Edit24Regular, {}), onClick: handleOpenDrawer, children: buttonText }), (0, jsx_runtime_1.jsxs)(react_components_1.OverlayDrawer, { open: isDrawerOpen, onOpenChange: function (_, _a) {
                    var open = _a.open;
                    return setIsDrawerOpen(open);
                }, position: "end", size: "large", children: [(0, jsx_runtime_1.jsx)(react_components_1.DrawerHeader, { children: (0, jsx_runtime_1.jsx)(react_components_1.DrawerHeaderTitle, { action: (0, jsx_runtime_1.jsx)(react_components_1.Button, { appearance: "subtle", "aria-label": "Close drawer", icon: (0, jsx_runtime_1.jsx)(react_icons_1.Dismiss24Regular, {}), onClick: handleCloseDrawer }), children: drawerTitle }) }), (0, jsx_runtime_1.jsx)(react_components_1.DrawerBody, { children: (0, jsx_runtime_1.jsx)(UpdateUserSchema_1.UpdateUserSchema, { context: context, onClose: handleCloseDrawer, onSuccess: handleSuccess }) })] })] }));
};
exports.UpdateUserSchemaManager = UpdateUserSchemaManager;
//# sourceMappingURL=UpdateUserSchemaManager.js.map