import { Button, Flex, Text } from "@chakra-ui/react";
import type { INavbar, ViewTab } from "./types";

const Navbar = ({ activeTab, setActiveTab }: INavbar) => {
  const onTabChange = (tab: ViewTab) => {
    setActiveTab(tab);
  };
  return (
    <Flex
      as={"nav"}
      alignItems="center"
      width={"100%"}
      justifyContent="space-between"
      padding={4}
      bg="teal.600"
      color="white"
      boxShadow="md"
    >
      <Flex alignItems="center">
        <Text fontSize={"xl"} fontWeight="bold">
          RunSync Ak Fit
        </Text>
      </Flex>
      <Flex gap={4} alignItems={"center"}>
        <Text>View as: </Text>
        <Flex align="stretch" gap={2} flexWrap="wrap">
          <Button
            bg={activeTab === "client" ? "black" : "white"}
            color={activeTab === "client" ? "white" : "gray.800"}
            onClick={() => onTabChange("client")}
          >
            Client
          </Button>
          <Button
            bg={activeTab === "coach" ? "black" : "white"}
            color={activeTab === "coach" ? "white" : "gray.800"}
            onClick={() => onTabChange("coach")}
          >
            Coach
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
