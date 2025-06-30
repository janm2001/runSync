import { Card, Grid, Icon } from "@chakra-ui/react";
import GroupCard from "../GroupCard/GroupCard";
import { FaUsers } from "react-icons/fa";
import { groups, type Group } from "@/data/dummyData";
import { useEffect, useState } from "react";

const GroupOverview = () => {
  const [groupData, setGroupData] = useState<Group[]>([]);
  useEffect(() => {
    // Fetch group data from API or use dummy data
    setGroupData(groups);
  }, []);
  return (
    <Card.Root p={2}>
      <Card.Header>
        <Card.Title alignItems={"center"} display="flex" gap={2}>
          <Icon size={"lg"}>
            <FaUsers />
          </Icon>{" "}
          Group Overview
        </Card.Title>
        <Card.Description>
          Monitor your training groups at a glance
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {groupData.length > 0 &&
            groupData.map((group) => (
              <GroupCard
                groupName={group.name}
                members={group.members}
                pace={group.avgPace}
              />
            ))}
        </Grid>
      </Card.Body>
    </Card.Root>
  );
};

export default GroupOverview;
