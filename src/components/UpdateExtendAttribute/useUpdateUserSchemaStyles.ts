import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export const useUpdateUserSchemaStyles = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: ${tokens.spacingVerticalM};
    padding: ${tokens.spacingVerticalL};
    background-color: ${tokens.colorNeutralBackground1};
    border-radius: ${tokens.borderRadiusMedium};
    border: 1px solid ${tokens.colorNeutralStroke2};
    box-shadow: ${tokens.shadow4};
  `,
  
  header: css`
    display: flex;
    flex-direction: column;
    gap: ${tokens.spacingVerticalS};
    margin-bottom: ${tokens.spacingVerticalM};
  `,
  
  title: css`
    font-size: ${tokens.fontSizeBase500};
    font-weight: ${tokens.fontWeightSemibold};
    color: ${tokens.colorNeutralForeground1};
    margin: 0;
  `,
  
  subtitle: css`
    font-size: ${tokens.fontSizeBase300};
    color: ${tokens.colorNeutralForeground2};
    margin: 0;
  `,
  
  form: css`
    display: flex;
    flex-direction: column;
    gap: ${tokens.spacingVerticalL};
  `,
  
  userPickerSection: css`
    display: flex;
    flex-direction: column;
    gap: ${tokens.spacingVerticalS};
  `,
  
  sectionGroup: css`
    display: flex;
    flex-direction: column;
    gap: ${tokens.spacingVerticalM};
    padding: ${tokens.spacingVerticalM};
    background-color: ${tokens.colorNeutralBackground2};
    border-radius: ${tokens.borderRadiusMedium};
    border: 1px solid ${tokens.colorNeutralStroke3};
  `,
  
  sectionTitle: css`
    font-size: ${tokens.fontSizeBase400};
    font-weight: ${tokens.fontWeightSemibold};
    color: ${tokens.colorNeutralForeground1};
    margin: 0;
    margin-bottom: ${tokens.spacingVerticalS};
  `,
  
  inputRow: css`
    display: flex;
    flex-direction: column;
    gap: ${tokens.spacingVerticalXS};
  `,
  
  inputGroup: css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${tokens.spacingHorizontalM};
  `,
  
  buttonGroup: css`
    display: flex;
    gap: ${tokens.spacingHorizontalM};
    justify-content: flex-end;
    margin-top: ${tokens.spacingVerticalL};
    padding-top: ${tokens.spacingVerticalM};
    border-top: 1px solid ${tokens.colorNeutralStroke3};
  `,
  
  loadingContainer: css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${tokens.spacingVerticalXXL};
    gap: ${tokens.spacingHorizontalM};
  `,
  
  errorContainer: css`
    padding: ${tokens.spacingVerticalM};
    background-color: ${tokens.colorPaletteRedBackground1};
    border: 1px solid ${tokens.colorPaletteRedBorder1};
    border-radius: ${tokens.borderRadiusMedium};
    color: ${tokens.colorPaletteRedForeground1};
  `,
  
  successContainer: css`
    padding: ${tokens.spacingVerticalM};
    background-color: ${tokens.colorPaletteGreenBackground1};
    border: 1px solid ${tokens.colorPaletteGreenBorder1};
    border-radius: ${tokens.borderRadiusMedium};
    color: ${tokens.colorPaletteGreenForeground1};
  `,
  
  selectedUserCard: css`
    padding: ${tokens.spacingVerticalM};
    background-color: ${tokens.colorNeutralBackground3};
    border-radius: ${tokens.borderRadiusMedium};
    border: 1px solid ${tokens.colorNeutralStroke2};
    display: flex;
    align-items: flex-start;
    gap: ${tokens.spacingHorizontalM};
  `,
  
  userInfo: css`
    display: flex;
    flex-direction: column;
    gap: ${tokens.spacingVerticalXS};
  `,
  
  userName: css`
    font-size: ${tokens.fontSizeBase400};
    font-weight: ${tokens.fontWeightSemibold};
    color: ${tokens.colorNeutralForeground1};
  `,
  
  userEmail: css`
    font-size: ${tokens.fontSizeBase300};
    color: ${tokens.colorNeutralForeground2};
  `,
};