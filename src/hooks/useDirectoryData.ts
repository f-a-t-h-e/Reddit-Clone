import { useRecoilState } from "recoil";
import { directoryMenuState } from "../atoms/directoryMenu.Atom";

const useDirectoryData = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);

  return {
    directoryState,
    setDirectoryState,
  };
};

export default useDirectoryData;
