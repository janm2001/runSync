import { Card, EmptyState, Icon, SkeletonText, VStack } from "@chakra-ui/react";
import { FaCalendar } from "react-icons/fa";
import TrainingSession from "../TrainingSessionCard/TrainingSession";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Training } from "@/data/dummyData";
import { HiColorSwatch } from "react-icons/hi";

const UpcomingTrainingSessions = () => {
  const [trainingSessions, setTrainingSessions] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchTrainingSessions = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    axios
      .get(`${apiUrl}/trainings`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTrainingSessions(response.data as Training[]);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        console.error("Error fetching training sessions:", error);
        setIsLoading(false);
        setIsError(true);
      });
  };

  useEffect(() => {
    fetchTrainingSessions();
  }, []);
  if (isError) {
    return (
      <Card.Root p={2}>
        <Card.Header>
          <Card.Title alignItems={"center"} display="flex" gap={2}>
            <Icon size={"lg"}>
              <FaCalendar />
            </Icon>{" "}
            Upcoming Training Sessions
          </Card.Title>
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
    <Card.Root p={2} mt={4}>
      {isLoading ? (
        <SkeletonText noOfLines={4} gap="4" mt="4" />
      ) : (
        <>
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
                <TrainingSession
                  key={session.id}
                  session={session}
                  fetchTrainingSessions={fetchTrainingSessions}
                />
              ))}
          </Card.Body>
        </>
      )}
    </Card.Root>
  );
};

export default UpcomingTrainingSessions;
