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
  const { setUser } = useUser();
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
