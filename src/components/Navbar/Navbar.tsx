import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import type { ViewTab } from "./types";
import { FaGlobe } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useUser();
  const onTabChange = (tab: ViewTab) => {
    setUser(tab);
  };
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
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
        <Box position="relative">
          <Menu.Root positioning={{ placement: "top-end" }}>
            <Menu.Trigger asChild>
              <IconButton
                variant="ghost"
                aria-label="User menu"
                rounded={"full"}
              >
                <Avatar.Root>
                  <Avatar.Fallback name="Coach Jan"></Avatar.Fallback>
                </Avatar.Root>
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="profile"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    value="settings"
                    onClick={() => navigate("/settings")}
                  >
                    Settings
                  </Menu.Item>
                  <Menu.Item value="logout" onClick={() => setUser(null)}>
                    Logout
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
