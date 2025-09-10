import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const { t } = useLanguage();
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
        <Box position="relative">
          <Menu.Root positioning={{ placement: "top-end" }}>
            <Menu.Trigger asChild>
              <IconButton
                variant="ghost"
                aria-label="User menu"
                rounded={"full"}
              >
                <Avatar.Root>
                  <Avatar.Fallback
                    name={user?.firstName + " " + user?.lastName || "User"}
                  ></Avatar.Fallback>
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
                    {t("navbar.profile")}
                  </Menu.Item>
                  <Menu.Item
                    value="settings"
                    onClick={() => navigate("/settings")}
                  >
                    {t("navbar.settings")}
                  </Menu.Item>
                  <Menu.Item value="logout" onClick={() => setUser(null)}>
                    {t("navbar.logout")}
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
