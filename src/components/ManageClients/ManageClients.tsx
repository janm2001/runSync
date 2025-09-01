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
import type { Athlete } from "@/data/dummyData";
import axios from "axios";
import { HiColorSwatch } from "react-icons/hi";
import { toaster } from "../ui/toaster";

const initialAthleteState = {
  name: "",
  email: "",
  group: "",
  joinDate: new Date().toISOString().split("T")[0],
  isActiveAthlete: true,
};

const ManageClients = () => {
  const [clients, setClients] = useState<Athlete[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAthlete, setNewAthlete] = useState(initialAthleteState);

  const fetchAthletes = () => {
    setIsLoading(true);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    axios
      .get(`${apiUrl}/athletes`)
      .then((response) => {
        setClients(response.data.athletes || response.data);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        console.error("Error fetching athletes data:", error);
        setIsLoading(false);
        setIsError(true);
      });
  };

  useEffect(() => {
    fetchAthletes();
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewAthlete((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      await axios.post(`${apiUrl}/athletes`, newAthlete);
      toaster.create({
        title: "Athlete Created",
        description: "Your athlete has been successfully created.",
        duration: 3000,
      });
      setNewAthlete(initialAthleteState);
      setIsDialogOpen(false);
      fetchAthletes();
    } catch (error) {
      console.error("Failed to create athlete", error);
      toaster.error({
        title: "Athlete Creation Failed",
        description: "There was an error creating your athlete.",
        duration: 3000,
      });
    }
  };

  const dialogComponent = () => {
    return (
      <Dialog.Root
        placement="center"
        motionPreset="slide-in-bottom"
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open.open)}
      >
        <Dialog.Trigger asChild>
          <Button variant="outline" colorScheme="blue">
            Add New Client
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content as="form" onSubmit={handleSubmit}>
              <Dialog.Header>
                <Dialog.Title>Add a New Client</Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body>
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  p={4}
                  gap={4}
                  alignItems="flex-start"
                >
                  <VStack gap={4}>
                    <Field.Root>
                      <Field.Label>Name</Field.Label>
                      <Input
                        name="name"
                        value={newAthlete.name}
                        onChange={handleFormChange}
                        placeholder="Athlete's name"
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Email</Field.Label>
                      <Input
                        type="email"
                        name="email"
                        value={newAthlete.email}
                        onChange={handleFormChange}
                        placeholder="Athlete's email"
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Group</Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          name="group"
                          value={newAthlete.group}
                          onChange={handleFormChange}
                        >
                          <option value="">Select group</option>
                          <option value="Beginner Group">Beginner Group</option>
                          <option value="Intermediate Group">
                            Intermediate Group
                          </option>
                          <option value="Advanced Group">Advanced Group</option>
                        </NativeSelect.Field>
                      </NativeSelect.Root>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Group</Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          name="isActiveAthlete"
                          value={newAthlete.isActiveAthlete ? "true" : "false"}
                          onChange={handleFormChange}
                        >
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </NativeSelect.Field>
                      </NativeSelect.Root>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Join Date</Field.Label>
                      <Input
                        type="date"
                        name="joinDate"
                        value={newAthlete.joinDate}
                        onChange={handleFormChange}
                      />
                    </Field.Root>
                  </VStack>
                </Grid>
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue" variant="outline">
                  Save Athlete
                </Button>
              </Dialog.Footer>
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
