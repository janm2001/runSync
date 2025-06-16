import { Card, Grid, Icon } from "@chakra-ui/react";
import GroupCard from "../GroupCard/GroupCard";
import { FaUsers } from "react-icons/fa";

const GroupOverview = () => {
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
          <GroupCard groupName="Spansko 6" members={7} pace="7:00-5:30" />
          <GroupCard groupName="Spansko 5" members={7} pace="6:30-5:00" />
          <GroupCard groupName="Spansko 4" members={7} pace="6:10-4:30" />
          <GroupCard groupName="Spansko 3" members={7} pace="5:30-3:45" />
        </Grid>
      </Card.Body>
    </Card.Root>
  );
};

export default GroupOverview;
