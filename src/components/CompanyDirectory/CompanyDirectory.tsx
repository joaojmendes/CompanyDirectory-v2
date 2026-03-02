import * as React from "react";

import { ErrorType, useAppToast, useLogging } from "@spteck/m365-hooks";
import {
  FluentProvider,
  IdPrefixProvider,
  Theme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  tokens,
} from "@fluentui/react-components";

import { CompanyDirectoryControl } from "./CompanyDirectoryControl";
import { EAppHostName } from "../../constants/EAppHostName";
import { ErrorBoundary } from "react-error-boundary";
import { ICompanyDirectoryProps } from "./ICompanyDirectoryProps";
import { Provider } from "jotai";
import { ShowError } from "@spteck/react-controls";
import { createV9Theme } from "@fluentui/react-migration-v8-v9";
import { useUtils } from "../../hooks/useUtils";

export const CompanyDirectory: React.FunctionComponent<
  ICompanyDirectoryProps
> = (props: React.PropsWithChildren<ICompanyDirectoryProps>) => {
  const { themeString, theme, hasTeamsContext, context, appHostName } = props;
  const { logError } = useLogging();
  const { ToasterProvider } = useAppToast();
  const { sanitizeUserData } = useUtils();
  const computedTheme = React.useMemo<Partial<Theme>>(() => {
    if (hasTeamsContext) {
      switch (themeString) {
        case "dark":
          return teamsDarkTheme;
        case "contrast":
          return teamsHighContrastTheme;
        default:
          return { ...teamsLightTheme };
      }
    }
    return createV9Theme(theme as never);
  }, [themeString, theme, hasTeamsContext]);

  const fallbackRender = ({ error }: { error: unknown }): React.ReactNode => {
    logError(
      "About",
      "Error boundary caught an error in About component",
      error as Error,
      ErrorType.SYSTEM,
      sanitizeUserData({
        themeString,
        hasTeamsContext,
        errorMessage: (error as Error)?.message,
        errorStack: (error as Error)?.stack,
      })
    );
    return <ShowError message={(error as Error)?.message ?? "An unexpected error occurred"} />;
  };

  if (!context) {
    return <></>;
  }

  return (
    <IdPrefixProvider value="about-v2">
      <FluentProvider
        theme={computedTheme}
        applyStylesToPortals={true}
        style={{
          backgroundColor:
            appHostName === EAppHostName.SharePoint
              ? "transparent"
              : tokens.colorNeutralBackground2,
          height: "100%",
        }}
      >
        <ErrorBoundary fallbackRender={fallbackRender}>
          <Provider>
            <CompanyDirectoryControl {...props} />
            <ToasterProvider />
          </Provider>
        </ErrorBoundary>
      </FluentProvider>
    </IdPrefixProvider>
  );
};
