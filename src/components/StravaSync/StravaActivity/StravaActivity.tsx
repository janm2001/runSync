import { Card } from "@chakra-ui/react";

interface StravaActivityProps {
  name: string;
  startDate: string;
  distance: string;
  duration: string;
}

const StravaActivity = (props: StravaActivityProps) => {
  return (
    <Card.Root>
      <Card.Header>
        <h2>{props.name}</h2>
      </Card.Header>
      <Card.Body>
        <p>Start Date: {props.startDate}</p>
        <p>Distance: {props.distance} km</p>
        <p>Duration: {props.duration} min</p>
      </Card.Body>
    </Card.Root>
  );
};

export default StravaActivity;
