import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import type { ViewTab } from "./types";
import { FaGlobe } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const { user, setUser } = useUser();
  const onTabChange = (tab: ViewTab) => {
    setUser(tab);
  };
  const { language, setLanguage } = useLanguage();
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
        <Flex gap={2} alignItems={"center"}>
          <Icon size="md">
            <FaGlobe />
          </Icon>
          <Button
            bg={language === "hr" ? "black" : "white"}
            color={language === "hr" ? "white" : "gray.800"}
            onClick={() => setLanguage("hr")}
          >
            HR
          </Button>
          <Button
            bg={language === "en" ? "black" : "white"}
            color={language === "en" ? "white" : "gray.800"}
            onClick={() => setLanguage("en")}
          >
            EN
          </Button>
        </Flex>
        <Text>View as: </Text>
        <Flex align="stretch" gap={2} flexWrap="wrap">
          <Button
            bg={user === "client" ? "black" : "white"}
            color={user === "client" ? "white" : "gray.800"}
            onClick={() => onTabChange("client")}
          >
            Client
          </Button>
          <Button
            bg={user === "coach" ? "black" : "white"}
            color={user === "coach" ? "white" : "gray.800"}
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
