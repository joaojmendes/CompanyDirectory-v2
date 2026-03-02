"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchemaExample = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_components_1 = require("@fluentui/react-components");
var UpdateExtendAttribute_1 = require("../UpdateExtendAttribute");
var useExampleStyles = (0, react_components_1.makeStyles)({
    container: {
        padding: react_components_1.tokens.spacingVerticalXXL,
        maxWidth: "1200px",
        margin: "0 auto",
    },
    header: {
        marginBottom: react_components_1.tokens.spacingVerticalXL,
        textAlign: "center",
    },
    title: {
        fontSize: react_components_1.tokens.fontSizeHero900,
        fontWeight: react_components_1.tokens.fontWeightBold,
        marginBottom: react_components_1.tokens.spacingVerticalM,
        color: react_components_1.tokens.colorBrandForeground1,
    },
    description: {
        fontSize: react_components_1.tokens.fontSizeBase400,
        color: react_components_1.tokens.colorNeutralForeground2,
        lineHeight: react_components_1.tokens.lineHeightBase400,
    },
    demoSection: {
        backgroundColor: react_components_1.tokens.colorNeutralBackground2,
        padding: react_components_1.tokens.spacingVerticalXL,
        borderRadius: react_components_1.tokens.borderRadiusLarge,
        border: "1px solid ".concat(react_components_1.tokens.colorNeutralStroke2),
    },
});
var UpdateUserSchemaExample = function (_a) {
    var context = _a.context;
    var styles = useExampleStyles();
    return ((0, jsx_runtime_1.jsx)(react_components_1.FluentProvider, { theme: react_components_1.webLightTheme, children: (0, jsx_runtime_1.jsxs)("div", { className: styles.container, children: [(0, jsx_runtime_1.jsxs)("div", { className: styles.header, children: [(0, jsx_runtime_1.jsx)("h1", { className: styles.title, children: "User Schema Extension Update Demo" }), (0, jsx_runtime_1.jsx)("p", { className: styles.description, children: "This demo shows how to use the UpdateUserSchemaManager component to update custom schema extension properties for users. The component allows you to update skills and projects information for any user in your organization." })] }), (0, jsx_runtime_1.jsx)("div", { className: styles.demoSection, children: (0, jsx_runtime_1.jsx)(UpdateExtendAttribute_1.UpdateUserSchemaManager, { context: context, buttonText: "Update User Skills & Projects", drawerTitle: "Update User Profile Information" }) })] }) }));
};
exports.UpdateUserSchemaExample = UpdateUserSchemaExample;
//# sourceMappingURL=UpdateUserSchemaExample.js.map