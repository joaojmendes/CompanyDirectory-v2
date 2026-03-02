import { IManager, IOrganizationNode, IUserData, IUserProfile } from "./IUserData";

import { ICompanyDirectoryProps } from "../components/CompanyDirectory/ICompanyDirectoryProps";

export interface IAppGlobalState extends ICompanyDirectoryProps {
  isLoading?: boolean;
  error?: string;
  userData?: IUserData;
  organizationTree?: IOrganizationNode;
  searchResults?: IUserProfile[];
  isSearching?: boolean;
  selectedUser?: IOrganizationNode | IManager
}
