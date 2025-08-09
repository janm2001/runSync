import { Button, Card, Flex, Icon } from "@chakra-ui/react";
import { FaTable } from "react-icons/fa";
import PersonalRecordCard from "./PersonalRecordCard";
import DownloadTimes from "../DownloadTimes/DownloadTimes";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext";

export interface Record {
  time: string;
  date: string;
  title: string;
  improvement: string;
}

export interface UserPersonalBests {
  userId: string;
  records: Record[]; // Simple array of records
}

const PersonalRecords = () => {
  const [records, setRecords] = useState<Record[] | null>(null);
  const { user } = useUser();
  const fetchRecords = async () => {
    try {
      await axios
        .get("http://localhost:3000/PersonalBests")
        .then((response) => {
          if (!user) return;
          const userRecords = response.data.find(
            (data: UserPersonalBests) => data.userId === user.id
          );
          if (userRecords) {
            setRecords(userRecords.records);
          }
        });
    } catch (error) {
      console.error("Error fetching personal records:", error);
    }
  };
  useEffect(() => {
    fetchRecords();
  }, [user]);

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
        {records && records.length >= 3 && (
          <>
            <PersonalRecordCard
              title="5K Personal Best"
              time={records[0]?.time || "N/A"}
              description={`Set ${records[0]?.date}`}
              improvement={records[0]?.improvement}
            />
            <PersonalRecordCard
              title="10K Personal Best"
              time={records[1]?.time || "N/A"}
              description={`Set ${records[1]?.date}`}
              improvement={records[1]?.improvement}
            />
            <PersonalRecordCard
              title="Half Marathon Personal Best"
              time={records[2]?.time || "N/A"}
              description={`Set ${records[2]?.date}`}
              improvement={records[2]?.improvement}
            />
          </>
        )}
        <DownloadTimes />
      </Card.Body>
    </Card.Root>
  );
};

export default PersonalRecords;
