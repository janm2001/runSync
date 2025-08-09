import { Button, Card, Flex, Icon } from "@chakra-ui/react";
import { FaTable } from "react-icons/fa";
import PersonalRecordCard from "./PersonalRecordCard";
import DownloadTimes from "../DownloadTimes/DownloadTimes";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext";

export interface PersonalRecord {
  userId: string;
  fiveKPB: string;
  tenKPB: string;
  halfPB: string;
}
const PersonalRecords = () => {
  const [records, setRecords] = useState<PersonalRecord | null>(null);
  const { user } = useUser();
  const fetchRecords = async () => {
    try {
      await axios
        .get("http://localhost:3000/PersonalBests")
        .then((response) => {
          //only get the current user's records
          if (!user) return;
          console.log(user.id);
          console.log(response.data);
          const userRecords = response.data.find(
            (record: PersonalRecord) => record.userId === user.id
          );
          if (userRecords) setRecords(userRecords);
        });
    } catch (error) {
      console.error("Error fetching personal records:", error);
    }
  };
  useEffect(() => {
    fetchRecords();
  }, []);
  return (
    <Card.Root p={2}>
      <Card.Header>
        <Card.Title alignItems={"center"} display="flex" gap={2}>
          <Icon size={"lg"}>
            <FaTable />
          </Icon>{" "}
          Personal Records
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Flex justifyContent="end">
          <Button variant="outline" size="sm">
            Edit Records
          </Button>
        </Flex>
        {records && (
          <>
            <PersonalRecordCard
              title="5K Personal Best"
              time={records.fiveKPB || "N/A"}
              description="Set 2 weeks ago"
              improvement="-30 sec"
            />
            <PersonalRecordCard
              title="10K Personal Best"
              time={records.tenKPB || "N/A"}
              description="Set 1 month ago"
              improvement=""
            />
            <PersonalRecordCard
              title="Half Marathon"
              time={records.halfPB || "N/A"}
              description="Goal time"
              improvement="Target"
            />
          </>
        )}
        <DownloadTimes />
      </Card.Body>
    </Card.Root>
  );
};

export default PersonalRecords;
