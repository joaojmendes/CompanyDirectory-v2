/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';

import {
  Button,
  FluentProvider,
  IdPrefixProvider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Overflow,
  OverflowItem,
  mergeClasses,
  useIsOverflowItemVisible,
  useOverflowMenu,
} from '@fluentui/react-components';
import {
  MoreHorizontalFilled,
  MoreHorizontalRegular,
  bundleIcon,
} from '@fluentui/react-icons';

import { IButtonItem } from './IButtonItem';
import { IButtonToolBarProps } from './IButtonToolBarProps';
import { OverflowMenuItemProps } from './OverflowMenuItemProps';
import { appGlobalStateAtom } from '../../atoms/appGlobalState';
import { css } from '@emotion/css';
import { useAtomValue } from 'jotai';

const useStyles = () => {
  return {
    container: css({
      display: "flex",
      flexWrap: "nowrap",
      minWidth: 0,
      overflow: "hidden",
      gap: 10,
      marginBottom: 20,
      width: "100%",
    }),

    text1LineStyle: css({
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textAlign: "start",
      textOverflow: "ellipsis",
      wordBreak: "break-word",
    }),
    button: css({
      cursor: "pointer",
      minWidth: 107,
    }),
  };
};

 
export const ButtonToolBar: React.FunctionComponent<IButtonToolBarProps> = (
  props: React.PropsWithChildren<IButtonToolBarProps>
) => {
  const { onSelectedItem, items, selectedItemId } = props;
  const styles = useStyles();
  const onItemSelect = React.useCallback(
    (itemId: string) => {
      if (onSelectedItem) {
        onSelectedItem(itemId);
      }
    },
    [onSelectedItem]
  );

  return (
    <Overflow>
      <div className={mergeClasses(styles.container)}>
        {items.map((item) => (
          <OverflowItem key={item.id} id={item.id} priority={item.id === selectedItemId ? 2 : 1}>
            <Button
              className={styles.button}
              shape="circular"
              appearance={item.id ===  selectedItemId  ? "primary" : "secondary"}
              onClick={() => onItemSelect(item.id)}
              icon={item.icon}
            >
              <span className={styles.text1LineStyle}> {item.name}</span>
            </Button>
          </OverflowItem>
        ))}
        <OverflowMenu items={items} onSelectedItem={onSelectedItem} />
      </div>
    </Overflow>
  );
};

const OverflowMenuItem: React.FunctionComponent<OverflowMenuItemProps> = (
  props: React.PropsWithChildren<OverflowMenuItemProps>
) => {
  const { item, onSelectedItem } = props;
  const isVisible = useIsOverflowItemVisible(item.id);

  if (isVisible) {
    return null;
  }

  return (
    <MenuItem key={item.id} icon={item.icon} onClick={() => onSelectedItem(item.id)}>
      <div>{item.name}</div>
    </MenuItem>
  );
};

const OverflowMenu: React.FC<{ items: IButtonItem[]; onSelectedItem: (itemId: string) => void }> = ({
  items,
  onSelectedItem,
}) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();
  const MoreHorizontal = React.useMemo(() => bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular), []);
  const appGlobalState = useAtomValue(appGlobalStateAtom);
  const { theme, } = appGlobalState;

  if (!isOverflowing) {
    return null;
  }

  return (
    <IdPrefixProvider value="menu-over-">
      <FluentProvider theme={theme}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton
              appearance="transparent"
              ref={ref}
              icon={<MoreHorizontal />}
              aria-label={`${overflowCount} more option`}
              role="button"
            />
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              {items.map((item) => {
                return <OverflowMenuItem key={item.id} item={item} onSelectedItem={onSelectedItem} />;
              })}
            </MenuList>
          </MenuPopover>
        </Menu>
      </FluentProvider>
    </IdPrefixProvider>
  );
};
