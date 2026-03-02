"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRenderNoUsersStyles = void 0;
var css_1 = require("@emotion/css");
var react_components_1 = require("@fluentui/react-components");
var useRenderNoUsersStyles = function () {
    var styles = {
        emptyContainer: (0, css_1.css)({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
            textAlign: "center",
            padding: "40px 20px",
            gridColumn: "1 / -1",
        }),
        emptyIcon: (0, css_1.css)({
            color: react_components_1.tokens.colorBrandBackground,
            marginBottom: "16px",
        })
    };
    return { styles: styles };
};
exports.useRenderNoUsersStyles = useRenderNoUsersStyles;
//# sourceMappingURL=useRenderNoUsersStyles.js.map