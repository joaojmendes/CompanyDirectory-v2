import * as React from "react";

import { Divider, Spinner } from "@fluentui/react-components";
import { ErrorType, useLogging } from "@spteck/m365-hooks";
import { ShowError, StackV2 as Stack } from "@spteck/react-controls";

import { IUserProfile } from "../../models/IUserData";
import { RenderDirectReports } from "../RenderDirectReports";
import { RenderManagers } from "../RenderManagers";
import { RenderSelectedUser } from "../RenderSelectedUser";
import { UserPicker } from "../UserPicker";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { useAtom } from "jotai";
import { useOrganizationChartData } from "../../hooks";
import { useOrganizationChartStyles } from "./useOrganizationChartStyles";
import { useUtils } from "../../hooks/useUtils";

interface IOrganizationChartProps {}

export const OrganizationChart: React.FunctionComponent<
  IOrganizationChartProps
> = (props: React.PropsWithChildren<IOrganizationChartProps>) => {
  const [appGlobalstate, setAppGlobalState] = useAtom(appGlobalStateAtom);
  const styles = useOrganizationChartStyles(appGlobalstate);
  const { selectedUser, context, aadUserId } = appGlobalstate;
  const { logInfo, logError } = useLogging();
  const [selectedPickerUsers, setSelectedPickerUsers] = React.useState<
    IUserProfile[]
  >([]);
  const { sanitizeUserData } = useUtils();
  const { organizationTree, isLoading, error, fetchUserData } =
    useOrganizationChartData({ context });

  const handleSelectionChange = React.useCallback(
    (users: IUserProfile[]) => {
      setSelectedPickerUsers(users);

      // If a user is selected, fetch their organization chart data
      if (users.length > 0) {
        const selectedUser = users[users.length - 1]; // Get the most recently selected user
        logInfo(
          "OrganizationChart",
          "Fetching organization data for selected user",
          sanitizeUserData({
            operation: "handleSelectionChange",
            userId: selectedUser.id,
            displayName: selectedUser.displayName,
            selectedUsersCount: users.length,
          })
        );

        // Update global state with the selected user
        setAppGlobalState((prevState) => ({
          ...prevState,
          selectedUser: selectedUser,
        }));

        // Fetch organization chart data for the selected user
        fetchUserData(selectedUser.id).catch((error) => {
          logError(
            "OrganizationChart",
            "Error fetching organization data for selected user",
            error as Error,
            ErrorType.SYSTEM,
            sanitizeUserData({
              operation: "fetchUserData",
              userId: selectedUser.id,
              displayName: selectedUser.displayName,
              errorMessage: (error as Error)?.message,
            })
          );
        });
      } else {
        // No users selected, clear the global state and fetch current user data
        logInfo(
          "OrganizationChart",
          "Selection cleared, fetching data for current user",
          sanitizeUserData({
            operation: "handleSelectionChange",
            action: "clearSelection",
            aadUserId,
          })
        );

        setAppGlobalState((prevState) => ({
          ...prevState,
          selectedUser: undefined,
        }));

        // Fetch the current user's organization chart data
        fetchUserData(aadUserId).catch((error) => {
          logError(
            "OrganizationChart",
            "Error fetching organization data for current user",
            error as Error,
            ErrorType.SYSTEM,
            sanitizeUserData({
              operation: "fetchUserData",
              userId: aadUserId,
              action: "fetchCurrentUser",
              errorMessage: (error as Error)?.message,
            })
          );
        });
      }

      logInfo(
        "OrganizationChart",
        "Selected users changed",
        sanitizeUserData({
          operation: "handleSelectionChange",
          selectedUsersCount: users.length,
          userIds: users.map((u) => u.id),
        })
      );
    },
    [fetchUserData, setAppGlobalState, aadUserId]
  );

  React.useEffect(() => {
    (async () => {
      setAppGlobalState((prevState) => ({
        ...prevState,
        selectedUser: undefined,
        organizationTree: undefined,
      }));
      logInfo(
        "OrganizationChart",
        "Component mounted, fetching data for current user",
        sanitizeUserData({
          operation: "componentDidMount",
          aadUserId,
        })
      );
      await fetchUserData(aadUserId);
    })().catch(() => { /* handled internally */ });
  }, []);

  React.useEffect(() => {
    (async () => {
      if (selectedUser) {
        await fetchUserData(selectedUser?.id);
        // check if selected user is equal of searchUser
        if (selectedUser?.id !== selectedPickerUsers[0]?.id) {
          setSelectedPickerUsers([]);
        }
      }
    })().catch(() => { /* handled internally */ });
  }, [selectedUser]);

  // update Global State
  React.useEffect(() => {
    setAppGlobalState((prevState) => ({
      ...prevState,
      organizationTree: organizationTree,
      selectedUser: undefined,
    }));
  }, [organizationTree]);

  if (isLoading) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        className={styles.loadingContainer}
        style={{ minHeight: "700px" }}
      >
        <Spinner />
      </Stack>
    );
  }

  if (error) {
    return <ShowError message={error} />;
  }

  return (
    <>
      <Stack width="100%" data-id="conatiner-org" style={{ minHeight: "700px" }}>
        <Stack
          direction="horizontal"
          justifyContent="end"
          paddingBottom="35px"
          paddingLeft="15px"
          paddingRight="15px"
        >
          <UserPicker
            width="400px"
            context={context}
            selectedUsers={selectedPickerUsers}
            onSelectionChange={handleSelectionChange}
            placeholder="Type to search for employee..."
            maxSelectedOptions={1}
          />
        </Stack>
        <Stack
          padding="medium"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <RenderManagers />
          <RenderSelectedUser />
        </Stack>
        <Divider className={styles.divider} />

        <RenderDirectReports />
      </Stack>
    </>
  );
};
