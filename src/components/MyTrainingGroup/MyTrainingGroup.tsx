import { useLanguage } from "@/context/LanguageContext";
import { Box, Card, Flex, Text, Icon, VStack } from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa";

const MyTrainingGroup = () => {
  const { t } = useLanguage();
  return (
    <Card.Root p={2}>
      <Card.Header>
        <Card.Title alignItems={"center"} display="flex" gap={2}>
          <Icon size={"lg"}>
            <FaUsers />
          </Icon>{" "}
          {t("mytraininggroup.title")}
        </Card.Title>
        <Card.Description>{t("mytraininggroup.description")}</Card.Description>
      </Card.Header>
      <Card.Body>
        <Flex alignItems="center" justifyContent="space-between">
          <VStack gap={4} alignItems="flex-start">
            <Text fontSize="lg" fontWeight="bold">
              Group Name: Spansko 5
            </Text>
            <Text fontSize="md">Coach : Jan Mackovic</Text>
            <Text fontSize="md">Members: 7 - Pace: 6:30-5:00</Text>
          </VStack>

          <Box>
            <Text fontSize="md" fontWeight="bold">
              Napredne Grupa
            </Text>
          </Box>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};

export default MyTrainingGroup;
