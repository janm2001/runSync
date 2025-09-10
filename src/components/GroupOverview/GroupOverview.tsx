import {
  Card,
  EmptyState,
  Grid,
  Icon,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";
import GroupCard from "../GroupCard/GroupCard";
import { FaUsers } from "react-icons/fa";
import { type Group } from "@/data/dummyData";
import { useEffect, useState } from "react";
import axios from "axios";
import { HiColorSwatch } from "react-icons/hi";
import { useLanguage } from "@/context/LanguageContext";

const GroupOverview = () => {
  const [groupData, setGroupData] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const { t } = useLanguage();
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    axios
      .get(apiUrl + "/groups", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setGroupData(response.data);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        console.error("Error fetching group data:", error);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isError) {
    return (
      <Card.Root p={2}>
        <Card.Header>
          <Card.Title alignItems={"center"} display="flex" gap={2}>
            <Icon size={"lg"}>
              <FaUsers />
            </Icon>{" "}
            {t("group.overview.title")}
          </Card.Title>
          <Card.Description>{t("group.overview.description")}</Card.Description>
        </Card.Header>
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <HiColorSwatch />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>{t("group.overview.no.data")}</EmptyState.Title>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      </Card.Root>
    );
  }
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
              {t("group.overview.title")}
            </Card.Title>
            <Card.Description>
              {t("group.overview.description")}
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
