import { Card } from "@chakra-ui/react";
import LineChartAttendance from "./Chart";
import { useLanguage } from "@/context/LanguageContext";

const AttendanceChart = () => {
  const { t } = useLanguage();
  return (
    <Card.Root p={4}>
      <Card.Title my={4}>{t("analytics.attendance.title")}</Card.Title>
      <LineChartAttendance />
    </Card.Root>
  );
};

export default AttendanceChart;
