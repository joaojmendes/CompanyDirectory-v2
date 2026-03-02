"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderSelectedUser = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var PersonCard_1 = require("../PersonCard/PersonCard");
var appGlobalState_1 = require("../../atoms/appGlobalState");
var css_1 = require("@emotion/css");
var jotai_1 = require("jotai");
var RenderSelectedUser = function () {
    var appglobalstate = (0, jotai_1.useAtomValue)(appGlobalState_1.appGlobalStateAtom);
    var context = appglobalstate.context, organizationTree = appglobalstate.organizationTree;
    var _a = organizationTree || {}, id = _a.id, totalDirectReports = _a.totalDirectReports;
    var isCurrentUser = React.useMemo(function () { return id === context.pageContext.legacyPageContext.aadUserId; }, [id, context]);
    var divider = (0, css_1.css)({
        height: "20px",
        flexGrow: 0,
        "::before": {
            borderColor: react_components_1.tokens.colorNeutralStroke1,
        },
        "::after": {
            borderColor: react_components_1.tokens.colorNeutralStroke1,
        },
    });
    if (!organizationTree) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(PersonCard_1.PersonCard, { key: id, person: organizationTree, isCurrentUser: isCurrentUser, isManager: totalDirectReports > 0, totalDirectReports: totalDirectReports, isSelectedUser: true }),
        React.createElement(react_components_1.Divider, { vertical: true, className: divider })));
};
exports.RenderSelectedUser = RenderSelectedUser;
//# sourceMappingURL=RenderSelectedUser.js.map