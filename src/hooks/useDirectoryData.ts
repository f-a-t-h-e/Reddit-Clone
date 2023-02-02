import { useRecoilState } from "recoil";
import { directoryMenuState } from "../atoms/directoryMenu.Atom";

const useDirectoryData = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };
  return {
    directoryState,
    toggleMenuOpen,
  };
};

export default useDirectoryData;
