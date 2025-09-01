import {
  Button,
  Card,
  CloseButton,
  Dialog,
  EmptyState,
  Field,
  Flex,
  Grid,
  Input,
  NativeSelect,
  Portal,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";
import ClientCard from "../ClientCard/ClientCard";
import { useEffect, useState } from "react";
import { type Athlete } from "@/data/dummyData";
import axios from "axios";
import { HiColorSwatch } from "react-icons/hi";

const ManageClients = () => {
  const [clients, setClients] = useState<Athlete[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    axios
      .get(apiUrl + "/athletes", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setClients(response.data.athletes);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        console.error("Error fetching athletes data:", error);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  const dialogComponent = () => {
    return (
      <Dialog.Root size="lg" placement="center" motionPreset="slide-in-bottom">
        <Dialog.Trigger asChild>
          <Button variant="outline" colorScheme="blue">
            Add New Client
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Add a client</Dialog.Title>
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
                  {/* Add form or content for adding a client here */}
                  <p>Form to add a new client will go here.</p>
                  <VStack gap={4}>
                    <Input placeholder="Client Name" />
                    <Input placeholder="Client Email" />
                    {/* Group Select */}
                    <Field.Root required>
                      <Field.Label htmlFor="group">Group</Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          id="group"
                          placeholder="Select a group"
                        >
                          <option value="spansko 6">Spansko 6</option>
                          <option value="spansko 5">Spansko 5</option>
                          <option value="spansko 4">Spansko 4</option>
                          <option value="spansko 3">Spansko 3</option>
                        </NativeSelect.Field>
                      </NativeSelect.Root>
                    </Field.Root>
                    <Input placeholder="Client Group" />
                  </VStack>
                </Grid>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  };

  if (isError) {
    return (
      <Card.Root p={2}>
        <Card.Header>
          <Card.Title>Client Management</Card.Title>
          <Card.Description>
            Track and grade individual athlete performance
          </Card.Description>
        </Card.Header>
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <HiColorSwatch />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>No Data Found</EmptyState.Title>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      </Card.Root>
    );
  }
  return (
    <Card.Root>
      {isLoading ? (
        <SkeletonText noOfLines={4} gap="4" mt="4" />
      ) : (
        <>
          <Card.Header>
            <Card.Title>Client Management</Card.Title>
            <Card.Description>
              Track and grade individual athlete performance
            </Card.Description>
            <Flex justifyContent="flex-end" mt={4}>
              {dialogComponent()}
            </Flex>
          </Card.Header>
          <Card.Body>
            {clients.length > 0 &&
              clients.map((athlete) => {
                return (
                  <ClientCard
                    key={athlete.id}
                    name={athlete.name}
                    group={athlete.group}
                    email={athlete.email}
                    isActiveAthlete={athlete.isActiveAthlete}
                    daysSinceJoining={athlete.daysSinceJoining}
                  />
                );
              })}
          </Card.Body>
        </>
      )}
    </Card.Root>
  );
};

export default ManageClients;
