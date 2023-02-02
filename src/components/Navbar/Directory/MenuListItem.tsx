import { Flex, Icon, Image, MenuItem } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons/lib";
import useDirectoryData from "@/hooks/useDirectoryData";

type Props = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

const MenuListItem = ({
  displayText,
  icon,
  iconColor,
  link,
  imageURL,
}: Props) => {
  const { onSelectMenuItem } = useDirectoryData();

  return (
    <MenuItem
      w="100%"
      fontSize="10pt"
      _hover={{ bg: "gray.100" }}
      onClick={() =>
        onSelectMenuItem({
          displayText,
          icon,
          iconColor,
          link,
          imageURL,
        })
      }
    >
      <Flex align="center">
        {imageURL ? (
          <Image
            src={imageURL}
            borderRadius="full"
            boxSize="18px"
            mr={2}
            alt={displayText}
          />
        ) : (
          <Icon as={icon} mr={2} color={iconColor} fontSize={20} />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};

export default MenuListItem;
