/** @jsxImportSource @emotion/react */
import * as React from "react";
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { UpdateUserSchemaManager } from "../UpdateExtendAttribute";
import { BaseComponentContext } from "@microsoft/sp-component-base";

const useExampleStyles = makeStyles({
  container: {
    padding: tokens.spacingVerticalXXL,
    maxWidth: "1200px",
    margin: "0 auto",
  },
  
  header: {
    marginBottom: tokens.spacingVerticalXL,
    textAlign: "center",
  },
  
  title: {
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightBold,
    marginBottom: tokens.spacingVerticalM,
    color: tokens.colorBrandForeground1,
  },
  
  description: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase400,
  },
  
  demoSection: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: tokens.spacingVerticalXL,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
});

export interface IUpdateUserSchemaExampleProps {
  context: BaseComponentContext;
}

export const UpdateUserSchemaExample: React.FunctionComponent<IUpdateUserSchemaExampleProps> = ({
  context,
}) => {
  const styles = useExampleStyles();

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            User Schema Extension Update Demo
          </h1>
          <p className={styles.description}>
            This demo shows how to use the UpdateUserSchemaManager component to update
            custom schema extension properties for users. The component allows you to
            update skills and projects information for any user in your organization.
          </p>
        </div>

        <div className={styles.demoSection}>
          <UpdateUserSchemaManager
            context={context}
            buttonText="Update User Skills & Projects"
            drawerTitle="Update User Profile Information"
          />
        </div>
      </div>
    </FluentProvider>
  );
};