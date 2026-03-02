import * as React from "react";

import { Icon } from "@iconify/react";
import { Text } from "@fluentui/react-components";
import { useRenderNoUsersStyles } from "./useRenderNoUsersStyles";

export interface IRenderNoUsersProps {
  isSearchMode: boolean;
}

export const RenderNoUsers: React.FunctionComponent<IRenderNoUsersProps> = (
  props: React.PropsWithChildren<IRenderNoUsersProps>
) => {
  const { isSearchMode } = props;
  const { styles } = useRenderNoUsersStyles();
  return (
    <>
      <div className={styles.emptyContainer}>
        <Icon
          className={styles.emptyIcon}
          icon="fluent:building-people-24-regular"
          width="120"
          height="120"
        />
        <Text weight="semibold" size={400}>
          {isSearchMode ? "No users found for your search" : "No users found"}
        </Text>
      </div>
    </>
  );
};
