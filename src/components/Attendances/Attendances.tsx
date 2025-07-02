import {
  athletes,
  trainings,
  type Athlete,
  type Training,
} from "@/data/dummyData";
import { Checkbox, Flex, NativeSelect, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Attendances = () => {
  //first select the training and then get all the attendances for that training
  const [selectedTraining, setSelectedTraining] = useState<number | null>(null);
  const [attendances, setAttendances] = useState<number[]>([]);
  const [availableTrainings, setAvailableTrainings] = useState<Training[]>([]);
  const [availableAttendances, setAvailableAttendances] = useState<Athlete[]>(
    []
  );

  const hasSelection = attendances.length > 0;
  const indeterminate =
    hasSelection && attendances.length < availableAttendances.length;

  useEffect(() => {
    //for new get dummy data later add logic to fetch trainings from API
    setAvailableTrainings(trainings);
    //get available attendaces for the selected training
    if (selectedTraining !== null) {
      const targetedTraining = trainings.find(
        (training) => training.id === selectedTraining
      );
      setAvailableAttendances(
        athletes.filter((athlete) => athlete.group === targetedTraining?.group)
      );
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
            onChange={(e) => setSelectedTraining(Number(e.target.value))}
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
    </>
  );
};

export default Attendances;
