import * as React from "react";

import { Badge, Divider } from "@fluentui/react-components";

import { IPersonCardProps } from "./PersonCard";
import { Icon } from "@iconify/react";
import {
  LocationRegular
} from "@fluentui/react-icons";
import { RenderAttribute } from "../RenderAttribute";
import { StackV2 as Stack } from "@spteck/react-controls";
 
import { usePersonCardStyles } from "./usePersonCardStyles";

export const Details: React.FunctionComponent<IPersonCardProps> = (
  props: React.PropsWithChildren<IPersonCardProps>
) => {
  const { person, showDetails } = props;
  const { department, location, userType } = person;
 
  const { styles } = usePersonCardStyles( );

  if (!showDetails) return null;

  return (
    <>
      {showDetails && (
        <Stack>
          <Divider style={{ paddingBottom: "8px" }} />

          <Stack
            direction="horizontal"
            gap="5px"
            alignItems="start"
            justifyContent="space-between"
          >
            <RenderAttribute
              label="Department"
              value={department}
              icon={
                <Icon icon="mingcute:department-line" className={styles.icon} />
              }
            />
            {userType === "Guest" ? (
              <Badge color="warning" size="medium">
                {userType}
              </Badge>
            ) : null}
          </Stack>

          <Divider style={{ opacity: 0.4, paddingBottom: "8px" }} />
          <RenderAttribute
            label="Location"
            value={location}
            icon={<LocationRegular className={styles.icon} />}
          />
        </Stack>
      )}
    </>
  );
};
