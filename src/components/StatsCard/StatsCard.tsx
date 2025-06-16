// StatsCard.tsx
import { Card, Flex, Icon, Text } from "@chakra-ui/react";
import { iconMap, type IconKey, type IStatCard } from "./types";

const StatsCard = ({
  title,
  icon,
  statNumber,
  info,
}: IStatCard & { icon: IconKey }) => {
  const SelectedIconComponent = iconMap[icon];

  return (
    <Card.Root>
      <Card.Header>
        <Flex justifyContent={"space-between"} alignItems="center">
          <Text fontWeight="semibold">{title}</Text>
          <Icon size="md">
            {SelectedIconComponent ? (
              <SelectedIconComponent />
            ) : (
              <span>Icon not found</span>
            )}
          </Icon>
        </Flex>
      </Card.Header>
      <Card.Body>
        <Text fontWeight="bold" fontSize="3xl">
          {statNumber}
        </Text>
      </Card.Body>
      <Card.Footer>
        <Text color="GrayText">{info}</Text>
      </Card.Footer>
    </Card.Root>
  );
};

export default StatsCard;
