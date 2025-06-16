import { Card, Icon } from "@chakra-ui/react";
import { FaCalendar } from "react-icons/fa";
import TrainingSession from "../TrainingSessionCard/TrainingSession";

const UpcomingTrainingSessions = () => {
  return (
    <Card.Root p={2} mt={4}>
      <Card.Header>
        <Card.Title alignItems={"center"} display="flex" gap={2}>
          <Icon size={"lg"}>
            <FaCalendar />
          </Icon>{" "}
          Upcoming Training Sessions
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <TrainingSession
          trainingTitle="Interval Training"
          groupName="Spansko 5"
          time="Tomorrow 19:00"
          trainingType="Speed work"
        />
        <TrainingSession
          trainingTitle="Long Run"
          groupName="Spansko 4"
          time="Sunday 20:30"
          trainingType="Endurance"
        />
        <TrainingSession
          trainingTitle="Recovery Run"
          groupName="Spansko 3"
          time="Saturday 19:00"
          trainingType="Recovery"
        />
      </Card.Body>
    </Card.Root>
  );
};

export default UpcomingTrainingSessions;
