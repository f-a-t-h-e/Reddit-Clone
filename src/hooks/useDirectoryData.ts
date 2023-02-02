import { useRecoilState } from "recoil";
import {
  directoryMenuState,
  IDirectoryMenueItem,
} from "@/atoms/directoryMenu.Atom";
import { useRouter } from "next/router";

const useDirectoryData = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);
  const router = useRouter();

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  const onSelectMenuItem = (menuItem: IDirectoryMenueItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));
    router.push(menuItem.link);
  };

  return {
    directoryState,
    toggleMenuOpen,
    onSelectMenuItem,
  };
};

export default useDirectoryData;
