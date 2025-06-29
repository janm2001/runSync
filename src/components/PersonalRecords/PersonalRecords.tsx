import { Card, Icon } from "@chakra-ui/react";
import { FaTable } from "react-icons/fa";
import PersonalRecordCard from "./PersonalRecordCard";
const PersonalRecords = () => {
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
        <PersonalRecordCard
          title="5K Personal Best"
          time="22:45"
          description="Set 2 weeks ago"
          improvement="-30 sec"
        />
        <PersonalRecordCard
          title="10K Personal Best"
          time="47:30"
          description="Set 1 month ago"
          improvement=""
        />
        <PersonalRecordCard
          title="Half Marathon"
          time="1:45:00"
          description="Goal time"
          improvement="Target"
        />
      </Card.Body>
    </Card.Root>
  );
};

export default PersonalRecords;
