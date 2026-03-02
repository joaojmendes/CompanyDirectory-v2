"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderNoUsers = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_1 = require("@iconify/react");
var react_components_1 = require("@fluentui/react-components");
var useRenderNoUsersStyles_1 = require("./useRenderNoUsersStyles");
var RenderNoUsers = function (props) {
    var isSearchMode = props.isSearchMode;
    var styles = (0, useRenderNoUsersStyles_1.useRenderNoUsersStyles)().styles;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.emptyContainer },
            React.createElement(react_1.Icon, { className: styles.emptyIcon, icon: "fluent:building-people-24-regular", width: "120", height: "120" }),
            React.createElement(react_components_1.Text, { weight: "semibold", size: 400 }, isSearchMode ? "No users found for your search" : "No users found"))));
};
exports.RenderNoUsers = RenderNoUsers;
//# sourceMappingURL=RenderNoUsers.js.map