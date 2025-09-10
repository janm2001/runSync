import GroupPosition from "@/components/GroupPosition/GroupPosition";
import { useLanguage } from "@/context/LanguageContext";
import { Card } from "@chakra-ui/react";

const MonthlyProgress = () => {
  const { t } = useLanguage();
  return (
    <Card.Root>
      <Card.Header>{t("monthly.progress.title")}</Card.Header>
      <Card.Body>
        <GroupPosition
          text={t("monthly.progress.trainings")}
          position={8}
          total={10}
        />
        <GroupPosition
          text={t("monthly.progress.pace.improvement")}
          position={8}
          total={10}
          percentage={15}
        />
        <GroupPosition
          text={t("monthly.progress.endurance.improvement")}
          position={8}
          total={10}
          percentage={22}
        />
      </Card.Body>
    </Card.Root>
  );
};

export default MonthlyProgress;
