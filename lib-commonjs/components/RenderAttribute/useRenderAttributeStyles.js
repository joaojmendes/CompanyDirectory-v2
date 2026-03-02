"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRenderAttributeStyles = void 0;
var css_1 = require("@emotion/css");
var react_components_1 = require("@fluentui/react-components");
var useRenderAttributeStyles = function () {
    return {
        attributeContainer: (0, css_1.css)({
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "8px",
            padding: "12px 0px",
            borderBottom: "1px solid ".concat(react_components_1.tokens.colorNeutralStroke2),
            minHeight: "fit-content",
            height: "auto",
        }),
        labelSection: (0, css_1.css)({
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "8px",
        }),
        infoLabel: (0, css_1.css)({
            marginLeft: "4px",
        }),
        valueContainer: (0, css_1.css)({
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: "20px", // Align with icon + gap from label
            minHeight: "fit-content",
            minWidth: 0, // Allow shrinking
            maxWidth: "100%",
            overflow: "visible",
            // Apply text truncation to text content
            '& > *': {
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                lineHeight: "1.4",
                minHeight: "fit-content",
            },
            // But allow links and badges to overflow naturally
            '& a, & [role="img"], & [data-testid*="badge"]': {
                whiteSpace: "normal",
                wordBreak: "break-all",
                overflowWrap: "break-word",
            },
        }),
        valueContainerMultiline: (0, css_1.css)({
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingLeft: "20px", // Align with icon + gap from label
            minHeight: "20px",
            minWidth: 0, // Allow shrinking
            maxWidth: "100%",
            wordBreak: "break-word",
            overflowWrap: "break-word",
        }),
        textContent: (0, css_1.css)({
            color: react_components_1.tokens.colorNeutralForeground1,
            maxWidth: "100% !important",
            overflow: "hidden !important",
            textOverflow: "ellipsis !important",
            whiteSpace: "nowrap !important",
            display: "block !important",
            minWidth: "0 !important",
        }),
        textContentMultiline: (0, css_1.css)({
            color: react_components_1.tokens.colorNeutralForeground1,
            maxWidth: "100%",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
            display: "block",
        }),
    };
};
exports.useRenderAttributeStyles = useRenderAttributeStyles;
//# sourceMappingURL=useRenderAttributeStyles.js.map