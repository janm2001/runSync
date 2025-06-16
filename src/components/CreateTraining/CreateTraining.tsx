import { Card } from "@chakra-ui/react";
import CreateTrainingForm from "./CreateTrainingForm";

const CreateTraining = () => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Create New Training Session</Card.Title>
        <Card.Description>
          Design training sessions that will automatically sync to athletes'
          watches
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <CreateTrainingForm />
      </Card.Body>
    </Card.Root>
  );
};

export default CreateTraining;
