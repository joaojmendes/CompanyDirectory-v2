import * as React from "react";

import { OrganizationRegular, PeopleTeamRegular } from "@fluentui/react-icons";

import { ButtonToolBar } from "../toolbar/ButtonToolbar";
import { EmployeesView } from "../EmployeesView/EmployeesView";
import { IButtonItem } from "../toolbar/IButtonItem";
import { ICompanyDirectoryProps } from "./ICompanyDirectoryProps";
import { OrganizationChart } from "../OrganizationChart/OrganizationChart";
import { StackV2 as Stack } from "@spteck/react-controls";
import { Subtitle1 } from "@fluentui/react-components";
import { appGlobalStateAtom } from "../../atoms/appGlobalState";
import { useAtom } from "jotai";
import { useCompanyDirectoryStyles } from "./useCompanyDirectoryStyles";
import { SchemaManager } from "../SchemaManager";

const enum toolbarOptions {
  DIRECTORY = "directory",
  ORG_CHART = "orgchart",
}

export const CompanyDirectoryControl: React.FunctionComponent<
  ICompanyDirectoryProps
> = (props: React.PropsWithChildren<ICompanyDirectoryProps>) => {
  const { title } = props;
  const [, setAppGlobalState] = useAtom(appGlobalStateAtom);
  const styles = useCompanyDirectoryStyles();
  const { context } = props;
  const [selectedValue, setSelectedValue] = React.useState<string>(
    toolbarOptions.DIRECTORY,
  );

  React.useEffect(() => {
    setAppGlobalState((prevState) => ({
      ...prevState,
      selectedUser: undefined,
      ...props,
    }));
  }, [props]);

  const onButtonClick = React.useCallback(
    (value: string): void => {
      setSelectedValue(value);
    },
    [setSelectedValue],
  );

  const toolbarItems: IButtonItem[] = React.useMemo(
    () => [
      {
        id: toolbarOptions.DIRECTORY,
        name: "Directory",
        icon: <PeopleTeamRegular />,
      },
      {
        id: toolbarOptions.ORG_CHART,
        name: "Org. Chart",
        icon: <OrganizationRegular />,
      },
    ],
    [],
  );

  const renderTabList = React.useCallback((): JSX.Element => {
    return (
      <Stack
        direction="horizontal"
        gap="small"
        paddingLeft="15px"
        paddingRight="15px"
      >
        <ButtonToolBar
          items={toolbarItems}
          selectedItemId={selectedValue}
          onSelectedItem={onButtonClick}
        />
      </Stack>
    );
  }, [selectedValue, onButtonClick, toolbarItems]);

  const renderCommandbar = React.useCallback((): JSX.Element => {
    return (
      <Stack
        justifyContent="space-between"
        alignItems="start"
        direction="horizontal"
      >
        {renderTabList()}
      </Stack>
    );
  }, [renderTabList]);

  if (!context) {
    return null;
  }

  return (
    <Stack>
      <Stack paddingBottom="20px" paddingLeft="15px" paddingRight="15px">
        <SchemaManager context={context} isOpen={false} onClose={function (): void {
          throw new Error("Function not implemented.");
        } } />    
        <Subtitle1>{title}</Subtitle1>
      </Stack>
      <div className={styles.container}>
        {renderCommandbar()}
        <Stack direction="horizontal" justifyContent="start">
          {selectedValue === "orgchart" ? (
            <OrganizationChart />
          ) : (
            <EmployeesView />
          )}
        </Stack>
      </div>
    </Stack>
  );
};
