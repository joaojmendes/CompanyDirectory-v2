/** @jsxImportSource @emotion/react */
import * as React from "react";
import {
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
} from "@fluentui/react-components";
import { Edit24Regular, Dismiss24Regular } from "@fluentui/react-icons";
import { BaseComponentContext } from "@microsoft/sp-component-base";
import { UpdateUserSchema } from "./UpdateUserSchema";
import { IUserSchemaExtensionData } from "../../hooks/useSchemaExtensionUpdate";

export interface IUpdateUserSchemaManagerProps {
  context: BaseComponentContext;
  buttonText?: string;
  drawerTitle?: string;
  className?: string;
}

export const UpdateUserSchemaManager: React.FunctionComponent<IUpdateUserSchemaManagerProps> = ({
  context,
  buttonText = "Update User Properties",
  drawerTitle = "Update User Schema Properties",
  className,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

  const handleOpenDrawer = React.useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = React.useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const handleSuccess = React.useCallback((userId: string, data: IUserSchemaExtensionData) => {
    console.log("User schema updated successfully:", { userId, data });
    // Optionally keep drawer open or close it
    // setIsDrawerOpen(false);
  }, []);

  return (
    <div className={className}>
      <Button
        appearance="primary"
        icon={<Edit24Regular />}
        onClick={handleOpenDrawer}
      >
        {buttonText}
      </Button>

      <OverlayDrawer
        open={isDrawerOpen}
        onOpenChange={(_, { open }) => setIsDrawerOpen(open)}
        position="end"
        size="large"
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close drawer"
                icon={<Dismiss24Regular />}
                onClick={handleCloseDrawer}
              />
            }
          >
            {drawerTitle}
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <UpdateUserSchema
            context={context}
            onClose={handleCloseDrawer}
            onSuccess={handleSuccess}
          />
        </DrawerBody>
      </OverlayDrawer>
    </div>
  );
};