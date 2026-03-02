"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_icons_1 = require("@fluentui/react-icons");
var react_components_1 = require("@fluentui/react-components");
var ECardActions_1 = require("../../constants/ECardActions");
var css_1 = require("@emotion/css");
var Actions = function (props) {
    var onActionClick = props.onActionClick, person = props.person;
    var handleMenuItemClick = function (actionKey, event) {
        event.stopPropagation();
        event.preventDefault();
        onActionClick === null || onActionClick === void 0 ? void 0 : onActionClick(actionKey);
    };
    var handleMenuTriggerClick = function (event) {
        event.stopPropagation();
    };
    var MoreIcon = (0, react_icons_1.bundleIcon)(react_icons_1.MoreVertical24Filled, react_icons_1.MoreVertical24Regular);
    var containerStyles = (0, css_1.css)({
        position: "absolute",
        top: 5,
        right: 5,
    });
    var enableAction = React.useMemo(function () { return function (action) {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var user = person;
        if (!person)
            return false;
        switch (action) {
            case ECardActions_1.ECardActions.Call:
            case ECardActions_1.ECardActions.Video:
                return Boolean((_a = user === null || user === void 0 ? void 0 : user.phone) !== null && _a !== void 0 ? _a : user === null || user === void 0 ? void 0 : user.mobilePhone);
            case ECardActions_1.ECardActions.Chat:
                return Boolean(user.mail || user.userPrincipalName);
            case ECardActions_1.ECardActions.Mail:
                return Boolean(user.mail);
            default:
                return false;
        }
    }; }, [person]);
    return (React.createElement("div", { className: containerStyles, onClick: handleMenuTriggerClick },
        React.createElement(react_components_1.Menu, null,
            React.createElement(react_components_1.MenuTrigger, { disableButtonEnhancement: true },
                React.createElement(react_components_1.Tooltip, { content: "actions", relationship: "label" },
                    React.createElement(react_components_1.MenuButton, { appearance: "subtle", icon: React.createElement(MoreIcon, null), onClick: handleMenuTriggerClick, disabled: !enableAction(ECardActions_1.ECardActions.Call) &&
                            !enableAction(ECardActions_1.ECardActions.Video) &&
                            !enableAction(ECardActions_1.ECardActions.Chat) &&
                            !enableAction(ECardActions_1.ECardActions.Mail), size: "small" }))),
            React.createElement(react_components_1.MenuPopover, null,
                React.createElement(react_components_1.MenuList, null,
                    React.createElement(react_components_1.MenuItem, { icon: React.createElement(react_icons_1.ChatRegular, null), onClick: function (ev) { return handleMenuItemClick(ECardActions_1.ECardActions.Chat, ev); }, disabled: !enableAction(ECardActions_1.ECardActions.Chat) }, "Start a chat"),
                    React.createElement(react_components_1.MenuItem, { icon: React.createElement(react_icons_1.MailRegular, null), onClick: function (ev) { return handleMenuItemClick(ECardActions_1.ECardActions.Mail, ev); }, disabled: !enableAction(ECardActions_1.ECardActions.Mail) }, "Send an email"),
                    React.createElement(react_components_1.MenuItem, { icon: React.createElement(react_icons_1.CallRegular, null), onClick: function (ev) { return handleMenuItemClick(ECardActions_1.ECardActions.Call, ev); }, disabled: !enableAction(ECardActions_1.ECardActions.Call) }, "Make a call"),
                    React.createElement(react_components_1.MenuItem, { icon: React.createElement(react_icons_1.ChatVideoRegular, null), onClick: function (ev) { return handleMenuItemClick(ECardActions_1.ECardActions.Video, ev); }, disabled: !enableAction(ECardActions_1.ECardActions.Video) }, "Start a video call"))))));
};
exports.Actions = Actions;
//# sourceMappingURL=Actions.js.map