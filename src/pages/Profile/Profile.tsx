import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import {
  Button,
  Heading,
  VStack,
  Text,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useUser();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const navigateToMainPage = () => {
    navigate("/");
  };

  // Handle loading state
  if (!user) {
    return (
      <VStack gap={4} p={4} align="center" justify="center" minH="200px">
        <Spinner size="lg" />
        <Text>Loading profile...</Text>
      </VStack>
    );
  }

  // Helper function to get user role display
  const getUserRoleDisplay = (role: number) => {
    switch (role) {
      case 1:
        return "Coach";
      case 0:
        return "Client";
      default:
        return "Unknown";
    }
  };

  return (
    <VStack gap={4} p={4} maxW="600px" mx="auto">
      <Heading as="h1" size="xl" mb={4}>
        {t("profile.title")}
      </Heading>

      <VStack gap={3} align="stretch" w="100%">
        <Text fontSize="lg">
          <strong>{t("profile.type.of.user")}:</strong>{" "}
          {getUserRoleDisplay(user.role)}
        </Text>

        <Text fontSize="lg">
          <strong>{t("profile.email")}:</strong> {user.email || "Not provided"}
        </Text>

        <Text fontSize="lg">
          <strong>{t("profile.firstname")}:</strong>{" "}
          {user.firstName || "Not provided"}
        </Text>

        <Text fontSize="lg">
          <strong>{t("profile.lastname")}:</strong>{" "}
          {user.lastName || "Not provided"}
        </Text>

        {/* Show client or coach specific info if available */}
        {user.clientInfo && (
          <Alert.Root status="info">Client information available</Alert.Root>
        )}

        {user.coachInfo && (
          <Alert.Root status="info">Coach information available</Alert.Root>
        )}
      </VStack>

      <Button
        mt={6}
        variant="outline"
        colorScheme="cyan"
        onClick={navigateToMainPage}
        w="200px"
      >
        {t("profile.go.to.main.page")}
      </Button>
    </VStack>
  );
};

export default Profile;
