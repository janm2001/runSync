import {
  Button,
  Card,
  CloseButton,
  Dialog,
  Flex,
  Grid,
  Icon,
  Portal,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { ITrainingSessionCard } from "./types";
import { FaEye, FaTrash } from "react-icons/fa";
import axios from "axios";
import { Toaster, toaster } from "../ui/toaster";
import { useUser } from "@/context/UserContext";

const TrainingSession = ({ session }: ITrainingSessionCard) => {
  const { user } = useUser();
  const deleteSession = () => {
    axios
      .delete(`http://localhost:3000/trainings/${session.id}`)
      .then(() => {
        toaster.create({
          title: "Training session deleted successfully",
          description: "The training session has been removed.",
          duration: 3000,
        });
        window.location.reload(); // Reload the page to reflect changes
      })
      .catch((error) => {
        console.error("Error deleting training session:", error);
        alert("Failed to delete training session. Please try again.");
      });
  };
  const dialogComponent = () => {
    return (
      <Dialog.Root size="lg" placement="center" motionPreset="slide-in-bottom">
        <Dialog.Trigger asChild>
          <Button variant={"outline"}>
            <Icon size="md">
              <FaEye />
            </Icon>
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Training Details</Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body>
                <Grid
                  templateColumns="repeat(2, 1fr)"
                  p={4}
                  gap={4}
                  alignItems="flex-start"
                >
                  <Text>Title: {session.title}</Text>
                  <Text>Group: {session.group}</Text>
                  <Text>Date: {session.date}</Text>
                  <Text>Type: {session.type}</Text>
                  <Text>
                    Description:{" "}
                    {session.description || "No description available."}
                  </Text>
                  <Text>Duration: {session.duration} minutes</Text>
                  <Text>
                    Intervals:{" "}
                    {session.intervals
                      ? session.intervals.map((interval, index) => (
                          <span key={index}>
                            {interval.distance} ({interval.repetitions}x) -
                            Rest: {interval.rest} - Target Pace:{" "}
                            {interval.targetPace}
                          </span>
                        ))
                      : "No intervals defined."}
                  </Text>
                  <Text>Attendance: {session.attendance.length} athletes</Text>
                  <Text>Completed: {session.completed ? "Yes" : "No"}</Text>
                </Grid>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  };

  return (
    <>
      <Toaster />
      <Card.Root p={4} mt={2}>
        <Card.Header p={0}>
          <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Flex direction="column" alignItems="flex-start" flexGrow={1}>
              <Card.Title fontSize="lg" fontWeight="semibold" mb={0}>
                {session.title}
              </Card.Title>
              <Card.Description>
                <Text color="gray.500" fontSize="sm">
                  {session.group} - {session.date}
                </Text>
              </Card.Description>
            </Flex>

            <VStack gap={2} alignItems="flex-end">
              <Tag.Root variant={"solid"} colorScheme="blue" size={"lg"}>
                <Tag.Label>{session.type}</Tag.Label>
              </Tag.Root>
              <Flex gap={2}>
                {dialogComponent()}
                {user === "coach" && (
                  <Button variant={"outline"} onClick={deleteSession}>
                    <Icon size="md">
                      <FaTrash />
                    </Icon>
                  </Button>
                )}
              </Flex>
            </VStack>
          </Flex>
        </Card.Header>
      </Card.Root>
    </>
  );
};

export default TrainingSession;
