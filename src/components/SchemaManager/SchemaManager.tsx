import * as React from "react";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
} from "@fluentui/react-components";

import { BaseComponentContext } from "@microsoft/sp-component-base";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { UpdateUserSchema } from "../UpdateExtendAttribute/UpdateUserSchema";

export interface ISchemaManagerProps {
  context: BaseComponentContext;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const SchemaManager: React.FunctionComponent<ISchemaManagerProps> = ({
  context,
  isOpen,
  onClose,
}) => {
  return (
    <Drawer
      type="overlay"
      separator
      open={isOpen}
      onOpenChange={(_, { open }) => !open && onClose()}
      position="end"
      size="large"
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={onClose}
            />
          }
        >
          User Schema Manager
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <UpdateUserSchema
          context={context}
          onClose={onClose}
        />
      </DrawerBody>
    </Drawer>
  );
};
