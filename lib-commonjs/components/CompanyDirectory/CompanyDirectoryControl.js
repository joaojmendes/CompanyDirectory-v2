"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyDirectoryControl = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_icons_1 = require("@fluentui/react-icons");
var ButtonToolbar_1 = require("../toolbar/ButtonToolbar");
var EmployeesView_1 = require("../EmployeesView/EmployeesView");
var OrganizationChart_1 = require("../OrganizationChart/OrganizationChart");
var react_controls_1 = require("@spteck/react-controls");
var react_components_1 = require("@fluentui/react-components");
var appGlobalState_1 = require("../../atoms/appGlobalState");
var jotai_1 = require("jotai");
var useCompanyDirectoryStyles_1 = require("./useCompanyDirectoryStyles");
var SchemaManager_1 = require("../SchemaManager");
var CompanyDirectoryControl = function (props) {
    var title = props.title;
    var _a = (0, jotai_1.useAtom)(appGlobalState_1.appGlobalStateAtom), setAppGlobalState = _a[1];
    var styles = (0, useCompanyDirectoryStyles_1.useCompanyDirectoryStyles)();
    var context = props.context;
    var _b = React.useState("directory" /* toolbarOptions.DIRECTORY */), selectedValue = _b[0], setSelectedValue = _b[1];
    React.useEffect(function () {
        setAppGlobalState(function (prevState) { return (tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, prevState), { selectedUser: undefined }), props)); });
    }, [props]);
    var onButtonClick = React.useCallback(function (value) {
        setSelectedValue(value);
    }, [setSelectedValue]);
    var toolbarItems = React.useMemo(function () { return [
        {
            id: "directory" /* toolbarOptions.DIRECTORY */,
            name: "Directory",
            icon: React.createElement(react_icons_1.PeopleTeamRegular, null),
        },
        {
            id: "orgchart" /* toolbarOptions.ORG_CHART */,
            name: "Org. Chart",
            icon: React.createElement(react_icons_1.OrganizationRegular, null),
        },
    ]; }, []);
    var renderTabList = React.useCallback(function () {
        return (React.createElement(react_controls_1.StackV2, { direction: "horizontal", gap: "small", paddingLeft: "15px", paddingRight: "15px" },
            React.createElement(ButtonToolbar_1.ButtonToolBar, { items: toolbarItems, selectedItemId: selectedValue, onSelectedItem: onButtonClick })));
    }, [selectedValue, onButtonClick, toolbarItems]);
    var renderCommandbar = React.useCallback(function () {
        return (React.createElement(react_controls_1.StackV2, { justifyContent: "space-between", alignItems: "start", direction: "horizontal" }, renderTabList()));
    }, [renderTabList]);
    if (!context) {
        return null;
    }
    return (React.createElement(react_controls_1.StackV2, null,
        React.createElement(react_controls_1.StackV2, { paddingBottom: "20px", paddingLeft: "15px", paddingRight: "15px" },
            React.createElement(SchemaManager_1.SchemaManager, { context: context, isOpen: false, onClose: function () {
                    throw new Error("Function not implemented.");
                } }),
            React.createElement(react_components_1.Subtitle1, null, title)),
        React.createElement("div", { className: styles.container },
            renderCommandbar(),
            React.createElement(react_controls_1.StackV2, { direction: "horizontal", justifyContent: "start" }, selectedValue === "orgchart" ? (React.createElement(OrganizationChart_1.OrganizationChart, null)) : (React.createElement(EmployeesView_1.EmployeesView, null))))));
};
exports.CompanyDirectoryControl = CompanyDirectoryControl;
//# sourceMappingURL=CompanyDirectoryControl.js.map