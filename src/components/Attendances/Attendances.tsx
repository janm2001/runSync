import { trainings, type Training } from "@/data/dummyData";
import { Flex, NativeSelect } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Attendances = () => {
  //first select the training and then get all the attendances for that training
  const [selectedTraining, setSelectedTraining] = useState<number | null>(null);
  const [attendances, setAttendances] = useState<number[]>([]);
  const [availableTrainings, setAvailableTrainings] = useState<Training[]>([]);

  useEffect(() => {
    //for new get dummy data later add logic to fetch trainings from API
    setAvailableTrainings(trainings);
  }, []);

  return (
    <Flex direction={"column"} gap={4} p={4}>
      <NativeSelect.Root size="sm" width="240px">
        <NativeSelect.Field
          placeholder="Select Training for attendance"
          onChange={(e) => setSelectedTraining(Number(e.target.value))}
        >
          {availableTrainings.map((training) => (
            <option value={training.id}>{training.title}</option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Flex>
  );
};

export default Attendances;
