"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOrganizationChartStyles = void 0;
var css_1 = require("@emotion/css");
var react_components_1 = require("@fluentui/react-components");
var useOrganizationChartStyles = function (globalState) {
    var hasTeamsContext = (globalState || {}).hasTeamsContext;
    var windowHeight = window.innerHeight;
    // Define maxHeight based on context
    var maxHeight = hasTeamsContext ? windowHeight - 250 : 700;
    var directReportsContainerGrid = (0, css_1.css)({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, max-content))",
        gap: "20px",
        width: "100%",
        paddingTop: "20px",
        justifyContent: "center",
        justifyItems: "stretch",
    });
    var loadingContainer = (0, css_1.css)({
        width: "100%",
        height: "100%",
        padding: "16px",
    });
    var divider = (0, css_1.css)({
        height: "1px",
        width: "auto",
        marginLeft: "20px",
        marginRight: "20px",
        flexGrow: 0,
        "::before": {
            borderColor: react_components_1.tokens.colorNeutralStroke1,
        },
        "::after": {
            borderColor: react_components_1.tokens.colorNeutralStroke1,
        },
    });
    var container = (0, css_1.css)({
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: maxHeight,
    });
    return {
        directReportsContainerGrid: directReportsContainerGrid,
        loadingContainer: loadingContainer,
        divider: divider,
        container: container,
    };
};
exports.useOrganizationChartStyles = useOrganizationChartStyles;
//# sourceMappingURL=useOrganizationChartStyles.js.map