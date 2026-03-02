"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonToolBar = void 0;
var tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var react_icons_1 = require("@fluentui/react-icons");
var appGlobalState_1 = require("../../atoms/appGlobalState");
var css_1 = require("@emotion/css");
var jotai_1 = require("jotai");
var useStyles = function () {
    return {
        container: (0, css_1.css)({
            display: "flex",
            flexWrap: "nowrap",
            minWidth: 0,
            overflow: "hidden",
            gap: 10,
            marginBottom: 20,
            width: "100%",
        }),
        text1LineStyle: (0, css_1.css)({
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textAlign: "start",
            textOverflow: "ellipsis",
            wordBreak: "break-word",
        }),
        button: (0, css_1.css)({
            cursor: "pointer",
            minWidth: 107,
        }),
    };
};
var ButtonToolBar = function (props) {
    var onSelectedItem = props.onSelectedItem, items = props.items, selectedItemId = props.selectedItemId;
    var styles = useStyles();
    var onItemSelect = React.useCallback(function (itemId) {
        if (onSelectedItem) {
            onSelectedItem(itemId);
        }
    }, [onSelectedItem]);
    return (React.createElement(react_components_1.Overflow, null,
        React.createElement("div", { className: (0, react_components_1.mergeClasses)(styles.container) },
            items.map(function (item) { return (React.createElement(react_components_1.OverflowItem, { key: item.id, id: item.id, priority: item.id === selectedItemId ? 2 : 1 },
                React.createElement(react_components_1.Button, { className: styles.button, shape: "circular", appearance: item.id === selectedItemId ? "primary" : "secondary", onClick: function () { return onItemSelect(item.id); }, icon: item.icon },
                    React.createElement("span", { className: styles.text1LineStyle },
                        " ",
                        item.name)))); }),
            React.createElement(OverflowMenu, { items: items, onSelectedItem: onSelectedItem }))));
};
exports.ButtonToolBar = ButtonToolBar;
var OverflowMenuItem = function (props) {
    var item = props.item, onSelectedItem = props.onSelectedItem;
    var isVisible = (0, react_components_1.useIsOverflowItemVisible)(item.id);
    if (isVisible) {
        return null;
    }
    return (React.createElement(react_components_1.MenuItem, { key: item.id, icon: item.icon, onClick: function () { return onSelectedItem(item.id); } },
        React.createElement("div", null, item.name)));
};
var OverflowMenu = function (_a) {
    var items = _a.items, onSelectedItem = _a.onSelectedItem;
    var _b = (0, react_components_1.useOverflowMenu)(), ref = _b.ref, overflowCount = _b.overflowCount, isOverflowing = _b.isOverflowing;
    var MoreHorizontal = React.useMemo(function () { return (0, react_icons_1.bundleIcon)(react_icons_1.MoreHorizontalFilled, react_icons_1.MoreHorizontalRegular); }, []);
    var appGlobalState = (0, jotai_1.useAtomValue)(appGlobalState_1.appGlobalStateAtom);
    var theme = appGlobalState.theme;
    if (!isOverflowing) {
        return null;
    }
    return (React.createElement(react_components_1.IdPrefixProvider, { value: "menu-over-" },
        React.createElement(react_components_1.FluentProvider, { theme: theme },
            React.createElement(react_components_1.Menu, null,
                React.createElement(react_components_1.MenuTrigger, { disableButtonEnhancement: true },
                    React.createElement(react_components_1.MenuButton, { appearance: "transparent", ref: ref, icon: React.createElement(MoreHorizontal, null), "aria-label": "".concat(overflowCount, " more option"), role: "button" })),
                React.createElement(react_components_1.MenuPopover, null,
                    React.createElement(react_components_1.MenuList, null, items.map(function (item) {
                        return React.createElement(OverflowMenuItem, { key: item.id, item: item, onSelectedItem: onSelectedItem });
                    })))))));
};
//# sourceMappingURL=ButtonToolbar.js.map