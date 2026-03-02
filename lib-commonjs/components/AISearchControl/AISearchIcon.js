"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AISearchIcon = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("@emotion/react");
var react_icons_1 = require("@fluentui/react-icons");
var react_components_1 = require("@fluentui/react-components");
// Emotion CSS styles
var containerStyle = (0, react_1.css)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: relative;\n  display: inline-block;\n  line-height: 0;\n \n"], ["\n  position: relative;\n  display: inline-block;\n  line-height: 0;\n \n"])));
var searchIconStyle = (0, react_1.css)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  display: block;\n"], ["\n  display: block;\n"])));
// Simple AI text badge overlay - Theme aware using only tokens
var aiBadgeStyle = (0, react_1.css)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  top: -1px;\n  right: -6px;\n  font-size: 8px;\n  font-weight: 700;\n  font-family: ", ";\n  color: ", ";\n  background: ", ";\n  padding: 1px 3px;\n  border-radius: ", ";\n  line-height: 1;\n  letter-spacing: 0.2px;\n  text-transform: uppercase;\n  box-shadow: ", ";\n  border: 1px solid ", ";\n  transform: scale(0.9);\n  transition: all 0.2s ease;\n\n  &:hover {\n    transform: scale(1);\n    box-shadow: ", ";\n    background: ", ";\n  }\n"], ["\n  position: absolute;\n  top: -1px;\n  right: -6px;\n  font-size: 8px;\n  font-weight: 700;\n  font-family: ", ";\n  color: ", ";\n  background: ", ";\n  padding: 1px 3px;\n  border-radius: ", ";\n  line-height: 1;\n  letter-spacing: 0.2px;\n  text-transform: uppercase;\n  box-shadow: ", ";\n  border: 1px solid ", ";\n  transform: scale(0.9);\n  transition: all 0.2s ease;\n\n  &:hover {\n    transform: scale(1);\n    box-shadow: ", ";\n    background: ", ";\n  }\n"])), react_components_1.tokens.fontFamilyBase, react_components_1.tokens.colorNeutralForegroundOnBrand, react_components_1.tokens.colorBrandBackground, react_components_1.tokens.borderRadiusSmall, react_components_1.tokens.shadow4, react_components_1.tokens.colorTransparentStroke, react_components_1.tokens.shadow8, react_components_1.tokens.colorBrandBackgroundHover);
var aiBadgeLargeStyle = (0, react_1.css)(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  ", ";\n  font-size: 9px;\n  padding: 2px 4px;\n  border-radius: 8px;\n  top: -2px;\n  right: -7px;\n"], ["\n  ", ";\n  font-size: 9px;\n  padding: 2px 4px;\n  border-radius: 8px;\n  top: -2px;\n  right: -7px;\n"])), aiBadgeStyle);
var aiBadgeSmallStyle = (0, react_1.css)(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  ", ";\n  font-size: 6px;\n  padding: 1px 2px;\n  border-radius: 4px;\n  top: 0px;\n  right: -4px;\n  letter-spacing: 0.1px;\n"], ["\n  ", ";\n  font-size: 6px;\n  padding: 1px 2px;\n  border-radius: 4px;\n  top: 0px;\n  right: -4px;\n  letter-spacing: 0.1px;\n"])), aiBadgeStyle);
/**
 * AI Search Icon Component
 * Theme-aware icon that adapts to different button backgrounds like FluentUI icons
 */
var AISearchIcon = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 20 : _b, className = _a.className, color = _a.color, // If not provided, will inherit from parent context
    aiIndicatorColor = _a.aiIndicatorColor;
    var getBadgeStyle = function () {
        if (size >= 24)
            return aiBadgeLargeStyle;
        if (size <= 16)
            return aiBadgeSmallStyle;
        return aiBadgeStyle;
    };
    // Create dynamic badge style that respects custom colors but falls back to theme
    var dynamicBadgeStyle = (0, react_1.css)(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n    ", ";\n    ", "\n  "], ["\n    ", ";\n    ", "\n  "])), getBadgeStyle(), aiIndicatorColor ? "\n      background: ".concat(aiIndicatorColor, ";\n      border-color: ").concat(aiIndicatorColor, ";\n    ") : '');
    // Search icon inherits color from parent if not specified (like FluentUI icons)
    var searchIconDynamicStyle = (0, react_1.css)(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n    ", ";\n    font-size: ", "px;\n    ", "\n  "], ["\n    ", ";\n    font-size: ", "px;\n    ", "\n  "])), searchIconStyle, size, color ? "color: ".concat(color, ";") : 'color: inherit;');
    return ((0, jsx_runtime_1.jsxs)("span", { css: [containerStyle, className && (0, react_1.css)(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["", ""], ["", ""])), className)], children: [(0, jsx_runtime_1.jsx)(react_icons_1.SearchRegular, { css: searchIconDynamicStyle }), (0, jsx_runtime_1.jsx)("span", { css: dynamicBadgeStyle, children: "AI" })] }));
};
exports.AISearchIcon = AISearchIcon;
exports.default = exports.AISearchIcon;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=AISearchIcon.js.map