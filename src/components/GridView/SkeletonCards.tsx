import * as React from "react";

import { Card, CardHeader, SkeletonItem } from "@fluentui/react-components";

import { StackV2 as Stack } from "@spteck/react-controls";
import { useSkeletonCardStyles } from "./useSkeletonCardStyles";

export interface ISkeletonCardProps {
  count?: number;
}

const SkeletonCard: React.FunctionComponent = () => {
  const { cardStyles, headerStyles, bodyStyles, avatarStyles, textLineStyles } =
    useSkeletonCardStyles();

  return (
    <Card className={cardStyles}>
      <CardHeader className={headerStyles}>
        <div className={avatarStyles}>
          <SkeletonItem shape="circle" size={64} />
        </div>
        <Stack direction="vertical" gap="4px" style={{ flex: 1 }}>
          <div className={textLineStyles}>
            <SkeletonItem size={16} style={{ width: "70%" }} />
          </div>
          <div className={textLineStyles}>
            <SkeletonItem size={12} style={{ width: "50%" }} />
          </div>
          <div className={textLineStyles}>
            <SkeletonItem size={12} style={{ width: "60%" }} />
          </div>
        </Stack>
      </CardHeader>
      <div className={bodyStyles}>
        <Stack direction="vertical" gap="8px">
          <div className={textLineStyles}>
            <SkeletonItem size={12} style={{ width: "100%" }} />
          </div>
          <div className={textLineStyles}>
            <SkeletonItem size={12} style={{ width: "80%" }} />
          </div>
          <div className={textLineStyles}>
            <SkeletonItem size={12} style={{ width: "90%" }} />
          </div>
          <div className={textLineStyles}>
            <SkeletonItem size={12} style={{ width: "60%" }} />
          </div>
        </Stack>
      </div>
    </Card>
  );
};

export const SkeletonCards: React.FunctionComponent<ISkeletonCardProps> = ({
  count = 12,
}) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </>
  );
};
