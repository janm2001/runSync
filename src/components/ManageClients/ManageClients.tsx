import { Card } from "@chakra-ui/react";
import ClientCard from "../ClientCard/ClientCard";

const ManageClients = () => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Client Management</Card.Title>
        <Card.Description>
          Track and grade individual athlete performance
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <ClientCard
          name="Sarah Johnson"
          group="Spansko 5"
          lastRun="2 days ago"
          performance={85}
          improvement="+12%"
        />
        <ClientCard
          name="Mike Chen"
          group="Spansko 4"
          lastRun="1 days ago"
          performance={82}
          improvement="+15%"
        />
        <ClientCard
          name="Emma Davis"
          group="Spansko 3"
          lastRun="Today"
          performance={79}
          improvement="+5%"
        />
        <ClientCard
          name="James Wilson"
          group="Spansko 6"
          lastRun="3 days ago"
          performance={92}
          improvement="+20%"
        />
      </Card.Body>
    </Card.Root>
  );
};

export default ManageClients;
