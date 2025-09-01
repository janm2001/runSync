import { Box, Button, Card, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import type { IClientCard } from "./types";
import { FaStar } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

const ClientCard = ({
  name,
  group,
  email,
  daysSinceJoining,
  isActiveAthlete,
}: IClientCard) => {
  return (
    <Card.Root mt={4}>
      <Flex
        alignItems={"center"}
        justifyContent="space-between"
        padding={4}
        w={"100%"}
      >
        <Box>
          <Card.Title>{name}</Card.Title>
          <Card.Description>{group}</Card.Description>
          <Card.Description>Email: {email}</Card.Description>
        </Box>
        <Box alignItems={"center"} display="flex" flexDirection="row" gap={4}>
          <VStack alignItems={"center"} justifyContent={"center"}>
            <Text fontWeight={"bold"}>{daysSinceJoining ?? 0} days</Text>
            <Text color="GrayText">Days Since Joining</Text>
          </VStack>
          <VStack alignItems={"center"} justifyContent={"center"}>
            <Text color="green.300">
              {isActiveAthlete ? "Active" : "Inactive"}
            </Text>
            <Text color="GrayText">Status</Text>
          </VStack>
          <Button variant={"outline"} colorScheme="blue">
            <Icon size="lg">
              <FaStar />
            </Icon>
          </Button>
          <Button variant={"outline"} colorScheme="blue">
            <Icon size="lg">
              <FaComment />
            </Icon>
          </Button>
        </Box>
      </Flex>
    </Card.Root>
  );
};

export default ClientCard;
