import { useRecoilState } from "recoil";
import { directoryMenuState } from "../atoms/directoryMenu.Atom";

type Props = {};

const useDirectoryData = ({}: Props) => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);

  return {
    directoryState,
    setDirectoryState,
  };
};

export default useDirectoryData;
