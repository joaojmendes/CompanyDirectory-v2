"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonCard = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var Actions_1 = require("./Actions");
var Details_1 = require("./Details");
var RenderPersonHeader_1 = require("./RenderPersonHeader");
var react_controls_1 = require("@spteck/react-controls");
var appGlobalState_1 = require("../../atoms/appGlobalState");
var jotai_1 = require("jotai");
var useCardActions_1 = require("../../hooks/useCardActions");
var usePersonCardStyles_1 = require("./usePersonCardStyles");
var PersonCard = function (props) {
    var person = props.person, _a = props.isManager, isManager = _a === void 0 ? false : _a, _b = props.isCurrentUser, isCurrentUser = _b === void 0 ? false : _b, _c = props.showDetails, showDetails = _c === void 0 ? false : _c, _d = props.totalDirectReports, totalDirectReports = _d === void 0 ? 0 : _d;
    var _e = (0, jotai_1.useAtom)(appGlobalState_1.appGlobalStateAtom), setAppGlobalState = _e[1];
    var _f = (0, usePersonCardStyles_1.usePersonCardStyles)(), getStyles = _f.getStyles, styles = _f.styles;
    var executeAction = (0, useCardActions_1.useCardActions)({ person: person }).executeAction;
    var handleCardCClick = React.useCallback(function () {
        // When clicking a person card, set them as the selected user
        // This will trigger lazy loading of their organization data
        console.log("PersonCard clicked: ".concat(person.displayName, " (").concat(person.id, ") - Triggering lazy load of organization data"));
        setAppGlobalState(function (prevState) { return (tslib_1.__assign(tslib_1.__assign({}, prevState), { selectedUser: tslib_1.__assign({}, person) })); });
    }, [person, setAppGlobalState]);
    var className = getStyles(props);
    return (React.createElement(react_controls_1.StackV2, { padding: "small" },
        React.createElement(react_components_1.Card, { className: (0, react_components_1.mergeClasses)(styles.card, className), onClick: handleCardCClick },
            React.createElement(react_components_1.CardHeader, { header: React.createElement(RenderPersonHeader_1.RenderPersonHeader, { person: person, avatarSize: 48, isManager: isManager, totalDirectReports: totalDirectReports }), action: !isCurrentUser ? React.createElement(Actions_1.Actions, { onActionClick: executeAction, person: person }) : null }),
            React.createElement(Details_1.Details, { person: person, showDetails: showDetails }))));
};
exports.PersonCard = PersonCard;
//# sourceMappingURL=PersonCard.js.map