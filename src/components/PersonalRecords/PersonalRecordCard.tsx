import { Box, Card, Flex, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface IPersonalRecordCard {
  title: string;
  time: string;
  improvement?: string;
  description?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PersonalRecordCard = ({
  title,
  time,
  improvement,
  description,
  onEdit,
  onDelete,
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
      <Flex justify="space-between" align="center" mt={2}>
        <div></div>
        <Flex gap={2}>
          {onEdit && (
            <IconButton
              size="sm"
              variant="ghost"
              aria-label="Edit record"
              onClick={onEdit}
            >
              <FaEdit />
            </IconButton>
          )}
          {onDelete && (
            <IconButton
              size="sm"
              variant="ghost"
              colorScheme="red"
              aria-label="Delete record"
              onClick={onDelete}
            >
              <FaTrash />
            </IconButton>
          )}
        </Flex>
      </Flex>
    </Card.Root>
  );
};

export default PersonalRecordCard;
