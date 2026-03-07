"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCompanyDirectoryStyles = void 0;
var css_1 = require("@emotion/css");
var react_components_1 = require("@fluentui/react-components");
var useCompanyDirectoryStyles = function (globalState) {
    var directReportsContainer = (0, css_1.css)({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: react_components_1.tokens.spacingVerticalL,
        width: "100%",
        paddingTop: react_components_1.tokens.spacingVerticalL,
    });
    var container = (0, css_1.css)({
        position: "relative",
        overflow: "hidden",
    });
    var loadingContainer = (0, css_1.css)({
        width: "100%",
        height: "100%",
        padding: "16px",
    });
    var divider = (0, css_1.css)({
        width: "100%",
        height: "1px",
        padding: 0,
    });
    return {
        directReportsContainer: directReportsContainer,
        container: container,
        loadingContainer: loadingContainer,
        divider: divider,
    };
};
exports.useCompanyDirectoryStyles = useCompanyDirectoryStyles;
//# sourceMappingURL=useCompanyDirectoryStyles.js.map