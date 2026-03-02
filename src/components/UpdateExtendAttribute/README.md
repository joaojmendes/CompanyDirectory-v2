# Update User Schema Extension Control

This component allows you to update custom schema extension properties for users in Microsoft Graph. It's specifically designed to work with the `extinwbntrw_spUserProfile` schema extension that includes skills and projects fields.

## Features

- ✅ User picker with search functionality
- ✅ Update 5 skills fields (skillsline1-5)
- ✅ Update 5 projects fields (projectsline1-5)
- ✅ Form validation and error handling
- ✅ Loading states and success feedback
- ✅ Reset functionality to restore original values
- ✅ Modern Fluent UI design
- ✅ TypeScript support
- ✅ Responsive layout

## Components

### UpdateUserSchema
The main component for updating user schema properties.

### UpdateUserSchemaManager
A wrapper component that provides a button to open the UpdateUserSchema in a drawer.

### useSchemaExtensionUpdate Hook
A custom hook for managing schema extension operations.

## Usage

### Basic Usage with Manager Component

```tsx
import { UpdateUserSchemaManager } from './components/UpdateExtendAttribute';

// Simple usage - includes button and drawer
<UpdateUserSchemaManager 
  context={this.context}
  buttonText="Update User Properties"
  drawerTitle="Update User Schema Properties"
/>
```

### Custom Usage with UpdateUserSchema Component

```tsx
import { UpdateUserSchema } from './components/UpdateExtendAttribute';
import { IUserSchemaExtensionData } from './hooks/useSchemaExtensionUpdate';

const [isOpen, setIsOpen] = useState(false);

const handleSuccess = (userId: string, data: IUserSchemaExtensionData) => {
  console.log('Updated user:', userId, data);
  // Handle success (e.g., show notification, refresh data)
};

<UpdateUserSchema
  context={this.context}
  onClose={() => setIsOpen(false)}
  onSuccess={handleSuccess}
/>
```

### Using the Hook Directly

```tsx
import { useSchemaExtensionUpdate } from './hooks/useSchemaExtensionUpdate';

const MyComponent = () => {
  const { 
    getUserSchemaExtension, 
    updateUserSchemaExtension, 
    isLoading, 
    error 
  } = useSchemaExtensionUpdate({ context });
  
  const updateUserData = async (userId: string) => {
    try {
      const success = await updateUserSchemaExtension(userId, {
        skillsline1: 'React',
        skillsline2: 'TypeScript',
        projectsline1: 'Company Directory',
        // ... other fields
      });
      
      if (success) {
        console.log('User updated successfully');
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };
};
```

## Required Permissions

Your application needs the following Microsoft Graph permissions:

```json
{
  "webApiPermissionRequests": [
    {
      "resource": "Microsoft Graph",
      "scope": "User.ReadWrite.All"
    },
    {
      "resource": "Microsoft Graph",
      "scope": "Directory.ReadWrite.All"
    }
  ]
}
```

Add these to your `package-solution.json` file in the `config` folder.

## Schema Extension Structure

The component works with the following schema extension:

```json
{
  "id": "extinwbntrw_spUserProfile",
  "description": "Additional user profile information",
  "targetTypes": ["User"],
  "properties": [
    { "name": "skillsline1", "type": "String" },
    { "name": "skillsline2", "type": "String" },
    { "name": "skillsline3", "type": "String" },
    { "name": "skillsline4", "type": "String" },
    { "name": "skillsline5", "type": "String" },
    { "name": "projectsline1", "type": "String" },
    { "name": "projectsline2", "type": "String" },
    { "name": "projectsline3", "type": "String" },
    { "name": "projectsline4", "type": "String" },
    { "name": "projectsline5", "type": "String" }
  ]
}
```

## Props

### UpdateUserSchema Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `context` | `BaseComponentContext` | Yes | SPFx component context |
| `onClose` | `() => void` | No | Callback when closing the component |
| `onSuccess` | `(userId: string, data: IUserSchemaExtensionData) => void` | No | Callback when update is successful |
| `className` | `string` | No | Additional CSS class name |

### UpdateUserSchemaManager Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `context` | `BaseComponentContext` | Yes | SPFx component context |
| `buttonText` | `string` | No | Text for the trigger button (default: "Update User Properties") |
| `drawerTitle` | `string` | No | Title for the drawer (default: "Update User Schema Properties") |
| `className` | `string` | No | Additional CSS class name |

## Data Interface

```typescript
interface IUserSchemaExtensionData {
  skillsline1?: string;
  skillsline2?: string;
  skillsline3?: string;
  skillsline4?: string;
  skillsline5?: string;
  projectsline1?: string;
  projectsline2?: string;
  projectsline3?: string;
  projectsline4?: string;
  projectsline5?: string;
}
```

## Error Handling

The component handles various error scenarios:

- **Permission errors**: User-friendly messages for access issues
- **User not found**: Proper error handling for invalid user IDs
- **Network errors**: Proper error handling with retry capabilities
- **Validation errors**: Form validation with inline error messages

## Styling

The component uses:
- Fluent UI 9 components for consistent design
- Emotion CSS-in-JS for custom styling
- Responsive grid layout for form fields
- Smooth animations and hover effects

## Dependencies

- `@fluentui/react-components`: UI components
- `@fluentui/react-icons`: Icons
- `@microsoft/sp-component-base`: SPFx base context
- `@microsoft/sp-http`: SharePoint HTTP client
- `@spteck/m365-hooks`: Logging hooks
- `@emotion/css`: Styling

## Notes

- The component automatically loads existing schema extension data when a user is selected
- Empty fields are saved as `null` to clear existing values
- The form includes reset functionality to restore original values
- Success messages are shown after successful updates
- The component is fully accessible and follows Fluent UI design patterns