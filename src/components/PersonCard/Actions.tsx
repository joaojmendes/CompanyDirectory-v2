import * as React from "react";

import {
  CallRegular,
  ChatRegular,
  ChatVideoRegular,
  MailRegular,
  MoreVertical24Filled,
  MoreVertical24Regular,
  bundleIcon,
} from "@fluentui/react-icons";
import { IManager, IOrganizationNode, IUserProfile, } from "../../models/IUserData";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tooltip,
} from "@fluentui/react-components";

import { ECardActions } from "../../constants/ECardActions";
import { css } from "@emotion/css";

export interface IActionsProps {
  onActionClick?: (action: string) => void;
  person?: IOrganizationNode | IManager | IUserProfile;
}

export const Actions: React.FunctionComponent<IActionsProps> = (
  props: React.PropsWithChildren<IActionsProps>
) => {
  const { onActionClick, person } = props;

  const handleMenuItemClick = (
    actionKey: string,
    event: React.MouseEvent
  ): void => {
    event.stopPropagation();
    event.preventDefault();
    onActionClick?.(actionKey);
  };

  const handleMenuTriggerClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const MoreIcon = bundleIcon(MoreVertical24Filled, MoreVertical24Regular);

  const containerStyles = css({
    position: "absolute",
    top: 5,
    right: 5,
  });

 const enableAction = React.useMemo(
   () => (action: ECardActions) => {
     const user = person as IOrganizationNode & IManager & IUserProfile;
     if (!person) return false;
      switch (action) {
        case ECardActions.Call:
        case ECardActions.Video:
          return  Boolean(user?.phone ?? user?.mobilePhone);
        case ECardActions.Chat:
          return Boolean(user.mail || user.userPrincipalName);
        case ECardActions.Mail:
          return Boolean(user.mail);
        default:
          return false;
      } 
   },
   [person]
 );

  return (
    <div className={containerStyles} onClick={handleMenuTriggerClick}>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Tooltip content="actions" relationship="label">
            <MenuButton
              appearance="subtle"
              icon={<MoreIcon />}
              onClick={handleMenuTriggerClick}
               disabled={
                 !enableAction(ECardActions.Call) &&
                 !enableAction(ECardActions.Video) &&
                 !enableAction(ECardActions.Chat) &&
                 !enableAction(ECardActions.Mail)
               }
              size="small"
            />
          </Tooltip>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem
              icon={<ChatRegular />}
              onClick={(ev) => handleMenuItemClick(ECardActions.Chat, ev)}
              disabled={!enableAction(ECardActions.Chat)}
            >
              Start a chat
            </MenuItem>
            <MenuItem
              icon={<MailRegular />}
              onClick={(ev) => handleMenuItemClick(ECardActions.Mail, ev)}
              disabled={!enableAction(ECardActions.Mail)}
            >
              Send an email
            </MenuItem>
            <MenuItem
              icon={<CallRegular />}
              onClick={(ev) => handleMenuItemClick(ECardActions.Call, ev)}
              disabled={!enableAction(ECardActions.Call)}
            >
              Make a call
            </MenuItem>
            <MenuItem
              icon={<ChatVideoRegular />}
              onClick={(ev) => handleMenuItemClick(ECardActions.Video, ev)}
              disabled={!enableAction(ECardActions.Video)}
            >
              Start a video call
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
