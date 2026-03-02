import * as React from "react";

import { Card, CardHeader, mergeClasses } from "@fluentui/react-components";
import { IManager, IOrganizationNode } from "../../models/IUserData";

import { Actions } from "./Actions";
import { Details } from "./Details";
import { RenderPersonHeader } from "./RenderPersonHeader";
import { StackV2 as Stack } from "@spteck/react-controls";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { useAtom } from "jotai";
import { useCardActions } from "../../hooks/useCardActions";
import { usePersonCardStyles } from "./usePersonCardStyles";

export interface IPersonCardProps {
  person: IOrganizationNode | IManager;
  isCurrentUser?: boolean;
  isManager?: boolean;
  showDetails?: boolean;
  totalDirectReports?: number;
  isSelectedUser?: boolean;
}

export const PersonCard: React.FunctionComponent<IPersonCardProps> = (
  props: React.PropsWithChildren<IPersonCardProps>
) => {
  const {
    person,
    isManager = false,
    isCurrentUser = false,
    showDetails = false,
    totalDirectReports = 0,
    
  } = props;
  const [, setAppGlobalState] = useAtom(appGlobalStateAtom);
  const { getStyles, styles } = usePersonCardStyles();
  const { executeAction } = useCardActions({ person });

  const handleCardCClick = React.useCallback(() => {
    setAppGlobalState((prevState) => ({
      ...prevState,
      selectedUser: {...person, },
    }));
  }, [person, setAppGlobalState]);

const className = getStyles(props);
  
  return (
    <Stack padding="small">
      <Card
        className={mergeClasses(
          styles.card,
          className,
        )}
        onClick={handleCardCClick}
      >
       
        <CardHeader
          header={
            <RenderPersonHeader
              person={person}
              avatarSize={48}
              isManager={isManager}
              totalDirectReports={totalDirectReports}
            />
          }
          action={
            !isCurrentUser ? <Actions onActionClick={executeAction} person={person} /> : null
          }
        />

        <Details person={person} showDetails={showDetails} />
      </Card>
    </Stack>
  );
};
