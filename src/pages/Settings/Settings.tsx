import type { ViewTab } from "@/components/Navbar/types";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { Flex, Heading, Icon, VStack, Button, Text } from "@chakra-ui/react";
import { FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, setUser } = useUser();
  const onTabChange = (tab: ViewTab) => {
    setUser(tab);
  };
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const navigateToMainPage = () => {
    navigate("/");
  };
  return (
    <VStack align="center" justify="center" p={4} gap={4}>
      <Heading as="h1" size="xl" mb={4}>
        Settings Page
      </Heading>
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

      <Button
        mt={4}
        variant="outline"
        colorScheme="cyan"
        onClick={navigateToMainPage}
      >
        Go to Main Page
      </Button>
    </VStack>
  );
};

export default Settings;
