import { Card, Grid } from "@chakra-ui/react";
import GroupPosition from "../GroupPosition/GroupPosition";
import PerformanceCard from "../PerformanceCard/PerformanceCard";

const MyGroup = () => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Group Performance</Card.Title>
        <Card.Description>
          How you compare with your training group
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <GroupPosition position={3} total={10} />
        <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
          <PerformanceCard
            title="Your average pace"
            performance="7:05/km"
            color="blue"
          />
          <PerformanceCard
            title="Consistency Score"
            performance="92%"
            color="teal"
          />
        </Grid>
      </Card.Body>
    </Card.Root>
  );
};

export default MyGroup;
