"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridButtons = exports.Elayout = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var react_icons_1 = require("@fluentui/react-icons");
var react_controls_1 = require("@spteck/react-controls");
// Assuming these are the layout options
var Elayout;
(function (Elayout) {
    Elayout["Grid"] = "grid";
    Elayout["List"] = "list";
})(Elayout || (exports.Elayout = Elayout = {}));
/**
 * Component for rendering grid/list layout toggle buttons
 */
exports.GridButtons = React.memo(function (_a) {
    var currentLayout = _a.currentLayout, onLayoutChange = _a.onLayoutChange, className = _a.className;
    var isGridLayout = currentLayout === Elayout.Grid;
    var isListLayout = currentLayout === Elayout.List;
    var handleClick = React.useCallback(function (event) {
        var buttonName = event.currentTarget.name;
        onLayoutChange(buttonName);
    }, [onLayoutChange]);
    return (React.createElement(react_controls_1.StackV2, { background: "transparent", direction: "horizontal", justifyContent: "start", alignItems: "center", columnGap: "5" },
        React.createElement(react_components_1.Tooltip, { content: "Grid layout", relationship: "label" },
            React.createElement(react_components_1.Button, { className: className, name: Elayout.Grid, onClick: handleClick, icon: isGridLayout ? (React.createElement(react_icons_1.Grid20Filled, { color: react_components_1.tokens.colorBrandBackground })) : (React.createElement(react_icons_1.Grid20Regular, null)), appearance: "transparent", "aria-label": "Grid layout" })),
        React.createElement(react_components_1.Tooltip, { content: "List layout", relationship: "label" },
            React.createElement(react_components_1.Button, { className: className, name: Elayout.List, onClick: handleClick, icon: isListLayout ? (React.createElement(react_icons_1.List20Filled, { color: react_components_1.tokens.colorBrandBackground })) : (React.createElement(react_icons_1.List20Regular, null)), appearance: "transparent", "aria-label": "List layout" }))));
});
exports.GridButtons.displayName = 'GridButtons';
//# sourceMappingURL=GridButtons.js.map