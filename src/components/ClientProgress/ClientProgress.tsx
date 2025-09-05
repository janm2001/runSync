import { Grid } from "@chakra-ui/react";
import PersonalRecords from "@/components/PersonalRecords/PersonalRecords";
import MonthlyProgress from "@/components/MonthlyProgress/MonthlyProgress";

const ClientProgress = () => {
  return (
    <Grid templateColumns={"repeat(2, 1fr)"} gap={4}>
      <PersonalRecords />
      <MonthlyProgress />
    </Grid>
  );
};

export default ClientProgress;
