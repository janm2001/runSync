import { Card, Grid, Icon, SkeletonText } from "@chakra-ui/react";
import GroupCard from "../GroupCard/GroupCard";
import { FaUsers } from "react-icons/fa";
import { type Group } from "@/data/dummyData";
import { useEffect, useState } from "react";
import axios from "axios";

const GroupOverview = () => {
  const [groupData, setGroupData] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    // Fetch group data from API or use dummy data
    // Simulating an API call with dummy data
    axios
      .get("http://localhost:3000/groups")
      .then((response) => {
        setGroupData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching group data:", error);
        setIsLoading(false);
      });
  }, []);
  return (
    <Card.Root p={2}>
      {isLoading ? (
        <SkeletonText noOfLines={4} gap="4" mt="4" />
      ) : (
        <>
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
                    key={group.id}
                    groupName={group.name}
                    members={group.members}
                    pace={group.avgPace}
                  />
                ))}
            </Grid>
          </Card.Body>{" "}
        </>
      )}
    </Card.Root>
  );
};

export default GroupOverview;
