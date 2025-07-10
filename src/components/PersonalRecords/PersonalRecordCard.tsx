import { Box, Card, Flex } from "@chakra-ui/react";

interface IPersonalRecordCard {
  title: string;
  time: string;
  improvement?: string;
  description?: string;
}

const PersonalRecordCard = ({
  title,
  time,
  improvement,
  description,
}: IPersonalRecordCard) => {
  return (
    <Card.Root p={2} mt={4}>
      <Flex align="center" justify={"space-between"} gap={4}>
        <Box>
          <Card.Header>
            <Card.Title alignItems={"center"} display="flex" gap={2}>
              {title}
            </Card.Title>
          </Card.Header>
          <Card.Description ml={6}>
            {description ? description : "No description available"}
          </Card.Description>
        </Box>

        <Box>
          <Card.Header>
            <Card.Title alignItems={"center"} display="flex" gap={2}>
              {time}
            </Card.Title>
          </Card.Header>
          <Card.Description ml={6}>
            {improvement ? improvement : "-"}
          </Card.Description>
        </Box>
      </Flex>
    </Card.Root>
  );
};

export default PersonalRecordCard;
