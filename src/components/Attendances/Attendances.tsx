import type { Athlete, Training } from "@/data/dummyData";
import { Button, Checkbox, Flex, NativeSelect, Table } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toaster } from "../ui/toaster";

const Attendances = () => {
  //first select the training and then get all the attendances for that training
  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);
  const [attendances, setAttendances] = useState<number[]>([]);
  const [availableTrainings, setAvailableTrainings] = useState<Training[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [availableAttendances, setAvailableAttendances] = useState<Athlete[]>(
    []
  );

  const hasSelection = attendances.length > 0;
  const indeterminate =
    hasSelection && attendances.length < availableAttendances.length;

  const getAvailableTrainings = async () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    await axios
      .get(apiUrl + "/trainings", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setAvailableTrainings(response.data as Training[]);
      })
      .catch((error) => {
        console.error("Error fetching trainings:", error);
      });
  };

  const getAllAthletes = async () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    await axios
      .get(apiUrl + "/athletes", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setAthletes(response.data as Athlete[]);
      })
      .catch((error) => {
        console.error("Error fetching trainings:", error);
      });
  };

  const updateAttendances = async () => {
    const targetedTraining = availableTrainings.find(
      (training) => training.id === selectedTraining
    );
    if (!targetedTraining) {
      console.error("Selected training not found");
      return;
    }
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    await axios
      .put(`${apiUrl}/trainings/${selectedTraining}`, {
        ...targetedTraining,
        attendance: attendances.map((id) => id.toString()),
      })
      .then(() => {
        toaster.create({
          title: "Attendance Updated",
          description: "Your attendaces have been successfuly updated.",
          duration: 3000,
        });
      })
      .catch((error) => {
        console.error("Error updating attendances:", error);
      });
  };

  useEffect(() => {
    //for new get dummy data later add logic to fetch trainings from API
    getAvailableTrainings();
    getAllAthletes();
    //get available attendaces for the selected training
    if (selectedTraining !== null) {
      const targetedTraining = availableTrainings.find(
        (training) => training.id === selectedTraining
      );
      setAvailableAttendances(
        athletes.filter((athlete) => athlete.group == targetedTraining?.group)
      );
      setAttendances(targetedTraining?.attendance || []);
    }
  }, [selectedTraining]);

  const rows = availableAttendances.map((item) => (
    <Table.Row
      key={item.name}
      data-selected={attendances.includes(item.id) ? "" : undefined}
    >
      <Table.Cell>
        <Checkbox.Root
          size="sm"
          top="0.5"
          aria-label="Select row"
          checked={attendances.includes(item.id)}
          onCheckedChange={(changes) => {
            setAttendances((prev) =>
              changes.checked
                ? [...prev, item.id]
                : attendances.filter((id) => id !== item.id)
            );
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      </Table.Cell>
      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>{item.performance}</Table.Cell>
      <Table.Cell>${item.lastRun}</Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Flex direction={"column"} gap={4} p={4}>
        <NativeSelect.Root size="sm" width="240px">
          <NativeSelect.Field
            placeholder="Select Training for attendance"
            onChange={(e) => setSelectedTraining(e.target.value)}
          >
            {availableTrainings.map((training) => (
              <option value={training.id}>
                {training.title} - {training.date}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Flex>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="6">
              <Checkbox.Root
                size="sm"
                top="0.5"
                aria-label="Select all rows"
                checked={
                  indeterminate ? "indeterminate" : attendances.length > 0
                }
                onCheckedChange={(changes) => {
                  setAttendances(
                    changes.checked
                      ? availableAttendances.map((item) => item.id)
                      : []
                  );
                }}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
              </Checkbox.Root>
            </Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Performance</Table.ColumnHeader>
            <Table.ColumnHeader>Last Run</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
      <Flex justifyContent={"end"} my={4}>
        <Button
          variant="outline"
          colorPalette="cyan"
          onClick={updateAttendances}
        >
          Sync Attendances
        </Button>
      </Flex>
    </>
  );
};

export default Attendances;
