import * as React from "react";

import { Badge, Divider } from "@fluentui/react-components";

import { IPersonCardProps } from "./PersonCard";
import { Icon } from "@iconify/react";
import {
  LocationRegular
} from "@fluentui/react-icons";
/* import { Link } from "@fluentui/react-components"; */
import { RenderAttribute } from "../RenderAttribute";
import { StackV2 as Stack } from "@spteck/react-controls";
 
import { usePersonCardStyles } from "./usePersonCardStyles";

export const Details: React.FunctionComponent<IPersonCardProps> = (
  props: React.PropsWithChildren<IPersonCardProps>
) => {
  const { person, showDetails } = props;
  const { /* mail, phone, */ department, location, userType } = person;
 
  const { styles } = usePersonCardStyles( );

/*   const handleEmailClick = (
    emailAddress: string
  ): ((e: React.MouseEvent) => void) => {
    return (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      window.open(`mailto:${emailAddress}`, "_blank");
    };
  }; */

  if (!showDetails) return null;

  return (
    <>
      {showDetails && (
        <Stack>
          {/*  <RenderAttribute
            label="Email"
            value={
              mail ? (
                <Link 
                  onClick={handleEmailClick(mail)}
                  className={styles.linkTruncate}
                >
                  {mail}
                </Link>
              ) : (
                mail
              )
            }
            icon={<MailRegular className={styles.icon} />}
          />
 */}
          {/*   <RenderAttribute
            label="Phone"
            value={
              phone ? (
                <Link
                  href={`tel:${phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={styles.linkTruncate}
                >
                  {phone}
                </Link>
              ) : (
                phone
              )
            }
            icon={<PhoneRegular className={styles.icon} />}
          /> */}
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
