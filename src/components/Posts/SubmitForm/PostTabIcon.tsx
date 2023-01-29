import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { ITabItem, ITabs } from "../types";

type Props = {
  item: ITabItem;
  selectedTab: boolean;
  setSelectedTab: React.Dispatch<React.SetStateAction<ITabs>>;
};
// TO_DO : Make this usable through the whole app, and don't use chakra's <Tab />
const SubmitPostTabIcon = ({ item, selectedTab, setSelectedTab }: Props) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow="1"
      p="14px"
      cursor="pointer"
      fontWeight={700}
      _hover={{ bg: "gray.50" }}
      color={selectedTab ? "blue.500" : "gray.500"}
      borderWidth={selectedTab ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selectedTab ? "blue.500" : "gray.200"}
      borderRightColor="gray.200"
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex align="center" height="24px" mr={2}>
        <Icon as={item.icon} />
      </Flex>
      <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  );
};

export default SubmitPostTabIcon;
