import { useUser } from "@/context/UserContext";
import {
  Box,
  Heading,
  Input,
  Field,
  Button,
  Stack,
  Card,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim() === "admin" && password.trim() === "admin") {
      setUser("coach");
      //navigate to the main page with the router dom
      navigate("/");
    } else {
      setIsInvalid(true);
      alert("Invalid username or password");
    }
  };

  return (
    <Container
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card.Root p={6} maxW="sm" width="100%">
        <Stack gap="4" maxW="sm">
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <Field.Root>
                <Field.Label>Username</Field.Label>
                <Input
                  onChange={handleUsernameChange}
                  type="text"
                  placeholder="Enter your username"
                />
                {isInvalid && (
                  <Field.ErrorText>Username is required</Field.ErrorText>
                )}
              </Field.Root>
              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Enter your password"
                />
                {isInvalid && (
                  <Field.ErrorText>Password is required</Field.ErrorText>
                )}
              </Field.Root>

              <Button mt={2} variant="outline" type="submit">
                Submit
              </Button>
            </form>
          </Box>
        </Stack>
      </Card.Root>
    </Container>
  );
};

export default Login;
