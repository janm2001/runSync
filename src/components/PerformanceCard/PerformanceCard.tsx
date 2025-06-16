import { Card } from "@chakra-ui/react";
import type { IPerformanceCard } from "./types";

const PerformanceCard = ({
  title,
  person,
  performance,
  color,
}: IPerformanceCard) => {
  return (
    <Card.Root p={4} mt={4} bg={color} color={`${color}.100`}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
        <Card.Description fontWeight={"bold"}>
          {person} - {performance}
        </Card.Description>
      </Card.Header>
    </Card.Root>
  );
};

export default PerformanceCard;
