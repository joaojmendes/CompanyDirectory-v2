# useGraphAPIs Hook

A simplified and optimized version of the Graph API hook with improved error handling, performance, and best practices. **No React hooks dependencies** - uses simple async functions for maximum simplicity.

## Features

- **Simplified Implementation**: Cleaner code structure with no useCallback/useMemo overhead
- **Improved Error Handling**: Consistent error handling with proper logging
- **Better Performance**: Non-blocking photo fetches and optimized API calls
- **Type Safety**: Full TypeScript support with proper type definitions
- **Memory Efficiency**: Uses Promise.allSettled to handle partial failures gracefully
- **No React Hook Dependencies**: Simple async functions without useCallback/useMemo complexity

## Usage

```typescript
import { useGraphAPIs } from './hooks/useGraphAPIs';

const MyComponent = ({ context }) => {
  const {
    getUserProfile,
    getUserManager,
    getUserDirectReports,
    searchUsers,
    getUsers
  } = useGraphAPIs({ context });

  // Get current user profile
  const getCurrentUser = async () => {
    try {
      const profile = await getUserProfile();
      console.log('Current user:', profile);
    } catch (error) {
      console.error('Failed to get current user:', error);
    }
  };

  // Search for users
  const searchForUsers = async (searchTerm: string) => {
    try {
      const users = await searchUsers(searchTerm, 10);
      console.log('Search results:', users);
    } catch (error) {
      console.error('Failed to search users:', error);
    }
  };

  // Get paginated users with filtering
  const getFilteredUsers = async () => {
    try {
      const result = await getUsers(
        undefined, 
        20, 
        "startswith(displayName,'John')"
      );
      console.log('Filtered users:', result.users);
    } catch (error) {
      console.error('Failed to get filtered users:', error);
    }
  };
};
```

## API Reference

### Methods

#### `getUserProfile(userId?: string): Promise<IUserProfile>`
Gets user profile information including photo URL.
- `userId` (optional): User ID, defaults to current user

#### `getUserManager(userId?: string): Promise<IManager | undefined>`
Gets user's direct manager.
- Returns `undefined` if user has no manager

#### `getAllManagers(userId?: string): Promise<IManager[]>`
Gets all managers in the hierarchy up to the top.

#### `getUserDirectReports(userId?: string): Promise<IDirectReport[]>`
Gets user's direct reports.

#### `getUserPeers(userId?: string): Promise<IDirectReport[]>`
Gets user's colleagues (same manager's direct reports).

#### `getUserPhoto(userId?: string): Promise<string | undefined>`
Gets user photo as base64 data URL.
- Returns `undefined` if photo not found or invalid

#### `searchUsers(searchTerm: string, top?: number): Promise<IDirectReport[]>`
Searches users by display name, email, or UPN.
- `searchTerm`: Search term or OData filter expression
- `top`: Maximum results (default: 20)

#### `hasDirectReports(userId: string): Promise<boolean>`
Lightweight check if user has direct reports.

#### `getUsers(pageToken?: string, pageSize?: number, filter?: string): Promise<IUsersPageResultSimplified>`
Gets users with pagination support.
- `pageToken`: Next page token from previous response
- `pageSize`: Number of users per page (default: 20)
- `filter`: OData filter or search term

## Key Improvements Over Original Hook

### 1. Error Handling
- Consistent error handling with proper logging
- Non-critical errors (like photo fetch) don't break the flow
- Graceful degradation for missing data

### 2. Performance Optimizations
- Non-blocking photo fetches
- Promise.allSettled for handling partial failures
- Optimized API calls with minimal required fields

### 3. Code Quality
- Better TypeScript types without `any`
- No React hook dependencies (useCallback/useMemo removed)
- Consistent code structure
- Proper separation of concerns
- Comprehensive JSDoc comments

### 4. Memory Management
- Efficient Promise handling
- Proper cleanup of resources
- Optimized data structures
- No unnecessary memoization overhead

### 5. Maintainability
- Cleaner, more readable code
- Better abstraction layers
- Consistent naming conventions
- Modular design
- Simplified function declarations

## Error Handling Strategy

The hook implements a multi-layered error handling approach:

1. **Context Validation**: Early return with error functions if context is unavailable
2. **Graph API Errors**: Consistent handling with proper logging and sanitized data
3. **Photo Fetch Errors**: Non-blocking failures that don't affect main operations
4. **Partial Failures**: Using Promise.allSettled to handle arrays gracefully

## Best Practices Implemented

- ✅ Proper TypeScript types
- ✅ Consistent error handling
- ✅ Performance optimizations
- ✅ Memory efficiency
- ✅ Comprehensive logging
- ✅ Non-blocking operations
- ✅ Graceful degradation
- ✅ Proper abstraction
- ✅ Code reusability
- ✅ Maintainable structure
