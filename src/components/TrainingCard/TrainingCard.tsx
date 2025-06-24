import { Card, Flex, VStack, Text, Icon, Box } from "@chakra-ui/react";
import type { ITrainingCard } from "./types";
import { FaCalendar, FaClock, FaLocationArrow } from "react-icons/fa";

const TrainingCard = ({
  trainingTitle,
  date,
  time,
  pace,
  notes,
  grade,
}: ITrainingCard) => {
  return (
    <Card.Root p={2} mt={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <VStack gap={4} alignItems="flex-start">
          <Text fontSize="lg" fontWeight="bold">
            {trainingTitle}
          </Text>
          <Text
            fontSize="md"
            color="GrayText"
            gap={2}
            display={"flex"}
            flexWrap="wrap"
          >
            <Box>
              <Icon size={"md"} mr={2}>
                <FaCalendar />
              </Icon>
              {date}
            </Box>
            <Box>
              <Icon size={"md"} mr={2}>
                <FaClock />
              </Icon>
              {time}
            </Box>
            <Box>
              <Icon size={"md"} mr={2}>
                <FaLocationArrow />
              </Icon>
              {pace}
            </Box>
          </Text>
          <Text fontSize="md" color="GrayText">
            "{notes}"
          </Text>
        </VStack>
        <VStack alignItems="center" justifyContent="center">
          <Text fontSize="4xl" fontWeight="bold" color={"blue.500"}>
            {grade}
          </Text>
          <Text fontSize="md" color="GrayText">
            Coach Grade
          </Text>
        </VStack>
      </Flex>
    </Card.Root>
  );
};

export default TrainingCard;
