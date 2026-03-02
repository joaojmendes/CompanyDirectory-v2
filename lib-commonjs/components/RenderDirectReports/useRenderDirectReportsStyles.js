"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRenderDirectReportsStyles = void 0;
var css_1 = require("@emotion/css");
var react_components_1 = require("@fluentui/react-components");
var useRenderDirectReportsStyles = function (appGlobalState) {
    var hasTeamsContext = (appGlobalState || {}).hasTeamsContext;
    var windowHeight = window.innerHeight;
    // Define maxHeight based on context
    var maxHeight = hasTeamsContext ? windowHeight - 500 : 400;
    var gridContainer = (0, css_1.css)({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, max-content))",
        gap: "12px",
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
    });
    var loadingContainer = (0, css_1.css)({
        padding: react_components_1.tokens.spacingVerticalM,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: react_components_1.tokens.spacingVerticalS,
    });
    var statusContainer = (0, css_1.css)({
        padding: react_components_1.tokens.spacingVerticalM,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    });
    var scrollContainer = (0, css_1.css)({
        padding: react_components_1.tokens.spacingVerticalM,
        maxHeight: maxHeight,
        overflowY: "auto",
        height: "100%",
        scrollbarColor: "".concat(react_components_1.tokens.colorBrandForeground1, "  transparent "),
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar-track": {
            borderRadius: "10px",
            borderWidth: "1px",
        },
        "::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            borderWidth: "1px",
        },
        "::-webkit-scrollbar": {
            height: "7px",
            width: "7px",
        },
    });
    return {
        scrollContainer: scrollContainer,
        loadingContainer: loadingContainer,
        statusContainer: statusContainer,
        gridContainer: gridContainer,
    };
};
exports.useRenderDirectReportsStyles = useRenderDirectReportsStyles;
//# sourceMappingURL=useRenderDirectReportsStyles.js.map