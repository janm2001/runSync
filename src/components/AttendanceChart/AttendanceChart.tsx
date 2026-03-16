import { Card } from "@chakra-ui/react";
import AppCard from "@/components/ui/AppCard";
import LineChartAttendance from "./Chart";
import { useLanguage } from "@/context/LanguageContext";

const AttendanceChart = () => {
  const { t } = useLanguage();
  return (
    <AppCard p={4}>
      <Card.Title my={4}>{t("analytics.attendance.title")}</Card.Title>
      <LineChartAttendance />
    </AppCard>
  );
};

export default AttendanceChart;
