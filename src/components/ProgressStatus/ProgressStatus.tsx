import { Flex, HStack, Progress, Text } from "@chakra-ui/react";
import type { IProgressStatus } from "./types";

const ProgressStatus = ({ groupName, progress }: IProgressStatus) => {
  const calculateProgressColor = (progress: number) => {
    if (progress < 70) return "red";
    if (progress < 80) return "gray";
    if (progress < 90) return "yellow";
    return "green";
  };

  return (
    <Flex mt={4} alignItems="center" justifyContent="space-between" gap={6}>
      <Text fontWeight="semi-bold">{groupName}</Text>
      <Progress.Root
        defaultValue={progress}
        colorPalette={calculateProgressColor(progress)}
        size="md"
        width="100%"
      >
        <HStack gap="5">
          <Progress.Track flex="1">
            <Progress.Range />
          </Progress.Track>
          <Progress.ValueText>{progress}%</Progress.ValueText>
        </HStack>
      </Progress.Root>
    </Flex>
  );
};

export default ProgressStatus;
