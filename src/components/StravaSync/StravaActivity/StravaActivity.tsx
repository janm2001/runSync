import { Card } from "@chakra-ui/react";
import AppCard from "@/components/ui/AppCard";

interface StravaActivityProps {
  name: string;
  startDate: string;
  distance: string;
  duration: string;
}

const StravaActivity = (props: StravaActivityProps) => {
  return (
    <AppCard>
      <Card.Header>
        <h2>{props.name}</h2>
      </Card.Header>
      <Card.Body>
        <p>Start Date: {props.startDate}</p>
        <p>Distance: {props.distance} km</p>
        <p>Duration: {props.duration} min</p>
      </Card.Body>
    </AppCard>
  );
};

export default StravaActivity;
