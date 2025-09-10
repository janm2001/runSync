import { Card, Grid } from "@chakra-ui/react";
import GroupPosition from "../GroupPosition/GroupPosition";
import PerformanceCard from "../PerformanceCard/PerformanceCard";
import { useLanguage } from "@/context/LanguageContext";

const MyGroup = () => {
  const { t } = useLanguage();
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>{t("mygroup.title")}</Card.Title>
        <Card.Description>{t("mygroup.description")}</Card.Description>
      </Card.Header>
      <Card.Body>
        <GroupPosition position={3} total={10} />
        <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
          <PerformanceCard
            title={t("mygroup.avg.pace")}
            performance="7:05/km"
            color="blue"
          />
          <PerformanceCard
            title={t("mygroup.consistency.score")}
            performance="92%"
            color="teal"
          />
        </Grid>
      </Card.Body>
    </Card.Root>
  );
};

export default MyGroup;
