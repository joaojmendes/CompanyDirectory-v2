import { IButtonItem } from './IButtonItem';

export interface OverflowMenuItemProps {
  item: IButtonItem;
  onSelectedItem: (itemId: string) => void;
}
