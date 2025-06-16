import { Stack } from "@chakra-ui/react";
import type { IHeader } from "./types";

const Header = ({ headerTitle, headerText }: IHeader) => {
  return (
    <Stack
      as="header"
      textAlign={"center"}
      width="100%"
      padding={4}
      color="white"
      mt={2}
    >
      <h1 style={{ fontSize: "2xl", fontWeight: "bold" }}>{headerTitle}</h1>
      <p style={{ fontSize: "md" }}>{headerText}</p>
    </Stack>
  );
};

export default Header;
