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
import axios from "axios";
import { Toaster, toaster } from "../ui/toaster";
import { useLanguage } from "@/context/LanguageContext";

const initialState: ICreateTrainingForm = {
  title: "",
  group: "",
  type: "",
  duration: 60,
  date: "",
  intervals: [],
  distance: 0,
  attendance: [],
  description: "",
  pace: "",
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
  const { t } = useLanguage();
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

  // ...existing code...
  const calculateRunningMetrics = async (
    distance: number,
    duration: number
  ) => {
    if (distance <= 0) {
      return "0:00";
    }

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const proxyApiUrl = `${apiUrl}/pace`;

      const response = await axios.post(
        proxyApiUrl,
        { distance, duration },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      const result =
        xmlDoc.getElementsByTagName("CalculateResult")[0]?.textContent;

      if (result) {
        const decimalMinutes = parseFloat(result);
        const minutes = Math.floor(decimalMinutes);
        const seconds = Math.round((decimalMinutes - minutes) * 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      }
      return "0:00";
    } catch (error) {
      console.error("Error calculating pace via proxy:", error);
      // Fallback calculation if the proxy fails
      if (distance > 0) {
        const decimalMinutes = duration / distance;
        const minutes = Math.floor(decimalMinutes);
        const seconds = Math.round((decimalMinutes - minutes) * 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      }
      return "0:00";
    }
  };

  // Handler for the form submission.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const pace = await calculateRunningMetrics(
        state.distance,
        state.duration
      );
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      await axios.post(
        `${apiUrl}/trainings`,
        { ...state, pace: pace },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      toaster.create({
        title: "Training Session Created",
        description: t("create.training.success"),
        duration: 3000,
      });

      dispatch({ type: "RESET_FORM" });
    } catch (error) {
      console.error("Error creating training session:", error);
      toaster.create({
        title: "Error",
        description: t("create.training.error"),
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Box p={8} borderWidth="1px" borderRadius="lg" shadow="md">
        <form onSubmit={handleSubmit}>
          <VStack gap={6} align="stretch">
            {/* Title Input */}
            <Field.Root required>
              <Field.Label htmlFor="title">
                {t("create.training.form.title")}
              </Field.Label>
              <Input
                id="title"
                placeholder={t("create.training.form.title")}
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
                  placeholder={t("create.training.form.group")}
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
              <Field.Label htmlFor="type">Training Type</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  id="type"
                  placeholder={t("create.training.form.type")}
                  value={state.type}
                  onChange={(e) => handleFieldChange("type", e.target.value)}
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
            {state.type === "Interval Run" && (
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
                value={state.description}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
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
      <Toaster />
    </>
  );
};

export default CreateTrainingForm;
