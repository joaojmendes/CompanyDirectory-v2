"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSkeletonCardStyles = void 0;
var css_1 = require("@emotion/css");
var react_components_1 = require("@fluentui/react-components");
var useSkeletonCardStyles = function () {
    // Create shimmer animation
    var shimmer = (0, css_1.keyframes)({
        "0%": {
            backgroundPosition: "-200px 0"
        },
        "100%": {
            backgroundPosition: "calc(200px + 100%) 0"
        }
    });
    var cardStyles = (0, css_1.css)({
        padding: 20,
        minWidth: 260,
        borderRadius: "8px",
        position: "relative",
        backgroundColor: react_components_1.tokens.colorNeutralBackground1,
        boxShadow: react_components_1.tokens.shadow4,
        border: "1px solid ".concat(react_components_1.tokens.colorNeutralStroke2),
        // Add subtle animation to make it feel more alive
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: "linear-gradient(\n        90deg,\n        transparent,\n        ".concat(react_components_1.tokens.colorNeutralBackground1Hover, ",\n        transparent\n      )"),
            backgroundSize: "200px 100%",
            animation: "".concat(shimmer, " 2s infinite linear"),
            borderRadius: "8px",
            zIndex: 1,
            opacity: 0.6,
        },
        "& > *": {
            position: "relative",
            zIndex: 2,
        },
    });
    var headerStyles = (0, css_1.css)({
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
        marginBottom: "16px",
    });
    var bodyStyles = (0, css_1.css)({
        paddingLeft: "0px",
    });
    var avatarStyles = (0, css_1.css)({
        flexShrink: 0,
    });
    var textLineStyles = (0, css_1.css)({
        display: "flex",
        width: "100%",
        marginBottom: "4px",
    });
    return {
        cardStyles: cardStyles,
        headerStyles: headerStyles,
        bodyStyles: bodyStyles,
        avatarStyles: avatarStyles,
        textLineStyles: textLineStyles,
    };
};
exports.useSkeletonCardStyles = useSkeletonCardStyles;
//# sourceMappingURL=useSkeletonCardStyles.js.map