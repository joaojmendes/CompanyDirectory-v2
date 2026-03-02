"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Details = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var react_1 = require("@iconify/react");
var react_icons_1 = require("@fluentui/react-icons");
var RenderAttribute_1 = require("../RenderAttribute");
var react_controls_1 = require("@spteck/react-controls");
var usePersonCardStyles_1 = require("./usePersonCardStyles");
var Details = function (props) {
    var person = props.person, showDetails = props.showDetails;
    var department = person.department, location = person.location, userType = person.userType;
    var styles = (0, usePersonCardStyles_1.usePersonCardStyles)().styles;
    if (!showDetails)
        return null;
    return (React.createElement(React.Fragment, null, showDetails && (React.createElement(react_controls_1.StackV2, null,
        React.createElement(react_components_1.Divider, { style: { paddingBottom: "8px" } }),
        React.createElement(react_controls_1.StackV2, { direction: "horizontal", gap: "5px", alignItems: "start", justifyContent: "space-between" },
            React.createElement(RenderAttribute_1.RenderAttribute, { label: "Department", value: department, icon: React.createElement(react_1.Icon, { icon: "mingcute:department-line", className: styles.icon }) }),
            userType === "Guest" ? (React.createElement(react_components_1.Badge, { color: "warning", size: "medium" }, userType)) : null),
        React.createElement(react_components_1.Divider, { style: { opacity: 0.4, paddingBottom: "8px" } }),
        React.createElement(RenderAttribute_1.RenderAttribute, { label: "Location", value: location, icon: React.createElement(react_icons_1.LocationRegular, { className: styles.icon }) })))));
};
exports.Details = Details;
//# sourceMappingURL=Details.js.map