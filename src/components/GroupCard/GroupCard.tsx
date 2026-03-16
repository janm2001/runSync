import { Card, Text } from "@chakra-ui/react";
import AppCard from "@/components/ui/AppCard";
import type { IGroupCard } from "./types";
import { useLanguage } from "@/context/LanguageContext";

const GroupCard = ({ groupName, members, pace }: IGroupCard) => {
  const { t } = useLanguage();
  return (
    <AppCard>
      <Card.Header>
        <Card.Title>{groupName}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Text color="GrayText">
          {t("group.card.members")}: {members}
        </Text>
        <Text color="GrayText">
          {t("group.card.avg.pace")}: {pace} min/km
        </Text>
      </Card.Body>
    </AppCard>
  );
};

export default GroupCard;
