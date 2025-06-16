import { Card, Text } from "@chakra-ui/react";
import type { IGroupCard } from "./types";

const GroupCard = ({ groupName, members, pace }: IGroupCard) => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>{groupName}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Text color="GrayText">Members: {members}</Text>
        <Text color="GrayText">Avg Pace: {pace} min/km</Text>
      </Card.Body>
    </Card.Root>
  );
};

export default GroupCard;
