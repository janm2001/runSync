import {
  Box,
  Button,
  Field,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  NumberInput,
  VStack,
} from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import type { IInterval } from "./types";

export interface IIntervalsProps {
  intervals: IInterval[];
  onChange: (intervals: IInterval[]) => void;
}

const Intervals = ({ intervals, onChange }: IIntervalsProps) => {
  const addInterval = () => {
    const newInterval: IInterval = {
      id: crypto.randomUUID(), // Modern way to get a unique ID
      repetitions: 1,
      distance: 400,
      pace: "04:00",
      rest: "90s",
    };
    onChange([...intervals, newInterval]);
  };

  const removeInterval = (id: string) => {
    onChange(intervals.filter((interval) => interval.id !== id));
  };

  const handleIntervalChange = (
    id: string,
    field: keyof Omit<IInterval, "id">,
    value: string | number
  ) => {
    const updatedIntervals = intervals.map((interval) => {
      if (interval.id === id) {
        return { ...interval, [field]: value };
      }
      return interval;
    });
    onChange(updatedIntervals);
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" w="100%">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Intervals</Heading>
        <Button variant="outline" colorScheme="blue" onClick={addInterval}>
          Add Interval <Icon as={FaPlus} />
        </Button>
      </Flex>
      <VStack gap={4} align="stretch">
        {intervals.map((interval) => (
          <HStack key={interval.id} gap={2} align="flex-end">
            {/* Repetitions */}

            <Field.Root required>
              <Field.Label htmlFor={`repetitions-${interval.id}`}>
                Reps
              </Field.Label>
              <NumberInput.Root
                id={`repetitions-${interval.id}`}
                value={interval.repetitions.toString()}
                min={0}
                step={30}
                onValueChange={(details) =>
                  handleIntervalChange(
                    interval.id,
                    "repetitions",
                    isNaN(Number(details.valueAsNumber))
                      ? 1
                      : Number(details.valueAsNumber)
                  )
                }
              >
                <NumberInput.Input />
              </NumberInput.Root>
            </Field.Root>

            {/* Distance */}
            <Field.Root required>
              <Field.Label htmlFor={`distance-${interval.id}`}>
                Reps
              </Field.Label>
              <NumberInput.Root
                id={`distance-${interval.id}`}
                value={interval.distance.toString()}
                min={0}
                step={30}
                onValueChange={(details) =>
                  handleIntervalChange(
                    interval.id,
                    "distance",
                    isNaN(Number(details.valueAsNumber))
                      ? 1
                      : Number(details.valueAsNumber)
                  )
                }
              >
                <NumberInput.Input />
              </NumberInput.Root>
            </Field.Root>

            {/* Pace */}
            <Field.Root required>
              <Field.Label htmlFor={`pace-${interval.id}`}>Pace</Field.Label>
              <Input
                id={`pace-${interval.id}`}
                value={interval.pace}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleIntervalChange(interval.id, "pace", e.target.value)
                }
              ></Input>
            </Field.Root>

            {/* Rest */}
            <Field.Root required>
              <Field.Label htmlFor={`rest-${interval.id}`}>Rest</Field.Label>
              <Input
                id={`rest-${interval.id}`}
                value={interval.rest}
                placeholder="e.g., 200m jog or 60s"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleIntervalChange(interval.id, "rest", e.target.value)
                }
              ></Input>
            </Field.Root>

            {/* Remove Button */}
            <IconButton
              aria-label="Remove interval"
              colorScheme="red"
              variant="ghost"
              onClick={() => removeInterval(interval.id)}
            >
              <FaTrash />
            </IconButton>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Intervals;
