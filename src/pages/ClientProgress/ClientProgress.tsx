import { Grid } from "@chakra-ui/react";
import MonthlyProgress from "../MonthlyProgress/MonthlyProgress";

const ClientProgress = () => {
  return (
    <Grid templateColumns={"repeat(2, 1fr)"} gap={4}>
      <h2>Personal Records</h2>
      <MonthlyProgress />
    </Grid>
  );
};

export default ClientProgress;
