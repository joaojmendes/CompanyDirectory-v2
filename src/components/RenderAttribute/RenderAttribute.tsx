import * as React from "react";

import { Body1, Caption1, InfoLabel } from "@fluentui/react-components";
import { IRenderLabelProps, RenderLabel, StackV2 as Stack } from "@spteck/react-controls";

import { Info16Regular } from "@fluentui/react-icons";
import { useRenderAttributeStyles } from "./useRenderAttributeStyles";

export interface IRenderAttributeProps extends IRenderLabelProps {
  value?: string | number | JSX.Element;
  infoLabel?: string;
  showInfoIcon?: boolean;
  variant?: "body1" | "caption1";
  multiline?: boolean;
}

// Render attribute component - render composition fields

export const RenderAttribute: React.FunctionComponent<IRenderAttributeProps> = (
  props: React.PropsWithChildren<IRenderAttributeProps>
) => {
  const {
    label,
    icon,
    isRequired,
    value,
    infoLabel,
    showInfoIcon = false,
    variant = "body1",
    multiline = false,
  } = props;

  const styles = useRenderAttributeStyles();

  const renderValue = (): JSX.Element => {
    if (React.isValidElement(value)) {
      return value;
    }

    // Use appropriate CSS class based on multiline setting
    const textProps = {
      title: typeof value === "string" ? value : typeof value === "number" ? value.toString() : "No value",
      className: multiline ? styles.textContentMultiline : styles.textContent,
    };

    if (variant === "caption1") {
      return (
        <Caption1 {...textProps}>
          {value || "No value"}
        </Caption1>
      );
    }

    return (
      <Body1 {...textProps}>
        {value || "No value"}
      </Body1>
    );
  };

  return (
    <Stack direction="vertical">
      <Stack direction="horizontal" justifyContent="start" alignItems="center">
        <RenderLabel label={label} icon={icon} isRequired={isRequired} />
        {(infoLabel || showInfoIcon) && (
          <InfoLabel info={infoLabel} className={styles.infoLabel}>
            {showInfoIcon && <Info16Regular />}
          </InfoLabel>
        )}
      </Stack>
      <Stack
        className={
          multiline ? styles.valueContainerMultiline : styles.valueContainer
        }
        paddingTop="3px"
        paddingBottom="s"
      >
        <div>{renderValue()}</div>
      </Stack>
    </Stack>
  );
};

export default RenderAttribute;
