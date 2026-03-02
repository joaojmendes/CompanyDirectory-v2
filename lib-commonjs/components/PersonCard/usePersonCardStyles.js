"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePersonCardStyles = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var css_1 = require("@emotion/css");
var react_components_1 = require("@fluentui/react-components");
var hooks_1 = require("../../hooks");
var React = tslib_1.__importStar(require("react"));
var usePersonCardStyles = function () {
    var generateColorForManagers = (0, hooks_1.useUtils)().generateColorForManagers;
    var _a = (0, react_1.useState)({}), userColors = _a[0], setUserColors = _a[1];
    var userColorsRef = React.useRef({});
    // Function to get or generate color for a user
    var getUserColor = (0, react_1.useCallback)(function (userId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var color;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (userColorsRef.current[userId]) {
                        return [2 /*return*/, userColorsRef.current[userId]];
                    }
                    return [4 /*yield*/, generateColorForManagers(userId)];
                case 1:
                    color = _a.sent();
                    setUserColors(function (prev) {
                        var _a;
                        return (tslib_1.__assign(tslib_1.__assign({}, prev), (_a = {}, _a[userId] = color, _a)));
                    });
                    return [2 /*return*/, color];
            }
        });
    }); }, [userColors, generateColorForManagers]);
    var styles = {
        card: (0, css_1.css)({
            padding: 20,
            minWidth: 260,
            borderRadius: "8px",
            position: "relative",
        }),
        textStyle: (0, css_1.css)({
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "150px",
        }),
        linkTruncate: (0, css_1.css)({
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "150px",
        }),
        currentUser: (0, css_1.css)({
            border: "1px solid  ".concat(react_components_1.tokens.colorBrandBackground),
        }),
        icon: (0, css_1.css)({
            color: react_components_1.tokens.colorBrandBackground,
            width: "16px",
            height: "16px",
        }),
        clickable: (0, css_1.css)({
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
            ":hover": {
                transform: "translateY(-2px)",
                boxShadow: react_components_1.tokens.shadow8,
            },
        }),
        expanded: (0, css_1.css)({
            boxShadow: react_components_1.tokens.shadow4,
            backgroundColor: react_components_1.tokens.colorNeutralBackground2,
        }),
        expandButton: (0, css_1.css)({
            minWidth: "24px",
            height: "24px",
            padding: 0,
            color: react_components_1.tokens.colorBrandBackground,
            ":hover": {
                backgroundColor: react_components_1.tokens.colorNeutralBackground1Hover,
            },
        }),
        headerContainer: (0, css_1.css)({
            maxWidth: "100%",
            minWidth: "0",
            overflow: "hidden",
        }),
        totalDirectReports: (0, css_1.css)({
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "150px",
            fontWeight: "semibold",
            color: react_components_1.tokens.colorBrandBackground,
        }),
    };
    var getStyles = (0, react_1.useCallback)(function (params) {
        var isCurrentUser = params.isCurrentUser, isManager = params.isManager, person = params.person, isSelectedUser = params.isSelectedUser;
        // Load color for user if needed (fire and forget)
        if (!isCurrentUser && isManager && !userColors[person.id]) {
            getUserColor(person.id).catch(console.error);
        }
        var defaultColor = (0, css_1.css)({
            borderTop: "3px solid \"transparent\"",
        });
        var userColor = userColors[person.id] || react_components_1.tokens.colorNeutralBackground1;
        var cardManager = (0, css_1.css)({
            backgroundColor: isSelectedUser
                ? react_components_1.tokens.colorNeutralBackground1Hover
                : undefined,
            borderTop: !isCurrentUser && isManager ? "3px solid  ".concat(userColor) : undefined,
        });
        var cardSelected = (0, css_1.css)({
            backgroundColor: react_components_1.tokens.colorNeutralBackground1Hover,
        });
        switch (true) {
            case isManager && !isSelectedUser:
                return cardManager;
            case isSelectedUser && isManager:
                return cardManager;
            case isSelectedUser && !isManager:
                return cardSelected;
            default:
                return defaultColor;
        }
    }, [userColors, getUserColor]);
    return {
        getStyles: getStyles,
        styles: styles,
    };
};
exports.usePersonCardStyles = usePersonCardStyles;
//# sourceMappingURL=usePersonCardStyles.js.map