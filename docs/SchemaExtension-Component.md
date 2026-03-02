# Schema Extension Component

This component allows you to create and manage Microsoft Graph Schema Extensions through a user-friendly interface built with Fluent UI components.

## Overview

The Schema Extension component consists of:

- **SchemaExtensionDrawer**: A drawer component for creating schema extensions
- **SchemaExtensionManager**: A simple manager component that provides a button to open the drawer
- **useSchemaExtension**: A hook for interacting with Microsoft Graph Schema Extensions API
- **ISchemaExtension**: TypeScript models for schema extension data

## Features

- ✅ Create schema extensions with custom properties
- ✅ Support for multiple property types (String, Integer, Boolean, DateTime, Binary)
- ✅ Support for multiple target types (User, Group, Organization, Contact, Device)
- ✅ Form validation with error messages
- ✅ Uses RenderAttribute component for consistent styling
- ✅ Built with Fluent UI Drawer component
- ✅ TypeScript support with proper interfaces
- ✅ Error handling and loading states
- ✅ Success feedback

## Usage

### Basic Usage with SchemaExtensionManager

```tsx
import { SchemaExtensionManager } from './components/SchemaExtensionManager';

// Simple usage - includes button and drawer
<SchemaExtensionManager />
```

### Custom Usage with SchemaExtensionDrawer

```tsx
import { SchemaExtensionDrawer } from './components/SchemaExtensionDrawer';
import { ISchemaExtension } from './models/ISchemaExtension';

const [isOpen, setIsOpen] = useState(false);

const handleSchemaExtensionCreated = (schemaExtension: ISchemaExtension) => {
  console.log('Created:', schemaExtension);
  // Handle success (e.g., show notification, refresh list)
};

<SchemaExtensionDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSchemaExtensionCreated={handleSchemaExtensionCreated}
/>
```

### Using the Hook Directly

```tsx
import { useSchemaExtension } from './hooks/useSchemaExtension';

const MyComponent = () => {
  const { createSchemaExtension, getSchemaExtensions } = useSchemaExtension({ context });
  
  const createExtension = async () => {
    const extension = await createSchemaExtension({
      id: 'MyExtension',
      description: 'My custom extension',
      targetTypes: ['User'],
      properties: [
        { name: 'customField', type: 'String' }
      ],
      owner: 'your-app-id'
    });
  };
};
```

## Required Permissions

Your application needs the following Microsoft Graph permissions:

- `Application.ReadWrite.All` (for creating schema extensions)
- `Directory.AccessAsUser.All` (for reading/writing schema extensions)

## Form Fields

### Extension ID
- **Required**: Yes
- **Format**: Letters, numbers, and underscores only
- **Example**: `MyCompanyUserExtension`

### Description
- **Required**: Yes
- **Format**: Free text
- **Example**: `Custom fields for user profiles in my organization`

### Owner (App ID)
- **Required**: Yes
- **Format**: GUID of your Azure AD application
- **Example**: `12345678-1234-1234-1234-123456789012`

### Target Types
- **Required**: At least one must be selected
- **Options**: User, Group, Organization, Contact, Device
- **Multiple**: Yes

### Properties
- **Required**: At least one property with a name
- **Name Format**: Must start with a letter, can contain letters, numbers, underscores
- **Types**: String, Integer, Boolean, DateTime, Binary
- **Multiple**: Yes (use Add Property button)

## Property Types

- **String**: Text data (default)
- **Integer**: Numeric data (whole numbers)
- **Boolean**: True/false values
- **DateTime**: Date and time values
- **Binary**: Binary data

## Target Types

- **User**: Extends user objects
- **Group**: Extends group objects  
- **Organization**: Extends organization objects
- **Contact**: Extends contact objects
- **Device**: Extends device objects

## Validation Rules

- Extension ID: Required, alphanumeric + underscores only
- Description: Required
- Owner: Required (should be your app's client ID)
- Properties: At least one with valid name
- Property names: Must start with letter, alphanumeric + underscores only
- No duplicate property names allowed
- At least one target type must be selected

## Error Handling

The component handles various error scenarios:

- **Validation errors**: Displayed inline with form fields
- **API errors**: Displayed at the bottom of the drawer
- **Permission errors**: User-friendly messages for access issues
- **Network errors**: Proper error handling with retry capabilities

## Styling

The component uses Emotion CSS-in-JS for styling and follows Fluent UI design patterns. Styles are defined in `useSchemaExtensionDrawerStyles.ts`.

## Dependencies

- `@fluentui/react-components`: UI components
- `@fluentui/react-icons`: Icons
- `@microsoft/sp-http`: SharePoint HTTP client
- `@microsoft/microsoft-graph-types`: Graph types
- `@spteck/m365-hooks`: Logging hooks
- `jotai`: State management
- `@emotion/css`: Styling

## Notes

- Schema extensions created in development mode need to be approved before they can be used in production
- The extension ID becomes part of the property names in Graph API calls
- Once created, schema extensions cannot be deleted, only deprecated
- Properties cannot be removed from schema extensions after creation
- The owner app ID determines which application can manage the schema extension