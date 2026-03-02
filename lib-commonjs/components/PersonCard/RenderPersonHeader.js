"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderPersonHeader = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var react_controls_1 = require("@spteck/react-controls");
var react_controls_2 = require("@spteck/react-controls");
var appGlobalState_1 = require("../../atoms/appGlobalState");
var jotai_1 = require("jotai");
var usePersonCardStyles_1 = require("./usePersonCardStyles");
var RenderPersonHeader = function (props) {
    var person = props.person, avatarSize = props.avatarSize, totalDirectReports = props.totalDirectReports;
    var displayName = person.displayName, jobTitle = person.jobTitle, userPrincipalName = person.userPrincipalName;
    var appglobalstate = (0, jotai_1.useAtomValue)(appGlobalState_1.appGlobalStateAtom);
    var context = appglobalstate.context;
    var styles = (0, usePersonCardStyles_1.usePersonCardStyles)().styles;
    return (React.createElement(react_controls_1.StackV2, { gap: "15px", direction: "horizontal", className: styles.headerContainer, justifyContent: "start", alignItems: "center" },
        React.createElement(react_controls_2.UserCard, { userId: userPrincipalName, avatarSize: (avatarSize !== null && avatarSize !== void 0 ? avatarSize : 32), context: context, avatarOnly: true }),
        React.createElement(react_controls_1.StackV2, { justifyContent: "start" },
            React.createElement(react_controls_1.StackV2, { direction: "horizontal", gap: "10px", justifyContent: "space-between", alignItems: "center" },
                React.createElement(react_components_1.Tooltip, { content: "".concat(displayName).concat(totalDirectReports ? ", Direct Reports (".concat(totalDirectReports, ")") : ""), relationship: "label" },
                    React.createElement(react_components_1.Body1Strong, { className: styles.textStyle },
                        displayName,
                        " ",
                        totalDirectReports ? (React.createElement(react_components_1.Caption1, { style: {
                                color: react_components_1.tokens.colorBrandBackground,
                                fontWeight: 600,
                            } }, " (".concat(totalDirectReports, ")"))) : null))),
            React.createElement(react_components_1.Tooltip, { content: jobTitle !== null && jobTitle !== void 0 ? jobTitle : "Job title not defined", relationship: "label" },
                React.createElement(react_components_1.Caption1, { className: styles.textStyle }, jobTitle !== null && jobTitle !== void 0 ? jobTitle : "Job title not defined")))));
};
exports.RenderPersonHeader = RenderPersonHeader;
//# sourceMappingURL=RenderPersonHeader.js.map