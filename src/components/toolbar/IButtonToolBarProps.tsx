import { IButtonItem } from "./IButtonItem";

export interface IButtonToolBarProps {
  items: IButtonItem[];
  selectedItemId: string | undefined;
  onSelectedItem: (itemId: string) => void;
}
