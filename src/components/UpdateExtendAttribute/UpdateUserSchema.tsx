import * as React from "react";
import {
  Button,
  Field,
  Input,
  Spinner,
  Text,
  MessageBar,
  Card,
  Persona,
} from "@fluentui/react-components";
import {
  Save24Regular,
  Dismiss24Regular,
  ArrowReset24Regular,
} from "@fluentui/react-icons";
import { BaseComponentContext } from "@microsoft/sp-component-base";
import { UserPicker } from "../UserPicker/UserPicker";
import { IUserProfile } from "../../models/IUserData";
import { 
  useSchemaExtensionUpdate, 
  IUserSchemaExtensionData 
} from "../../hooks/useSchemaExtensionUpdate";
import { 
  useUpdateUserSchemaStyles
} from "./useUpdateUserSchemaStyles";

export interface IUpdateUserSchemaProps {
  context: BaseComponentContext;
  onClose?: () => void;
  onSuccess?: (userId: string, data: IUserSchemaExtensionData) => void;
  className?: string;
}

export const UpdateUserSchema: React.FunctionComponent<IUpdateUserSchemaProps> = ({
  context,
  onClose,
  onSuccess,
  className,
}) => {
  const styles = useUpdateUserSchemaStyles;
  const {
    getUserSchemaExtension,
    updateUserSchemaExtension,
    isLoading,
    error,
  } = useSchemaExtensionUpdate({ context });

  // State management
  const [selectedUser, setSelectedUser] = React.useState<IUserProfile | undefined>(undefined);
  const [formData, setFormData] = React.useState<IUserSchemaExtensionData>({
    skillsline1: "",
    skillsline2: "",
    skillsline3: "",
    skillsline4: "",
    skillsline5: "",
    projectsline1: "",
    projectsline2: "",
    projectsline3: "",
    projectsline4: "",
    projectsline5: "",
  });
  const [successMessage, setSuccessMessage] = React.useState<string>("");
  const [isLoadingUserData, setIsLoadingUserData] = React.useState<boolean>(false);
  const [hasLoadedUserData, setHasLoadedUserData] = React.useState<boolean>(false);

  // Load user data when a user is selected
  React.useEffect(() => {
    let isCancelled = false;
    
    const loadUserData = async (): Promise<void> => {
      if (!selectedUser?.id) {
        setHasLoadedUserData(false);
        return;
      }

      setIsLoadingUserData(true);
      setSuccessMessage("");
      
      try {
        const userData = await getUserSchemaExtension(selectedUser.id);
        
        if (!isCancelled && userData) {
          setFormData(userData);
        }
        if (!isCancelled) {
          setHasLoadedUserData(true);
        }
      } catch (error) {
        console.error("Error loading user schema data:", error);
        if (!isCancelled) {
          setHasLoadedUserData(true);
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingUserData(false);
        }
      }
    };

    loadUserData().catch(console.error);
    
    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isCancelled = true;
    };
  }, [selectedUser?.id]); // Only depend on the user ID, not the function

  // Handle user selection
  const handleUserSelection = React.useCallback((users: IUserProfile[]) => {
    const user = users.length > 0 ? users[0] : undefined;
    setSelectedUser(user);
    setSuccessMessage("");
    if (!user) {
      setHasLoadedUserData(false);
      setFormData({
        skillsline1: "",
        skillsline2: "",
        skillsline3: "",
        skillsline4: "",
        skillsline5: "",
        projectsline1: "",
        projectsline2: "",
        projectsline3: "",
        projectsline4: "",
        projectsline5: "",
      });
    }
  }, []);

  // Handle form input changes
  const handleInputChange = React.useCallback((field: keyof IUserSchemaExtensionData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    setSuccessMessage(""); // Clear success message when user starts editing
  }, []);

  // Handle form submission
  const handleSubmit = React.useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setSuccessMessage("");
    
    if (!selectedUser?.id) {
      return;
    }

    if (!hasLoadedUserData) {
      return;
    }

    try {
      await updateUserSchemaExtension(selectedUser.id, formData);
      setSuccessMessage(`Successfully updated schema properties for ${selectedUser.displayName}`);
      onSuccess?.(selectedUser.id, formData);
    } catch (error) {
      console.error("Error updating user schema:", error);
    }
  }, [selectedUser, formData, updateUserSchemaExtension, onSuccess, hasLoadedUserData]);

  // Handle reset form
  const handleReset = React.useCallback(() => {
    if (selectedUser?.id) {
      // Reload the original data
      setIsLoadingUserData(true);
      getUserSchemaExtension(selectedUser.id)
        .then(userData => {
          if (userData) {
            setFormData(userData);
          }
        })
        .catch(console.error)
        .finally(() => {
          setIsLoadingUserData(false);
        });
    } else {
      setFormData({
        skillsline1: "",
        skillsline2: "",
        skillsline3: "",
        skillsline4: "",
        skillsline5: "",
        projectsline1: "",
        projectsline2: "",
        projectsline3: "",
        projectsline4: "",
        projectsline5: "",
      });
    }
    setSuccessMessage("");
  }, [selectedUser?.id, getUserSchemaExtension]);

  // Skill input fields
  const renderSkillsSection = (): React.ReactElement => (
    <div className={styles.sectionGroup}>
      <Text className={styles.sectionTitle}>Skills</Text>
      <div className={styles.inputGroup}>
        {[1, 2, 3, 4, 5].map(num => (
          <Field key={`skill-${num}`} label={`Skill ${num}`}>
            <Input
              value={formData[`skillsline${num}` as keyof IUserSchemaExtensionData] || ""}
              onChange={(_, data) => handleInputChange(`skillsline${num}` as keyof IUserSchemaExtensionData, data.value)}
              placeholder={`Enter skill ${num}...`}
              disabled={!selectedUser || isLoading || isLoadingUserData}
            />
          </Field>
        ))}
      </div>
    </div>
  );

  // Project input fields
  const renderProjectsSection = (): React.ReactElement => (
    <div className={styles.sectionGroup}>
      <Text className={styles.sectionTitle}>Projects</Text>
      <div className={styles.inputGroup}>
        {[1, 2, 3, 4, 5].map(num => (
          <Field key={`project-${num}`} label={`Project ${num}`}>
            <Input
              value={formData[`projectsline${num}` as keyof IUserSchemaExtensionData] || ""}
              onChange={(_, data) => handleInputChange(`projectsline${num}` as keyof IUserSchemaExtensionData, data.value)}
              placeholder={`Enter project ${num}...`}
              disabled={!selectedUser || isLoading || isLoadingUserData}
            />
          </Field>
        ))}
      </div>
    </div>
  );

  // Selected user display
  const renderSelectedUser = (): React.ReactElement | null => {
    if (!selectedUser) return null;

    return (
      <Card className={styles.selectedUserCard}>
        <Persona
          name={selectedUser.displayName}
          secondaryText={selectedUser.mail || selectedUser.userPrincipalName}
          tertiaryText={selectedUser.jobTitle}
          presence={{
            status: "available"
          }}
          avatar={{
            image: {
              src: selectedUser.photoUrl || `${context.pageContext.web.absoluteUrl}//_layouts/15/userphoto.aspx?size=L&username=${selectedUser.userPrincipalName || ""}`
            },
            initials: selectedUser.displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
          }}
          size="extra-large"
        />
      </Card>
    );
  };

  if (isLoading || isLoadingUserData) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.loadingContainer}>
          <Spinner size="medium" />
          <Text>
            {isLoadingUserData ? "Loading user data..." : "Updating user properties..."}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <Text className={styles.title}>Update User Schema Properties</Text>
        <Text className={styles.subtitle}>
          Update custom skills and projects for a user using the extinwbntrw_spUserProfile schema extension
        </Text>
      </div>

     
      {/* Error Message */}
      {error && (
        <MessageBar intent="error">
          {error}
        </MessageBar>
      )}

      {/* Success Message */}
      {successMessage && (
        <MessageBar intent="success">
          {successMessage}
        </MessageBar>
      )}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* User Selection */}
        <div className={styles.userPickerSection}>
          <Field 
            label="Select User" 
            required
            validationState={selectedUser ? "success" : undefined}
            validationMessage={!selectedUser ? "Please select a user" : undefined}
          >
            <UserPicker
              context={context}
              selectedUsers={selectedUser ? [selectedUser] : []}
              onSelectionChange={handleUserSelection}
              placeholder="Search and select a user..."
              maxSelectedOptions={1}
            />
          </Field>
        </div>

        {/* Selected User Display */}
        {renderSelectedUser()}

        {/* Form Fields - Only show if user is selected and data is loaded */}
        {selectedUser && hasLoadedUserData && (
          <>
            {renderSkillsSection()}
            {renderProjectsSection()}

            {/* Action Buttons */}
            <div className={styles.buttonGroup}>
              <Button
                appearance="secondary"
                icon={<ArrowReset24Regular />}
                onClick={handleReset}
                disabled={isLoading}
              >
                Reset
              </Button>
              
              {onClose && (
                <Button
                  appearance="secondary"
                  icon={<Dismiss24Regular />}
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Close
                </Button>
              )}
              
              <Button
                appearance="primary"
                icon={<Save24Regular />}
                type="submit"
                disabled={isLoading || isLoadingUserData || !selectedUser || !hasLoadedUserData}
              >
                Update Properties
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};