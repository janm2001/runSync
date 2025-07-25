import { useUser } from "@/context/UserContext";
import { Button, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const navigateToMainPage = () => {
    navigate("/");
  };
  return (
    <VStack gap={4} p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Profile Page
      </Heading>
      {/* Profile details go here */}
      <p>This is where user profile information will be displayed.</p>
      {/* Additional profile components can be added here */}
      <p>Type of user - {user}</p>
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

export default Profile;
