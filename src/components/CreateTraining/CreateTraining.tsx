import { Card } from "@chakra-ui/react";
import CreateTrainingForm from "./CreateTrainingForm";
import { useLanguage } from "@/context/LanguageContext";

const CreateTraining = () => {
  const { t } = useLanguage();
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>{t("create.training.title")}</Card.Title>
        <Card.Description>{t("create.training.description")}</Card.Description>
      </Card.Header>
      <Card.Body>
        <CreateTrainingForm />
      </Card.Body>
    </Card.Root>
  );
};

export default CreateTraining;
