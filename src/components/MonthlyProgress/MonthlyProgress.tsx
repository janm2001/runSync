import GroupPosition from "@/components/GroupPosition/GroupPosition";
import { Card } from "@chakra-ui/react";

const MonthlyProgress = () => {
  return (
    <Card.Root>
      <Card.Header>Monthly Progress</Card.Header>
      <Card.Body>
        <GroupPosition
          text="Training sessions complited"
          position={8}
          total={10}
        />
        <GroupPosition
          text="Pace Improvement"
          position={8}
          total={10}
          percentage={15}
        />
        <GroupPosition
          text="Endurance building"
          position={8}
          total={10}
          percentage={22}
        />
      </Card.Body>
    </Card.Root>
  );
};

export default MonthlyProgress;
