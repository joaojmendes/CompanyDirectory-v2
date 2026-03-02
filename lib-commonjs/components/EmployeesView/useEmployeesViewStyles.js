"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEmployeesViewStyles = void 0;
var css_1 = require("@emotion/css");
var useEmployeesViewStyles = function () {
    var containerStyles = (0, css_1.css)({
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: "700px",
    });
    var toolbarStyles = (0, css_1.css)({
        paddingBottom: "20px",
        paddingLeft: "15px",
        paddingRight: "15px",
    });
    var toolbarDividerStyles = (0, css_1.css)({
        width: "5px",
        flexGrow: 0,
        paddingTop: 5,
        paddingBottom: 5,
    });
    return {
        containerStyles: containerStyles,
        toolbarStyles: toolbarStyles,
        toolbarDividerStyles: toolbarDividerStyles,
    };
};
exports.useEmployeesViewStyles = useEmployeesViewStyles;
//# sourceMappingURL=useEmployeesViewStyles.js.map