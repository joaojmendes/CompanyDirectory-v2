# useUserData Hook

A React hook for fetching and managing Microsoft Graph user data to build organization charts in SharePoint Framework (SPFx) applications.

## Features

- ✅ Fetch user profile data from Microsoft Graph
- ✅ Get user's manager information
- ✅ Retrieve direct reports
- ✅ Find peers (colleagues with same manager)
- ✅ Search users in organization
- ✅ Build hierarchical organization tree
- ✅ Expandable organization nodes
- ✅ User photo support
- ✅ Error handling and loading states
- ✅ TypeScript support

## Installation

The hook is part of this SPFx project and uses the following dependencies:

```json
{
  "@emotion/css": "^11.13.5",
  "@fluentui/react-components": "^9.68.3",
  "@microsoft/sp-component-base": "1.21.1",
  "react": "17.0.1"
}
```

## Usage

### Basic Usage

```tsx
import React from 'react';
import { useUserData } from '../hooks/useUserData';
import { BaseComponentContext } from '@microsoft/sp-component-base';

interface MyComponentProps {
  context: BaseComponentContext;
  userId?: string;
}

const MyOrganizationChart: React.FC<MyComponentProps> = ({ context, userId }) => {
  const {
    userData,
    organizationTree,
    isLoading,
    error,
    refetch,
    searchUsers,
    searchResults,
    isSearching,
    clearSearch,
    expandNode
  } = useUserData({ 
    context, 
    userId // Optional: if not provided, uses current user
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {userData && (
        <div>
          <h2>{userData.user.displayName}</h2>
          <p>{userData.user.jobTitle}</p>
          
          {userData.manager && (
            <div>
              <h3>Manager</h3>
              <p>{userData.manager.displayName}</p>
            </div>
          )}
          
          {userData.directReports.length > 0 && (
            <div>
              <h3>Direct Reports</h3>
              {userData.directReports.map(report => (
                <div key={report.id}>
                  {report.displayName} - {report.jobTitle}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
```

### Advanced Usage with Search

```tsx
import React, { useState } from 'react';
import { SearchBox, Button } from '@fluentui/react-components';
import { useUserData } from '../hooks/useUserData';

const AdvancedOrganizationChart: React.FC<{ context: BaseComponentContext }> = ({ context }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    userData,
    organizationTree,
    isLoading,
    error,
    searchUsers,
    searchResults,
    isSearching,
    clearSearch,
    expandNode
  } = useUserData({ context });

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      await searchUsers(value);
    } else {
      clearSearch();
    }
  };

  return (
    <div>
      <SearchBox
        placeholder="Search for people..."
        value={searchTerm}
        onChange={(_, data) => handleSearch(data.value)}
      />
      
      {isSearching && <div>Searching...</div>}
      
      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          {searchResults.map(user => (
            <div key={user.id}>
              {user.displayName} - {user.jobTitle}
            </div>
          ))}
        </div>
      )}
      
      {organizationTree && (
        <OrganizationTreeComponent 
          node={organizationTree} 
          onExpand={expandNode} 
        />
      )}
    </div>
  );
};
```

## API Reference

### useUserData Hook

#### Parameters

```tsx
interface UseUserDataProps {
  context: BaseComponentContext;  // SPFx component context
  userId?: string;               // Optional user ID, defaults to current user
}
```

#### Return Value

```tsx
interface UseUserDataResult {
  userData: IUserData | undefined;
  organizationTree: IOrganizationNode | undefined;
  isLoading: boolean;
  error: string | undefined;
  refetch: () => Promise<void>;
  searchUsers: (searchTerm: string) => Promise<void>;
  searchResults: IUserProfile[];
  isSearching: boolean;
  clearSearch: () => void;
  expandNode: (nodeId: string) => Promise<void>;
}
```

### Data Types

#### IUserData
```tsx
interface IUserData {
  user: IUserProfile;
  manager?: IManager;
  directReports: IDirectReport[];
  peers: IDirectReport[];
}
```

#### IUserProfile
```tsx
interface IUserProfile {
  id: string;
  displayName: string;
  mail?: string;
  userPrincipalName: string;
  jobTitle?: string;
  department?: string;
  officeLocation?: string;
  businessPhones?: string[];
  mobilePhone?: string;
  companyName?: string;
  employeeId?: string;
  managerId?: string;
  aboutMe?: string;
  skills?: string[];
  photoUrl?: string;
}
```

#### IOrganizationNode
```tsx
interface IOrganizationNode {
  id: string;
  displayName: string;
  jobTitle?: string;
  department?: string;
  mail?: string;
  userPrincipalName: string;
  photoUrl?: string;
  managerId?: string;
  level: number;
  children: IOrganizationNode[];
  isExpanded?: boolean;
}
```

## Methods

### refetch()
Refetches all user data for the current user.

```tsx
const { refetch } = useUserData({ context });

// Refresh data
await refetch();
```

### searchUsers(searchTerm: string)
Searches for users in the organization.

```tsx
const { searchUsers, searchResults } = useUserData({ context });

// Search for users
await searchUsers('john');
console.log(searchResults); // Array of matching users
```

### expandNode(nodeId: string)
Expands/collapses a node in the organization tree and fetches children if needed.

```tsx
const { expandNode, organizationTree } = useUserData({ context });

// Expand a specific node
await expandNode('user-id-123');
```

### clearSearch()
Clears the current search results.

```tsx
const { clearSearch } = useUserData({ context });

clearSearch();
```

## Microsoft Graph Permissions

This hook requires the following Microsoft Graph permissions to be configured in your SPFx solution:

```json
{
  "webApiPermissionRequests": [
    {
      "resource": "Microsoft Graph",
      "scope": "User.Read"
    },
    {
      "resource": "Microsoft Graph", 
      "scope": "User.Read.All"
    },
    {
      "resource": "Microsoft Graph",
      "scope": "Directory.Read.All"
    }
  ]
}
```

Add these to your `package-solution.json` file in the `config` folder.

## Error Handling

The hook provides comprehensive error handling:

```tsx
const { error, isLoading } = useUserData({ context });

if (error) {
  // Handle specific errors
  if (error.includes('403')) {
    return <div>Insufficient permissions</div>;
  }
  if (error.includes('404')) {
    return <div>User not found</div>;
  }
  return <div>Error: {error}</div>;
}
```

## Performance Considerations

- User photos are fetched asynchronously and cached
- Organization tree nodes are loaded on-demand when expanded
- Search results are debounced to avoid excessive API calls
- All Graph API calls are properly error-handled

## Styling with @emotion/css

The hook works seamlessly with @emotion/css for styling:

```tsx
import { css } from '@emotion/css';

const nodeStyles = css`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  padding: 16px;
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;
```

## Examples

See the `OrganizationChartControl.tsx` component for a complete implementation example that includes:

- Modern UI with Fluent UI 9 components
- Gradient backgrounds with @emotion/css
- Search functionality
- Expandable tree structure
- Loading and error states
- Responsive design
