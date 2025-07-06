import { Card, Icon } from "@chakra-ui/react";
import { FaCalendar } from "react-icons/fa";
import TrainingSession from "../TrainingSessionCard/TrainingSession";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Training } from "@/data/dummyData";

const UpcomingTrainingSessions = () => {
  const [trainingSessions, setTrainingSessions] = useState<Training[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/trainings")
      .then((response) => {
        setTrainingSessions(response.data as Training[]);
      })
      .catch((error) => {
        console.error("Error fetching training sessions:", error);
      });
  }, []);
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
        {trainingSessions.length > 0 &&
          trainingSessions.map((session) => (
            <TrainingSession key={session.id} session={session} />
          ))}
      </Card.Body>
    </Card.Root>
  );
};

export default UpcomingTrainingSessions;
