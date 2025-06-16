import { Card, Grid } from "@chakra-ui/react";
import ProgressStatus from "../ProgressStatus/ProgressStatus";
import PerformanceCard from "../PerformanceCard/PerformanceCard";

const Analytics = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="4">
      <Card.Root p={4}>
        <Card.Header>
          <Card.Title>Group Progress Monthly</Card.Title>
        </Card.Header>
        <Card.Body>
          <ProgressStatus groupName="Spansko 6" progress={63} />
          <ProgressStatus groupName="Spansko 5" progress={72} />
          <ProgressStatus groupName="Spansko 4" progress={85} />
          <ProgressStatus groupName="Spansko 3" progress={92} />
        </Card.Body>
      </Card.Root>

      <Card.Root p={4}>
        <Card.Header>
          <Card.Title>Performance Insight</Card.Title>
        </Card.Header>

        <Card.Body>
          <PerformanceCard
            title="Top Performer"
            person="Mike Chen"
            performance="15% Improvement this year"
            color="teal"
          />
          <PerformanceCard
            title="Most Consistent"
            person="Emma Davis"
            performance="98% training attendance"
            color="purple"
          />
          <PerformanceCard
            title="Needs Attention"
            person="James Wilson"
            performance="Consider group transition"
            color="orange"
          />
        </Card.Body>
      </Card.Root>
    </Grid>
  );
};

export default Analytics;
