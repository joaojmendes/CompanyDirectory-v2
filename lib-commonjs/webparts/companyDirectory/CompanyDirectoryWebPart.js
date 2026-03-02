"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var ReactDom = tslib_1.__importStar(require("react-dom"));
var strings = tslib_1.__importStar(require("CompanyDirectoryWebPartStrings"));
var sp_property_pane_1 = require("@microsoft/sp-property-pane");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var CompanyDirectory_1 = require("../../components/CompanyDirectory/CompanyDirectory");
var EAppHostName_1 = require("../../constants/EAppHostName");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var CompanyDirectoryWebPart = /** @class */ (function (_super) {
    tslib_1.__extends(CompanyDirectoryWebPart, _super);
    function CompanyDirectoryWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isDarkTheme = false;
        _this._userId = "";
        _this._themeString = "";
        _this._appHostName = EAppHostName_1.EAppHostName.SharePoint;
        _this._applyTheme = function (theme) {
            _this.context.domElement.setAttribute("data-theme", theme);
            document.body.setAttribute("data-theme", theme);
            if (theme === "dark") {
                _this._themeString = "dark";
            }
            if (theme === "default") {
                _this._themeString = "default";
            }
            if (theme === "contrast") {
                _this._themeString = "contrast";
            }
            _this.render();
        };
        return _this;
    }
    CompanyDirectoryWebPart.prototype.render = function () {
        var element = React.createElement(CompanyDirectory_1.CompanyDirectory, {
            theme: this._theme,
            isDarkTheme: this._isDarkTheme,
            themeString: this._themeString,
            hasTeamsContext: !!this.context.sdks.microsoftTeams,
            context: this.context,
            title: this.properties.title,
            appHostName: this._appHostName,
            aadUserId: this._userId,
            environmentMessage: "",
            userDisplayName: this.context.pageContext.user.displayName,
            startUser: this._userId,
            containerWidth: this.domElement.clientWidth
        });
        ReactDom.render(element, this.domElement);
    };
    CompanyDirectoryWebPart.prototype.onInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var teamsContext;
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._userId = this.context.pageContext.legacyPageContext.aadUserId;
                        if (!this.context.sdks.microsoftTeams) return [3 /*break*/, 2];
                        return [4 /*yield*/, ((_a = this.context.sdks.microsoftTeams) === null || _a === void 0 ? void 0 : _a.teamsJs.app.getContext())];
                    case 1:
                        teamsContext = _b.sent();
                        switch (teamsContext.app.host.name.toLowerCase()) {
                            case "teams":
                            case "teamsmodern":
                                this._appHostName = EAppHostName_1.EAppHostName.Teams;
                                break;
                            case "office":
                                this._appHostName = EAppHostName_1.EAppHostName.Office;
                                break;
                            case "outlook":
                                this._appHostName = EAppHostName_1.EAppHostName.Outlook;
                                break;
                            default:
                                throw new Error("[CompanyDirectoryWebPart._onInit]: Unknown app host name");
                        }
                        this._applyTheme(teamsContext.app.theme || "default");
                        this.context.sdks.microsoftTeams.teamsJs.app.registerOnThemeChangeHandler(this._applyTheme);
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CompanyDirectoryWebPart.prototype.onThemeChanged = function (currentTheme) {
        if (!currentTheme) {
            return;
        }
        this._theme = currentTheme;
        this._isDarkTheme = !!currentTheme.isInverted;
    };
    CompanyDirectoryWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(CompanyDirectoryWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse("1.0");
        },
        enumerable: false,
        configurable: true
    });
    CompanyDirectoryWebPart.prototype.onAfterResize = function (newWidth) {
        this.render();
    };
    CompanyDirectoryWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription,
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                (0, sp_property_pane_1.PropertyPaneTextField)("title", {
                                    label: strings.DescriptionFieldLabel,
                                }),
                            ],
                        },
                    ],
                },
            ],
        };
    };
    return CompanyDirectoryWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = CompanyDirectoryWebPart;
//# sourceMappingURL=CompanyDirectoryWebPart.js.map