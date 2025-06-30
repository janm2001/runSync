import { Card } from "@chakra-ui/react";
import ClientCard from "../ClientCard/ClientCard";
import { useEffect, useState } from "react";
import { athletes, type Athlete } from "@/data/dummyData";

const ManageClients = () => {
  const [clients, setClients] = useState<Athlete[]>([]);
  useEffect(() => {
    //fetch atheletes from API but for now from dummyData
    setClients(athletes);
  }, []);
  return (
    <Card.Root>
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
    </Card.Root>
  );
};

export default ManageClients;
