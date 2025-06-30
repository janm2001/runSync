import { useReducer } from "react";
import type { Action, ICreateTrainingForm, IInterval } from "./types";
import {
  Box,
  Button,
  Input,
  NumberInput,
  Textarea,
  VStack,
  Field,
  NativeSelect,
  Icon,
  InputGroup,
} from "@chakra-ui/react";
import { FaSync } from "react-icons/fa";
import Intervals from "./Intervals";

const initialState: ICreateTrainingForm = {
  title: "",
  group: "",
  trainingType: "",
  duration: 60,
  date: "",
  intervals: [],
  distance: 0,
  trainingDescription: "",
};
const formReducer = (
  state: ICreateTrainingForm,
  action: Action
): ICreateTrainingForm => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case "SET_INTERVALS":
      return {
        ...state,
        intervals: action.payload,
      };
    case "RESET_FORM":
      return initialState;
    default:
      // If the action type doesn't match, we return the state unchanged.
      return state;
  }
};

const CreateTrainingForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // A generic handler to update any field.
  // It creates an action object and sends it to the reducer via dispatch.
  const handleFieldChange = (
    field: keyof ICreateTrainingForm,
    value: string | number
  ) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: { field, value },
    });
  };

  const handleIntervalsChange = (intervals: IInterval[]) => {
    dispatch({ type: "SET_INTERVALS", payload: intervals });
  };

  // Handler for the form submission.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted. Current State:", state);
    // Here you would typically send the 'state' object to your backend API.
    alert("Form data has been logged to the console! The form will now reset.");
    dispatch({ type: "RESET_FORM" });
  };

  return (
    <>
      <Box p={8} borderWidth="1px" borderRadius="lg" shadow="md">
        <form onSubmit={handleSubmit}>
          <VStack gap={6} align="stretch">
            {/* Title Input */}
            <Field.Root required>
              <Field.Label htmlFor="title">Session Title</Field.Label>
              <Input
                id="title"
                placeholder="Title of the training session"
                value={state.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
              />
            </Field.Root>

            {/* Group Select */}
            <Field.Root required>
              <Field.Label htmlFor="group">Group</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  id="group"
                  placeholder="Select a group"
                  value={state.group}
                  onChange={(e) => handleFieldChange("group", e.target.value)}
                >
                  <option value="spansko 6">Spansko 6</option>
                  <option value="spansko 5">Spansko 5</option>
                  <option value="spansko 4">Spansko 4</option>
                  <option value="spansko 3">Spansko 3</option>
                </NativeSelect.Field>
              </NativeSelect.Root>
            </Field.Root>

            {/* Training Type Select */}
            <Field.Root required>
              <Field.Label htmlFor="trainingType">Training Type</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  id="trainingType"
                  placeholder="Select a training type"
                  value={state.trainingType}
                  onChange={(e) =>
                    handleFieldChange("trainingType", e.target.value)
                  }
                >
                  <option value="Long Run">Long Run</option>
                  <option value="Interval Run">Interval Run</option>
                  <option value="Tempo Run">Tempo Run</option>
                  <option value="Hill Repeats">Hill Repeats</option>
                  <option value="Fartlek">Fartlek</option>
                  <option value="Recovery Run">Recovery Run</option>
                </NativeSelect.Field>
              </NativeSelect.Root>
            </Field.Root>

            {/* Conditionally render Intervals component */}
            {state.trainingType === "Interval Run" && (
              <Intervals
                intervals={state.intervals}
                onChange={handleIntervalsChange}
              />
            )}

            {/* Date Input */}
            <Field.Root required>
              <Field.Label htmlFor="date">Date</Field.Label>
              <Input
                id="date"
                placeholder="DD/MM/YYYY"
                value={state.date}
                type="date"
                onChange={(e) => handleFieldChange("date", e.target.value)}
              />
            </Field.Root>

            {/* Duration Number Input with the new syntax */}
            <Field.Root required>
              <Field.Label htmlFor="duration">Duration (minutes)</Field.Label>
              <NumberInput.Root
                id="duration"
                value={state.duration.toString()}
                min={0}
                step={15}
                onValueChange={({ value }: { value: string }) =>
                  handleFieldChange("duration", parseInt(value) || 0)
                }
              >
                <NumberInput.Input />
              </NumberInput.Root>
            </Field.Root>

            {/* Distance Number Input with "km" prefix and new syntax */}
            <Field.Root>
              <Field.Label htmlFor="distance">Distance</Field.Label>
              <NumberInput.Root
                id="distance"
                value={state.distance.toString()}
                min={0}
                step={0.1}
                onValueChange={({ value }: { value: string }) =>
                  handleFieldChange("distance", parseInt(value) || 0)
                }
              >
                <InputGroup
                  startElementProps={{ pointerEvents: "auto" }}
                  startElement={<NumberInput.Scrubber>km</NumberInput.Scrubber>}
                >
                  <NumberInput.Input />
                </InputGroup>
              </NumberInput.Root>
            </Field.Root>

            {/* Training Description Textarea */}
            <Field.Root required>
              <Field.Label htmlFor="trainingDescription">
                Training Description
              </Field.Label>
              <Textarea
                id="trainingDescription"
                placeholder="Describe the goals and content of the training session..."
                value={state.trainingDescription}
                onChange={(e) =>
                  handleFieldChange("trainingDescription", e.target.value)
                }
                rows={5}
              />
            </Field.Root>

            <Button
              type="submit"
              variant="outline"
              colorScheme="blue"
              size="lg"
              fontSize="md"
            >
              Create Session and Sync <Icon as={FaSync} ml={2} />
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default CreateTrainingForm;
