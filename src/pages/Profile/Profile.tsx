import { useUser } from "@/context/UserContext";
import { Heading, VStack } from "@chakra-ui/react";

const Profile = () => {
  const { user } = useUser();
  return (
    <VStack gap={4} p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Profile Page
      </Heading>
      {/* Profile details go here */}
      <p>This is where user profile information will be displayed.</p>
      {/* Additional profile components can be added here */}
      <p>Type of user - {user}</p>
    </VStack>
  );
};

export default Profile;
