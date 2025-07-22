import { Card, EmptyState, SkeletonText, VStack } from "@chakra-ui/react";
import ClientCard from "../ClientCard/ClientCard";
import { useEffect, useState } from "react";
import { type Athlete } from "@/data/dummyData";
import axios from "axios";
import { HiColorSwatch } from "react-icons/hi";

const ManageClients = () => {
  const [clients, setClients] = useState<Athlete[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    axios
      .get(apiUrl + "/athletes", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setClients(response.data);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        console.error("Error fetching athletes data:", error);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);
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
          </Card.Header>
          <Card.Body>
            {clients.length > 0 &&
              clients.map((athlete) => {
                return (
                  <ClientCard
                    key={athlete.id}
                    name={athlete.name}
                    group={athlete.group}
                    lastRun={athlete.lastRun}
                    performance={athlete.performance}
                    improvement={athlete.improvement}
                  />
                );
              })}
          </Card.Body>
        </>
      )}
    </Card.Root>
  );
};

export default ManageClients;
