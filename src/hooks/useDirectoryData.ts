import { useRecoilState, useRecoilValue } from "recoil";
import {
  directoryMenuState,
  IDirectoryMenueItem,
} from "@/atoms/directoryMenu.Atom";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { communityState } from "../atoms/communities.Atom";
import { FaReddit } from "react-icons/fa";

const useDirectoryData = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);
  const router = useRouter();
  const communityStateValue = useRecoilValue(communityState);
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
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };
  useEffect(() => {
    const { currentCommunity } = communityStateValue;
    if (currentCommunity) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${currentCommunity.id}`,
          icon: FaReddit,
          link: `/r/${currentCommunity.id}`,
          iconColor: "blue.500",
          imageURL: currentCommunity.imageURL,
        },
      }));
    }
    console.log("err");
  }, [communityStateValue.currentCommunity]);
  return {
    directoryState,
    toggleMenuOpen,
    onSelectMenuItem,
  };
};

export default useDirectoryData;
