import * as React from "react";

import { Divider } from "@fluentui/react-components";
import { IOrganizationNode } from "../../models/IUserData";
import { PersonCard } from "../PersonCard/PersonCard";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { useAtomValue } from "jotai";

export interface IRenderManagersProps {}

export const RenderManagers: React.FunctionComponent<
  IRenderManagersProps
> = () => {
  const appglobalstate = useAtomValue(appGlobalStateAtom);
  const { context, organizationTree } = appglobalstate;
  const { managers } = organizationTree || ({} as IOrganizationNode);

  const isCurrentUser = React.useCallback(
    (userId: string) =>
      userId === context.pageContext.legacyPageContext.aadUserId,
    [context.pageContext.legacyPageContext.aadUserId]
  );

  if (!organizationTree || !organizationTree.managers) {
    return <></>;
  }

  return (
    <>
      {managers.map((manager) => (
        <React.Fragment key={manager.id}>
          <PersonCard
            person={manager}
            isCurrentUser={isCurrentUser(manager.id)}
            isManager={true}
            totalDirectReports={manager.totalDirectReports}
          />
          <Divider vertical style={{ height: "20px", flexGrow: 0 }} />
        </React.Fragment>
      ))}
    </>
  );
};
