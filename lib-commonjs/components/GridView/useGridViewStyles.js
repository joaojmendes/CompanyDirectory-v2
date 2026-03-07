"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGridViewStyles = void 0;
var css_1 = require("@emotion/css");
var react_components_1 = require("@fluentui/react-components");
var useGridViewStyles = function (globalSState) {
    var hasTeamsContext = globalSState.hasTeamsContext;
    var windowHeight = window.innerHeight;
    // Define maxHeight based on context
    var maxHeight = hasTeamsContext ? windowHeight - 250 : 700;
    var gridStyles = (0, css_1.css)({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: react_components_1.tokens.spacingVerticalL,
        padding: react_components_1.tokens.spacingVerticalM,
    });
    var containerStyles = (0, css_1.css)({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: react_components_1.tokens.spacingVerticalL,
        padding: react_components_1.tokens.spacingVerticalM,
        maxHeight: maxHeight,
        overflowY: "auto",
        height: '100%',
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
    var errorStyles = (0, css_1.css)({
        color: react_components_1.tokens.colorPaletteRedForeground1,
        textAlign: "center",
        padding: "20px",
        gridColumn: "1 / -1", // Span all columns
    });
    var loadingStyles = (0, css_1.css)({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        gridColumn: "1 / -1", // Span all columns
    });
    var searchIndicatorStyles = (0, css_1.css)({
        padding: "".concat(react_components_1.tokens.spacingVerticalS, " ").concat(react_components_1.tokens.spacingVerticalM),
        backgroundColor: react_components_1.tokens.colorNeutralBackground2,
        borderRadius: react_components_1.tokens.borderRadiusSmall,
        margin: "0 ".concat(react_components_1.tokens.spacingVerticalM, " ").concat(react_components_1.tokens.spacingVerticalS, " ").concat(react_components_1.tokens.spacingVerticalM),
        fontSize: react_components_1.tokens.fontSizeBase300,
        color: react_components_1.tokens.colorNeutralForeground1,
    });
    var toolbarDividerStyles = (0, css_1.css)({
        width: "5px",
        flexGrow: 0,
        paddingTop: 5,
        paddingBottom: 5,
    });
    var emptyContainer = (0, css_1.css)({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        textAlign: "center",
        padding: "40px 20px",
        gridColumn: "1 / -1",
    });
    var emptyIcon = (0, css_1.css)({
        color: react_components_1.tokens.colorBrandBackground,
        marginBottom: "16px",
    });
    var emptyText = (0, css_1.css)({});
    return {
        gridStyles: gridStyles,
        containerStyles: containerStyles,
        errorStyles: errorStyles,
        loadingStyles: loadingStyles,
        searchIndicatorStyles: searchIndicatorStyles,
        toolbarDividerStyles: toolbarDividerStyles,
        emptyContainer: emptyContainer,
        emptyIcon: emptyIcon,
        emptyText: emptyText,
    };
};
exports.useGridViewStyles = useGridViewStyles;
//# sourceMappingURL=useGridViewStyles.js.map