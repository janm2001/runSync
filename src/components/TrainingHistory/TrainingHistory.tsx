import { Card } from "@chakra-ui/react";
import TrainingCard from "../TrainingCard/TrainingCard";

const TrainingHistory = () => {
  return (
    <Card.Root p={2}>
      <Card.Header>
        <Card.Title alignItems={"center"} display="flex" gap={2}>
          Training History
        </Card.Title>
        <Card.Description>
          Your performance and coach feedback from recent sessions
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <TrainingCard
          trainingTitle="Tempo Run"
          date="2 days ago"
          time="45 min"
          pace="4:45/km"
          notes="Great pacing control!"
          grade="A"
        />

        <TrainingCard
          trainingTitle="Interval Training"
          date="5 days ago"
          time="50 min"
          pace="4:35/km"
          notes="Good effort on the intervals!"
          grade="B"
        />

        <TrainingCard
          trainingTitle="Long Run"
          date="1 week ago"
          time="75 min"
          pace="5:15/km"
          notes="Excellent endurance building"
          grade="C"
        />
      </Card.Body>
    </Card.Root>
  );
};

export default TrainingHistory;
