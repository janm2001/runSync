import { Flex, Progress, Text, VStack } from "@chakra-ui/react";
import type { IGroupPosition } from "./types";

const GroupPosition = ({
  text,
  position,
  total,
  percentage,
}: IGroupPosition) => {
  const calculatePosition = () => {
    return 100 - (position! / total!) * 100;
  };
  const value = percentage ? percentage : calculatePosition();
  const rating = percentage ? ` (${percentage}%)` : `${position}/${total}`;
  return (
    <VStack gap={16} align="stretch" width="100%" marginY={8}>
      <Flex justify="space-between" align={"center"}>
        <Text>{text}</Text>
        <Text>{rating}</Text>
      </Flex>
      <Progress.Root value={value} colorScheme="green" size="md" width="100%">
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </VStack>
  );
};

export default GroupPosition;
