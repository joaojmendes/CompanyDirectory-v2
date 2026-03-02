import * as React from "react";

import {
  Body1Strong,
  Caption1,
  tokens,
  Tooltip,
} from "@fluentui/react-components";
import { IManager, IOrganizationNode } from "../../models/IUserData";

import { StackV2 as Stack } from "@spteck/react-controls";
import { UserCard } from "@spteck/react-controls";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { useAtomValue } from "jotai";
import { usePersonCardStyles } from "./usePersonCardStyles";

export interface IRenderPersonHeaderProps {
  person: IOrganizationNode | IManager;
  avatarSize?: number;
  isManager?: boolean;
  totalDirectReports?: number;
  isCurrentUser?: boolean;
}

export const RenderPersonHeader: React.FunctionComponent<
  IRenderPersonHeaderProps
> = (props: React.PropsWithChildren<IRenderPersonHeaderProps>): JSX.Element => {
  const { person, avatarSize, totalDirectReports } = props;
  const { displayName, jobTitle, userPrincipalName } = person;
  const appglobalstate = useAtomValue(appGlobalStateAtom);
  const { context } = appglobalstate;
  const { styles } = usePersonCardStyles();

  return (
    <Stack
      gap="15px"
      direction="horizontal"
      className={styles.headerContainer}
      justifyContent="start"
      alignItems="center"
    >
      <UserCard
        userId={userPrincipalName}
        avatarSize={(avatarSize ?? 32) as 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128}
        context={context}
        avatarOnly={true}
      />
      <Stack justifyContent="start">
        <Stack
          direction="horizontal"
          gap="10px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Tooltip
            content={`${displayName}${totalDirectReports ? `, Direct Reports (${totalDirectReports})` : ""}`}
            relationship="label"
          >
            <Body1Strong className={styles.textStyle}>
              {displayName}{" "}
              {totalDirectReports ? (
                <Caption1
                  style={{
                    color: tokens.colorBrandBackground,
                    fontWeight: 600,
                  }}
                >
                  {` (${totalDirectReports})`}
                </Caption1>
              ) : null}
            </Body1Strong>
          </Tooltip>
        </Stack>

        <Tooltip
          content={jobTitle ?? "Job title not defined"}
          relationship="label"
        >
          <Caption1 className={styles.textStyle}>
            {jobTitle ?? "Job title not defined"}
          </Caption1>
        </Tooltip>
      </Stack>
    </Stack>
  );
};
