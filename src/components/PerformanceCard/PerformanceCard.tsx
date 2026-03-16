import { Card } from "@chakra-ui/react";
import AppCard from "@/components/ui/AppCard";
import type { IPerformanceCard } from "./types";

const PerformanceCard = ({
  title,
  person,
  performance,
  color,
}: IPerformanceCard) => {
  const personPerformance = person ? `${person} - ${performance}` : performance;
  return (
    <AppCard p={4} mt={4} bg={color} color={`${color}.100`}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
        <Card.Description fontWeight={"bold"}>
          {personPerformance}
        </Card.Description>
      </Card.Header>
    </AppCard>
  );
};

export default PerformanceCard;
