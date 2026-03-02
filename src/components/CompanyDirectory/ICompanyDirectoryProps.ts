import { BaseComponentContext } from "@microsoft/sp-component-base";
import { EAppHostName } from "../../constants/EAppHostName";
import { Theme } from "@fluentui/react-components"

export interface ICompanyDirectoryProps {
  title: string;
  isDarkTheme: boolean;
  themeString: string;
  appHostName: EAppHostName;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  aadUserId: string;
  context: BaseComponentContext;
  startUser: string;
  theme: Theme;
  containerWidth: number;

}
