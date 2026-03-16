// AppCard.tsx — shared styled card surface for the app.
// Subtler than StatsCard: no gradient bar, no glow — just a clean, modern container.
import { Card } from "@chakra-ui/react";
import type { ComponentProps } from "react";
import { palette } from "@/theme/colors";

type AppCardProps = ComponentProps<typeof Card.Root>;

const AppCard = ({ children, ...props }: AppCardProps) => {
  return (
    <Card.Root
      bg={palette.cardBgLight}
      borderRadius="xl"
      border="1px solid"
      borderColor="whiteAlpha.100"
      boxShadow="0 2px 12px rgba(0,0,0,0.25)"
      transition="border-color 0.2s ease, box-shadow 0.2s ease"
      _hover={{
        borderColor: "whiteAlpha.200",
        boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
      }}
      {...props}
    >
      {children}
    </Card.Root>
  );
};

export default AppCard;
