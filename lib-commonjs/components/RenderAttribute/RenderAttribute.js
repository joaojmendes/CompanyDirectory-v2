"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderAttribute = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var react_controls_1 = require("@spteck/react-controls");
var react_icons_1 = require("@fluentui/react-icons");
var useRenderAttributeStyles_1 = require("./useRenderAttributeStyles");
// Render attribute component - render composition fields
var RenderAttribute = function (props) {
    var label = props.label, icon = props.icon, isRequired = props.isRequired, value = props.value, infoLabel = props.infoLabel, _a = props.showInfoIcon, showInfoIcon = _a === void 0 ? false : _a, _b = props.variant, variant = _b === void 0 ? "body1" : _b, _c = props.multiline, multiline = _c === void 0 ? false : _c;
    var styles = (0, useRenderAttributeStyles_1.useRenderAttributeStyles)();
    var renderValue = function () {
        if (React.isValidElement(value)) {
            return value;
        }
        // Use appropriate CSS class based on multiline setting
        var textProps = {
            title: typeof value === "string" ? value : typeof value === "number" ? value.toString() : "No value",
            className: multiline ? styles.textContentMultiline : styles.textContent,
        };
        if (variant === "caption1") {
            return (React.createElement(react_components_1.Caption1, tslib_1.__assign({}, textProps), value || "No value"));
        }
        return (React.createElement(react_components_1.Body1, tslib_1.__assign({}, textProps), value || "No value"));
    };
    return (React.createElement(react_controls_1.StackV2, { direction: "vertical" },
        React.createElement(react_controls_1.StackV2, { direction: "horizontal", justifyContent: "start", alignItems: "center" },
            React.createElement(react_controls_1.RenderLabel, { label: label, icon: icon, isRequired: isRequired }),
            (infoLabel || showInfoIcon) && (React.createElement(react_components_1.InfoLabel, { info: infoLabel, className: styles.infoLabel }, showInfoIcon && React.createElement(react_icons_1.Info16Regular, null)))),
        React.createElement(react_controls_1.StackV2, { className: multiline ? styles.valueContainerMultiline : styles.valueContainer, paddingTop: "3px", paddingBottom: "s" },
            React.createElement("div", null, renderValue()))));
};
exports.RenderAttribute = RenderAttribute;
exports.default = exports.RenderAttribute;
//# sourceMappingURL=RenderAttribute.js.map