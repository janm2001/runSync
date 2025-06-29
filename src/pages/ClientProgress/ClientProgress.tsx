import { Grid } from "@chakra-ui/react";
import MonthlyProgress from "../MonthlyProgress/MonthlyProgress";
import PersonalRecords from "@/components/PersonalRecords/PersonalRecords";

const ClientProgress = () => {
  return (
    <Grid templateColumns={"repeat(2, 1fr)"} gap={4}>
      <PersonalRecords />
      <MonthlyProgress />
    </Grid>
  );
};

export default ClientProgress;
