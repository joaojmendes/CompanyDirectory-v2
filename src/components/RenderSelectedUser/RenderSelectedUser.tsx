import * as React from "react";

import { Divider, tokens } from "@fluentui/react-components";

import { IOrganizationNode } from "../../models/IUserData";
import { PersonCard } from "../PersonCard/PersonCard";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { css } from "@emotion/css";
import { useAtomValue } from "jotai";

export interface IRenderSelectedUserProps {}

export const RenderSelectedUser: React.FunctionComponent<IRenderSelectedUserProps> = () => {
  
  const appglobalstate = useAtomValue(appGlobalStateAtom)
  const { context, organizationTree } = appglobalstate;
  const { id, totalDirectReports  } = organizationTree  || {} as IOrganizationNode;
  const isCurrentUser = React.useMemo(() => id === context.pageContext.legacyPageContext.aadUserId, [id, context])  ;


  const divider = css({
    height: "20px",
    flexGrow: 0,
    "::before": {
      borderColor: tokens.colorNeutralStroke1,
    },
    "::after": {
      borderColor: tokens.colorNeutralStroke1,
    },
  });

  if (!organizationTree) {
    return <></>;
  }

  return (
    <>
      <PersonCard
        key={id}
        person={organizationTree}
        isCurrentUser={isCurrentUser}
        isManager={totalDirectReports! > 0}
        totalDirectReports={totalDirectReports}
        isSelectedUser={true}
      />
      <Divider vertical  className={divider} />
    </>
  );
};
