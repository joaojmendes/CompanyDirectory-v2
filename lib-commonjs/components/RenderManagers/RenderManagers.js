"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderManagers = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var PersonCard_1 = require("../PersonCard/PersonCard");
var appGlobalState_1 = require("../../atoms/appGlobalState");
var jotai_1 = require("jotai");
var RenderManagers = function () {
    var appglobalstate = (0, jotai_1.useAtomValue)(appGlobalState_1.appGlobalStateAtom);
    var context = appglobalstate.context, organizationTree = appglobalstate.organizationTree;
    var managers = (organizationTree || {}).managers;
    var isCurrentUser = React.useCallback(function (userId) {
        return userId === context.pageContext.legacyPageContext.aadUserId;
    }, [context.pageContext.legacyPageContext.aadUserId]);
    if (!organizationTree || !organizationTree.managers) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement(React.Fragment, null, managers.map(function (manager) { return (React.createElement(React.Fragment, { key: manager.id },
        React.createElement(PersonCard_1.PersonCard, { person: manager, isCurrentUser: isCurrentUser(manager.id), isManager: true, totalDirectReports: manager.totalDirectReports }),
        React.createElement(react_components_1.Divider, { vertical: true, style: { height: "20px", flexGrow: 0 } }))); })));
};
exports.RenderManagers = RenderManagers;
//# sourceMappingURL=RenderManagers.js.map