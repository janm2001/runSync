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
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    axios
      .post(`${apiUrl}/auth/login`, { email, password })
      .then((response) => {
        const { user } = response.data;
        setUser(user);
        navigate("/");
      })
      .catch(() => {
        setIsInvalid(true);
        alert("Invalid username or password");
      });
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
                <Field.Label>Email</Field.Label>
                <Input
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="Enter your email"
                />
                {isInvalid && (
                  <Field.ErrorText>Email is required</Field.ErrorText>
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
