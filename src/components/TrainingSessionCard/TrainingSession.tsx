import { Card, Flex, Tag, Text } from "@chakra-ui/react";
import type { ITrainingSessionCard } from "./types";

const TrainingSession = ({
  trainingTitle,
  groupName,
  time,
  trainingType,
}: ITrainingSessionCard) => {
  return (
    <Card.Root p={4} mt={2}>
      <Card.Header p={0}>
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Flex direction="column" alignItems="flex-start" flexGrow={1}>
            <Card.Title fontSize="lg" fontWeight="semibold" mb={0}>
              {trainingTitle}
            </Card.Title>
            <Card.Description>
              <Text color="gray.500" fontSize="sm">
                {groupName} - {time}
              </Text>
            </Card.Description>
          </Flex>

          <Tag.Root variant={"solid"} colorScheme="blue" size={"lg"}>
            <Tag.Label>{trainingType}</Tag.Label>
          </Tag.Root>
        </Flex>
      </Card.Header>
    </Card.Root>
  );
};

export default TrainingSession;
