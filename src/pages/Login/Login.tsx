import { useUser } from "@/context/UserContext";
import {
  Box,
  Heading,
  Input,
  Field,
  Button,
  Stack,
  Text,
  Flex,
  Icon,
  Separator,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRunning, FaBolt, FaTrophy, FaUsers } from "react-icons/fa";
import { brand, loginPanelGradient } from "@/theme/colors";

const features = [
  { icon: FaBolt, text: "Track athlete performance in real time" },
  { icon: FaTrophy, text: "Monitor personal records and milestones" },
  { icon: FaUsers, text: "Manage groups and training sessions" },
  { icon: FaRunning, text: "Analyse pace, distance & trends" },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const { setUser, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
    const storedAuth = localStorage.getItem("user_authenticated");
    const storedUser = localStorage.getItem("user_data");
    if (storedAuth === "true" && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        navigate("/");
        return;
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem("user_data");
        localStorage.removeItem("user_authenticated");
      }
    }
  }, [user, setUser, navigate]);

  useEffect(() => {
    if (shouldNavigate && user) {
      navigate("/");
      setShouldNavigate(false);
    }
  }, [user, shouldNavigate, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsInvalid(false);
    setIsLoading(true);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    axios
      .post(`${apiUrl}/auth/login`, { email, password })
      .then((response) => {
        setUser(response.data);
        setShouldNavigate(true);
      })
      .catch(() => {
        setIsInvalid(true);
        setIsLoading(false);
      });
  };

  return (
    <Flex minH="100vh" minW="100vw">
      {/* Left branding panel */}
      <Box
        display={{ base: "none", md: "flex" }}
        flex="1"
        flexDirection="column"
        justifyContent="space-between"
        p={12}
        background={loginPanelGradient}
        position="relative"
        overflow="hidden"
      >
        {/* Decorative circles */}
        <Box
          position="absolute"
          top="-80px"
          right="-80px"
          w="320px"
          h="320px"
          borderRadius="full"
          bg="whiteAlpha.50"
        />
        <Box
          position="absolute"
          bottom="-60px"
          left="-60px"
          w="240px"
          h="240px"
          borderRadius="full"
          bg="whiteAlpha.50"
        />

        {/* Logo / brand */}
        <Flex align="center" gap={3} zIndex={1}>
          <Flex
            align="center"
            justify="center"
            w="44px"
            h="44px"
            borderRadius="xl"
            bg={brand.accent}
          >
            <Icon color="white" fontSize="20px">
              <FaRunning />
            </Icon>
          </Flex>
          <Text fontWeight="700" fontSize="xl" color="white" letterSpacing="wide">
            RunSync
          </Text>
        </Flex>

        {/* Headline */}
        <Box zIndex={1}>
          <Heading
            size="3xl"
            color="white"
            lineHeight="1.15"
            mb={4}
            fontWeight="800"
          >
            Coach smarter.
            <br />
            Run faster.
          </Heading>
          <Text color="whiteAlpha.700" fontSize="lg" mb={10} maxW="360px">
            The all-in-one platform built for running coaches and athletes who
            take performance seriously.
          </Text>

          <Stack gap={4}>
            {features.map(({ icon: FeatureIcon, text }) => (
              <Flex key={text} align="center" gap={3}>
                <Flex
                  align="center"
                  justify="center"
                  w="36px"
                  h="36px"
                  borderRadius="lg"
                  bg="whiteAlpha.100"
                  flexShrink={0}
                >
                  <Icon color={brand.accentLight} fontSize="15px">
                    <FeatureIcon />
                  </Icon>
                </Flex>
                <Text color="whiteAlpha.800" fontSize="sm">
                  {text}
                </Text>
              </Flex>
            ))}
          </Stack>
        </Box>

        <Text color="whiteAlpha.400" fontSize="xs" zIndex={1}>
          © 2026 RunSync. All rights reserved.
        </Text>
      </Box>

      {/* Right form panel */}
      <Flex
        flex={{ base: 1, md: "0 0 640px" }}
        flexDirection="column"
        justifyContent="center"
        px={{ base: 6, sm: 10, md: 12 }}
        py={12}
        bg="bg"
      >
        <Box w="100%" maxW="360px" mx="auto">
          {/* Mobile logo */}
          <Flex
            align="center"
            gap={2}
            mb={10}
            display={{ base: "flex", md: "none" }}
          >
            <Flex
              align="center"
              justify="center"
              w="36px"
              h="36px"
              borderRadius="lg"
              bg={brand.accent}
            >
              <Icon color="white" fontSize="16px">
                <FaRunning />
              </Icon>
            </Flex>
            <Text fontWeight="700" fontSize="lg">
              RunSync
            </Text>
          </Flex>

          <Heading size="xl" fontWeight="700" mb={1}>
            Welcome back
          </Heading>
          <Text color="fg.muted" mb={8} fontSize="sm">
            Sign in to your account to continue
          </Text>

          <form onSubmit={handleSubmit}>
            <Stack gap={5}>
              <Field.Root invalid={isInvalid}>
                <Field.Label fontWeight="500" fontSize="sm">
                  Email address
                </Field.Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  size="lg"
                />
              </Field.Root>

              <Field.Root invalid={isInvalid}>
                <Flex justify="space-between" align="center" w="100%">
                  <Field.Label fontWeight="500" fontSize="sm">
                    Password
                  </Field.Label>
                </Flex>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  size="lg"
                />
                {isInvalid && (
                  <Field.ErrorText>Invalid email or password.</Field.ErrorText>
                )}
              </Field.Root>

              <Button
                type="submit"
                size="lg"
                colorPalette="blue"
                variant="solid"
                width="100%"
                loading={isLoading}
                loadingText="Signing in..."
              >
                Sign in
              </Button>
            </Stack>
          </form>

          <Box mt={8}>
            <Separator />
            <Text color="fg.subtle" fontSize="xs" textAlign="center" mt={4}>
              Demo: coach@demo.com or client@demo.com — password: password
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
