"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useListViewStyles = void 0;
var css_1 = require("@emotion/css");
var react_components_1 = require("@fluentui/react-components");
var useListViewStyles = function (globalState) {
    var windowHeight = window.innerHeight;
    var hasTeamsContext = globalState === null || globalState === void 0 ? void 0 : globalState.hasTeamsContext;
    // Define maxHeight based on context
    var maxHeight = hasTeamsContext ? windowHeight - 250 : 700;
    var containerStyles = (0, css_1.css)({
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: maxHeight,
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: react_components_1.tokens.colorNeutralBackground1,
        overflow: "hidden", // Let DataGrid handle its own scrolling
        scrollbarColor: "".concat(react_components_1.tokens.colorBrandForeground1, " ").concat(react_components_1.tokens.colorNeutralBackground1),
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
    var toolbarStyles = (0, css_1.css)({
        display: "flex",
        alignItems: "center",
        padding: "15px 15px 20px 15px",
        gap: "10px",
    });
    var dividerStyles = (0, css_1.css)({
        marginLeft: "16px",
        marginRight: "16px",
    });
    var searchInfoStyles = (0, css_1.css)({
        paddingLeft: "15px",
        paddingBottom: "20px",
        paddingRight: "15px",
    });
    var dataGridStyles = (0, css_1.css)({
        overflowY: "hidden",
        overflowX: "auto",
    });
    var loadingStyles = (0, css_1.css)({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
    });
    var endOfResultsStyles = (0, css_1.css)({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        color: react_components_1.tokens.colorNeutralForeground2,
    });
    var errorStyles = (0, css_1.css)({
        padding: "20px",
        color: react_components_1.tokens.colorPaletteRedForeground1,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
    });
    var headerRowStyles = (0, css_1.css)({
        borderBottom: "1px solid ".concat(react_components_1.tokens.colorNeutralStroke2),
        paddingBottom: "10px",
    });
    var headerCellStyles = (0, css_1.css)({
        fontWeight: "bold",
        color: react_components_1.tokens.colorNeutralForeground1,
    });
    var dataRowStyles = (0, css_1.css)({
        borderBottom: "1px solid ".concat(react_components_1.tokens.colorNeutralStroke3),
        paddingBottom: "10px",
        paddingTop: "10px",
        "&:hover": {
            backgroundColor: react_components_1.tokens.colorNeutralBackground1Hover,
        },
    });
    var cellTextStyles = (0, css_1.css)({
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: "1",
        WebkitBoxOrient: "vertical",
        paddingBottom: "0px",
        textAlign: "start",
        wordBreak: "break-all",
        textOverflow: "ellipsis",
        textOverlay: "hidden",
    });
    return {
        containerStyles: containerStyles,
        toolbarStyles: toolbarStyles,
        dividerStyles: dividerStyles,
        searchInfoStyles: searchInfoStyles,
        dataGridStyles: dataGridStyles,
        loadingStyles: loadingStyles,
        endOfResultsStyles: endOfResultsStyles,
        errorStyles: errorStyles,
        headerRowStyles: headerRowStyles,
        headerCellStyles: headerCellStyles,
        dataRowStyles: dataRowStyles,
        cellTextStyles: cellTextStyles,
    };
};
exports.useListViewStyles = useListViewStyles;
//# sourceMappingURL=useListViewStyles.js.map