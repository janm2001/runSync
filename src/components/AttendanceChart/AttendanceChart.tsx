import { Card } from "@chakra-ui/react";
import LineChartAttendance from "./Chart";

const AttendanceChart = () => {
  return (
    <Card.Root p={4}>
      <Card.Title my={4}>Attendance by month (each group) </Card.Title>
      <LineChartAttendance />
    </Card.Root>
  );
};

export default AttendanceChart;
