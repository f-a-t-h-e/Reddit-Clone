import { IconType } from "react-icons";
import { TiHome } from "react-icons/ti";
import { atom } from "recoil";

export interface IDirectoryMenueItem {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
}

interface IDirectoryMenuState {
  isOpen: boolean;
  selectedMenuItem: IDirectoryMenueItem;
}
export const defaultMenuItem: IDirectoryMenueItem = {
  displayText: "Home",
  link: "/",
  icon: TiHome,
  iconColor: "black",
};

export const defaultMenuState: IDirectoryMenuState = {
  isOpen: false,
  selectedMenuItem: defaultMenuItem,
};

export const directoryMenuState = atom<IDirectoryMenuState>({
  key: "DIRECTORY_MENU_STATE",
  default: defaultMenuState,
});
