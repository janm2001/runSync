// StatsCard.tsx
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { iconMap, type IconKey, type IStatCard } from "./types";
import { palette, statsCardAccents } from "@/theme/colors";

const StatsCard = ({
  title,
  icon,
  statNumber,
  info,
}: IStatCard & { icon: IconKey }) => {
  const SelectedIcon = iconMap[icon];
  const accent = statsCardAccents[icon] ?? statsCardAccents["users"];

  return (
    <Box
      position="relative"
      bg={palette.cardBgLight}
      borderRadius="2xl"
      overflow="hidden"
      border="1px solid"
      borderColor="whiteAlpha.100"
      p={5}
      transition="transform 0.2s ease, box-shadow 0.2s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: `0 16px 40px ${accent.glow}`,
        borderColor: "whiteAlpha.200",
      }}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
      }}
    >
      {/* Subtle background glow blob */}
      <Box
        position="absolute"
        top="-20px"
        right="-20px"
        w="100px"
        h="100px"
        borderRadius="full"
        background={`radial-gradient(circle, ${accent.glow} 0%, transparent 70%)`}
        pointerEvents="none"
      />

      <Flex direction="column" gap={4} position="relative">
        {/* Header row */}
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color={palette.textMuted}
            textTransform="uppercase"
            letterSpacing="0.08em"
          >
            {title}
          </Text>

          {/* Icon badge */}
          <Flex
            alignItems="center"
            justifyContent="center"
            w={10}
            h={10}
            borderRadius="xl"
            background={`linear-gradient(135deg, ${accent.from}, ${accent.to})`}
            boxShadow={`0 4px 14px ${accent.glow}`}
            flexShrink={0}
          >
            <Icon size="sm" color="white">
              {SelectedIcon ? <SelectedIcon /> : null}
            </Icon>
          </Flex>
        </Flex>

        {/* Stat number */}
        <Text
          fontWeight="bold"
          fontSize="4xl"
          lineHeight={1}
          color={palette.textPrimary}
          letterSpacing="-0.02em"
        >
          {statNumber}
        </Text>

        {/* Footer info */}
        <Text fontSize="xs" color={palette.textSubtle} fontWeight="medium">
          {info}
        </Text>
      </Flex>
    </Box>
  );
};

export default StatsCard;
