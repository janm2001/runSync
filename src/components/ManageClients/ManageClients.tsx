import {
  Button,
  ButtonGroup,
  Card,
  CloseButton,
  Dialog,
  EmptyState,
  Field,
  Flex,
  IconButton,
  Input,
  NativeSelect,
  Pagination,
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
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const initialAthleteState = {
  name: "",
  email: "",
  group: "",
  joinDate: new Date().toISOString().split("T")[0],
  attendance: 0, // Added to match backend model
};

const ManageClients = () => {
  const [clients, setClients] = useState<Athlete[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAthlete, setNewAthlete] = useState(initialAthleteState);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
  });
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterGroup, setFilterGroup] = useState("");

  const fetchAthletes = (pageToFetch: number) => {
    setIsLoading(true);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    axios
      .get(`${apiUrl}/athletes`, {
        params: {
          sortBy,
          sortOrder,
          filterGroup: filterGroup || null,
          page: pageToFetch,
          pageSize: pagination.pageSize,
        },
      })
      .then((response) => {
        console.log(response);
        setClients(response.data.athletes || response.data);
        setPagination(response.data.pagination);
        setIsLoading(false);
        setIsError(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  useEffect(() => {
    fetchAthletes(pagination.currentPage);
  }, [sortBy, sortOrder, filterGroup, pagination.currentPage]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isBooleanField = name === "isActiveAthlete";
    setNewAthlete((prev) => ({
      ...prev,
      [name]: isBooleanField ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      // Ensure attendance is a number before sending
      const athleteData = {
        ...newAthlete,
        attendance: Number(newAthlete.attendance) || 0,
      };
      console.log("Submitting athlete data:", athleteData); // Log the data
      await axios.post(`${apiUrl}/athletes`, athleteData);
      toaster.create({
        title: "Athlete Created",
        description: "Your athlete has been successfully created.",
        duration: 3000,
      });
      setNewAthlete(initialAthleteState);
      setIsDialogOpen(false);
      if (pagination.currentPage !== 1) {
        setPagination((prev) => ({ ...prev, currentPage: 1 }));
      } else {
        fetchAthletes(1);
      }
    } catch (error) {
      console.error("Failed to create athlete", error);

      // Enhanced error logging to show backend validation errors
      if (axios.isAxiosError(error) && error.response) {
        console.error("Backend Response Error:", error.response.data);
        const errorData = error.response.data;
        // ASP.NET Core validation errors are often in an 'errors' object.
        const errorMessages = errorData.errors
          ? JSON.stringify(errorData.errors)
          : "Check the console for the full error object.";

        toaster.error({
          title: "Athlete Creation Failed",
          description: `The server responded with an error: ${errorMessages}`,
          duration: 5000, // Give more time to read
        });
      } else {
        toaster.error({
          title: "Athlete Creation Failed",
          description: "An unexpected error occurred. Check the console.",
          duration: 3000,
        });
      }
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
                        <option value="spansko 2">Spansko 2</option>
                        <option value="spansko 3">Spansko 3</option>
                        <option value="spansko 4">Spansko 4</option>
                        <option value="spansko 5">Spansko 5</option>
                        <option value="spansko 6">Spansko 6</option>
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
            <Flex justifyContent="space-between" alignItems="center" mt={4}>
              <Flex gap={4}>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [sort, order] = e.target.value.split("-");
                      setSortBy(sort);
                      setSortOrder(order);
                    }}
                  >
                    <option value="name-asc">Name Asc</option>
                    <option value="name-desc">Name Desc</option>
                  </NativeSelect.Field>
                </NativeSelect.Root>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    value={filterGroup}
                    onChange={(e) => setFilterGroup(e.target.value)}
                  >
                    <option value="">All Groups</option>
                    <option value="spansko 2">Spansko 2</option>
                    <option value="spansko 3">Spansko 3</option>
                    <option value="spansko 4">Spansko 4</option>
                    <option value="spansko 5">Spansko 5</option>
                    <option value="spansko 6">Spansko 6</option>
                  </NativeSelect.Field>
                </NativeSelect.Root>
              </Flex>
              {dialogComponent()}
            </Flex>
          </Card.Header>
          <Card.Body>
            {clients.length > 0 ? (
              clients.map((athlete) => (
                <ClientCard
                  key={athlete.id}
                  name={athlete.name}
                  group={athlete.group}
                  email={athlete.email}
                  isActiveAthlete={athlete.isActiveAthlete}
                  daysSinceJoining={athlete.daysSinceJoining}
                />
              ))
            ) : (
              <EmptyState.Root>
                <EmptyState.Content>
                  <EmptyState.Indicator>
                    <HiColorSwatch />
                  </EmptyState.Indicator>
                  <VStack textAlign="center">
                    <EmptyState.Title>No Clients Found</EmptyState.Title>
                    <EmptyState.Description>
                      There are no clients matching your criteria.
                    </EmptyState.Description>
                  </VStack>
                </EmptyState.Content>
              </EmptyState.Root>
            )}
            {clients.length > 0 && (
              <Pagination.Root
                my={2}
                count={pagination.totalCount}
                pageSize={pagination.pageSize}
                page={pagination.currentPage}
                onPageChange={(details) =>
                  setPagination((prev) => ({
                    ...prev,
                    currentPage: details.page,
                  }))
                }
              >
                <ButtonGroup variant="ghost" size="sm">
                  <Pagination.PrevTrigger asChild>
                    <IconButton>
                      <LuChevronLeft />
                    </IconButton>
                  </Pagination.PrevTrigger>

                  <Pagination.Items
                    render={(page) => (
                      <IconButton
                        variant={{ base: "ghost", _selected: "outline" }}
                      >
                        {page.value}
                      </IconButton>
                    )}
                  />

                  <Pagination.NextTrigger asChild>
                    <IconButton>
                      <LuChevronRight />
                    </IconButton>
                  </Pagination.NextTrigger>
                </ButtonGroup>
              </Pagination.Root>
            )}
          </Card.Body>
        </>
      )}
    </Card.Root>
  );
};

export default ManageClients;
