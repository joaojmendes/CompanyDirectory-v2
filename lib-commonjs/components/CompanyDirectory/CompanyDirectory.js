"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyDirectory = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var m365_hooks_1 = require("@spteck/m365-hooks");
var react_components_1 = require("@fluentui/react-components");
var CompanyDirectoryControl_1 = require("./CompanyDirectoryControl");
var EAppHostName_1 = require("../../constants/EAppHostName");
var react_error_boundary_1 = require("react-error-boundary");
var jotai_1 = require("jotai");
var react_controls_1 = require("@spteck/react-controls");
var react_migration_v8_v9_1 = require("@fluentui/react-migration-v8-v9");
var useUtils_1 = require("../../hooks/useUtils");
var CompanyDirectory = function (props) {
    var themeString = props.themeString, theme = props.theme, hasTeamsContext = props.hasTeamsContext, context = props.context, appHostName = props.appHostName;
    var logError = (0, m365_hooks_1.useLogging)().logError;
    var ToasterProvider = (0, m365_hooks_1.useAppToast)().ToasterProvider;
    var sanitizeUserData = (0, useUtils_1.useUtils)().sanitizeUserData;
    var computedTheme = React.useMemo(function () {
        if (hasTeamsContext) {
            switch (themeString) {
                case "dark":
                    return react_components_1.teamsDarkTheme;
                case "contrast":
                    return react_components_1.teamsHighContrastTheme;
                default:
                    return tslib_1.__assign({}, react_components_1.teamsLightTheme);
            }
        }
        return (0, react_migration_v8_v9_1.createV9Theme)(theme);
    }, [themeString, theme, hasTeamsContext]);
    var fallbackRender = function (_a) {
        var _b;
        var error = _a.error;
        logError("About", "Error boundary caught an error in About component", error, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
            themeString: themeString,
            hasTeamsContext: hasTeamsContext,
            errorMessage: error === null || error === void 0 ? void 0 : error.message,
            errorStack: error === null || error === void 0 ? void 0 : error.stack,
        }));
        return React.createElement(react_controls_1.ShowError, { message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : "An unexpected error occurred" });
    };
    if (!context) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement(react_components_1.IdPrefixProvider, { value: "about-v2" },
        React.createElement(react_components_1.FluentProvider, { theme: computedTheme, applyStylesToPortals: true, style: {
                backgroundColor: appHostName === EAppHostName_1.EAppHostName.SharePoint
                    ? "transparent"
                    : react_components_1.tokens.colorNeutralBackground2,
                height: "100%",
            } },
            React.createElement(react_error_boundary_1.ErrorBoundary, { fallbackRender: fallbackRender },
                React.createElement(jotai_1.Provider, null,
                    React.createElement(CompanyDirectoryControl_1.CompanyDirectoryControl, tslib_1.__assign({}, props)),
                    React.createElement(ToasterProvider, null))))));
};
exports.CompanyDirectory = CompanyDirectory;
//# sourceMappingURL=CompanyDirectory.js.map