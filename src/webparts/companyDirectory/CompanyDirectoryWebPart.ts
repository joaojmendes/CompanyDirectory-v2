import * as React from "react";
import * as ReactDom from "react-dom";
import * as strings from "CompanyDirectoryWebPartStrings";

import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";

import { BaseClientSideWebPart, } from "@microsoft/sp-webpart-base";
import { CompanyDirectory } from "../../components/CompanyDirectory/CompanyDirectory";
import { EAppHostName } from "../../constants/EAppHostName";
import { ICompanyDirectoryProps } from "../../components/CompanyDirectory/ICompanyDirectoryProps";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { Theme } from "@fluentui/react-components";
import { Version } from "@microsoft/sp-core-library";

export interface ICompanyDirectoryWebPartProps {
  title: string;

}

export default class CompanyDirectoryWebPart extends BaseClientSideWebPart<ICompanyDirectoryWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _userId: string = "";
  private _theme: Theme | undefined;
  private _themeString: string = "";
  private _appHostName: EAppHostName = EAppHostName.SharePoint;

  private _applyTheme = (theme: string): void => {
    this.context.domElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    if (theme === "dark") {
      this._themeString = "dark";
    }
    if (theme === "default") {
      this._themeString = "default";
    }
    if (theme === "contrast") {
      this._themeString = "contrast";
    }
    this.render();
  };

  public render(): void {
    const element: React.ReactElement<ICompanyDirectoryProps> = React.createElement(
      CompanyDirectory,
      {
        theme: this._theme as never,
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
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this._userId = this.context.pageContext.legacyPageContext.aadUserId;

    if (this.context.sdks.microsoftTeams) {
      // in teams ?
      const teamsContext =
        await this.context.sdks.microsoftTeams?.teamsJs.app.getContext();

      switch (teamsContext.app.host.name.toLowerCase()) {
        case "teams":
        case "teamsmodern":
          this._appHostName = EAppHostName.Teams;
          break;
        case "office":
          this._appHostName = EAppHostName.Office;
          break;
        case "outlook":
          this._appHostName = EAppHostName.Outlook;
          break;
        default:
          throw new Error("[CompanyDirectoryWebPart._onInit]: Unknown app host name");
      }
      this._applyTheme(teamsContext.app.theme || "default");
      this.context.sdks.microsoftTeams.teamsJs.app.registerOnThemeChangeHandler(
        this._applyTheme
      );
    }

    return;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }
    this._theme = currentTheme as Theme;
    this._isDarkTheme = !!currentTheme.isInverted;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected onAfterResize(newWidth: number): void {
    this.render();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                PropertyPaneTextField("title", {
                  label: strings.DescriptionFieldLabel,
                }),
               
              ],
            },
          ],
        },
      ],
    };
  }  
}
