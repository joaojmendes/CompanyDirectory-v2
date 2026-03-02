"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkeletonCards = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_components_1 = require("@fluentui/react-components");
var react_controls_1 = require("@spteck/react-controls");
var useSkeletonCardStyles_1 = require("./useSkeletonCardStyles");
var SkeletonCard = function () {
    var _a = (0, useSkeletonCardStyles_1.useSkeletonCardStyles)(), cardStyles = _a.cardStyles, headerStyles = _a.headerStyles, bodyStyles = _a.bodyStyles, avatarStyles = _a.avatarStyles, textLineStyles = _a.textLineStyles;
    return (React.createElement(react_components_1.Card, { className: cardStyles },
        React.createElement(react_components_1.CardHeader, { className: headerStyles },
            React.createElement("div", { className: avatarStyles },
                React.createElement(react_components_1.SkeletonItem, { shape: "circle", size: 64 })),
            React.createElement(react_controls_1.StackV2, { direction: "vertical", gap: "4px", style: { flex: 1 } },
                React.createElement("div", { className: textLineStyles },
                    React.createElement(react_components_1.SkeletonItem, { size: 16, style: { width: "70%" } })),
                React.createElement("div", { className: textLineStyles },
                    React.createElement(react_components_1.SkeletonItem, { size: 12, style: { width: "50%" } })),
                React.createElement("div", { className: textLineStyles },
                    React.createElement(react_components_1.SkeletonItem, { size: 12, style: { width: "60%" } })))),
        React.createElement("div", { className: bodyStyles },
            React.createElement(react_controls_1.StackV2, { direction: "vertical", gap: "8px" },
                React.createElement("div", { className: textLineStyles },
                    React.createElement(react_components_1.SkeletonItem, { size: 12, style: { width: "100%" } })),
                React.createElement("div", { className: textLineStyles },
                    React.createElement(react_components_1.SkeletonItem, { size: 12, style: { width: "80%" } })),
                React.createElement("div", { className: textLineStyles },
                    React.createElement(react_components_1.SkeletonItem, { size: 12, style: { width: "90%" } })),
                React.createElement("div", { className: textLineStyles },
                    React.createElement(react_components_1.SkeletonItem, { size: 12, style: { width: "60%" } }))))));
};
var SkeletonCards = function (_a) {
    var _b = _a.count, count = _b === void 0 ? 12 : _b;
    return (React.createElement(React.Fragment, null, Array.from({ length: count }, function (_, index) { return (React.createElement(SkeletonCard, { key: index })); })));
};
exports.SkeletonCards = SkeletonCards;
//# sourceMappingURL=SkeletonCards.js.map