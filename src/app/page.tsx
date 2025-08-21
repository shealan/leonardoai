"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Button,
  Container,
  Input,
  VStack,
  Heading,
  Field,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { api } from "@/lib/api";
import JobTitles from "@/components/ui/jobtitles";

export default function Home() {
  const [username, setUsername] = useState("");
  const [job, setJob] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.createUser({ username, job });
      toaster.create({
        title: "Access Granted",
        description: "Welcome to the character directory",
        type: "success",
      });
      router.push("/characters");
    } catch (error) {
      toaster.create({
        title: "Whoops",
        description: "An unexpected error occurred",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Image
        src="/bg-abstract.jpg"
        alt="Rick & Morty characters looking into space from a deserted planet"
        width={1024}
        height={1024}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Container maxW="xs" py={10}>
        <VStack
          gap={8}
          align="stretch"
          bg={{ base: "whiteAlpha.800", _dark: "blackAlpha.800" }}
          p={8}
          rounded="lg"
        >
          <Heading as="h1" size="lg" textAlign="center">
            Character Directory
          </Heading>
          <VStack gap={6} as="form" onSubmit={handleSubmit}>
            <VStack gap={4} w="full">
              <Field.Root w="full" required>
                <Field.Label fontWeight="bold">Username</Field.Label>
                <Input
                  type="text"
                  placeholder="RickSanchez"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  w="full"
                  px={3}
                  _dark={{
                    bg: "blackAlpha.800",
                    color: "whiteAlpha.800",
                  }}
                  _light={{
                    bg: "whiteAlpha.700",
                    color: "blackAlpha.800",
                  }}
                />
              </Field.Root>
              <Field.Root w="full" required>
                <JobTitles onChange={setJob} />
              </Field.Root>
            </VStack>
            <Button type="submit" size="sm" w="full" loading={loading}>
              Proceed
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
