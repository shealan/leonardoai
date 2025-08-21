import Image from "next/image";
import {
  Box,
  Container,
  VStack,
  GridItem,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { getSession } from "@/lib/session";
import Header from "@/components/header";
import User from "@/components/user";
import type { Metadata } from "next";
import Character from "@/components/character";
import { getCharactersQuery } from "@/lib/graphql";
import Pagination from "@/components/pagination";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata: Metadata = {
  title: "Information Page • Leonardo AI Code Challenge",
  description: "Explore characters from the Rick & Morty universe",
};

const CharactersPage = async ({ searchParams }: PageProps) => {
  const session = await getSession();
  const { page } = await searchParams;
  const characters = await getCharactersQuery({ page });

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="start"
      justifyContent="start"
    >
      <Image
        src="/bg-abstract-strip.jpg"
        alt="Rick & Morty characters looking into space from a deserted planet"
        width={1024}
        height={228}
        style={{
          flexShrink: 0,
          height: "auto",
          top: 0,
          left: 0,
          width: "100%",
          objectFit: "cover",
        }}
      />
      <Container maxW="4xl" p={{ base: 6, lg: 12 }} mx="auto">
        <VStack gap={8} align="stretch">
          <Stack
            justifyContent="space-between"
            alignItems="start"
            direction={{ base: "column", md: "row" }}
          >
            <Header
              title="Rick & Morty Characters"
              description="Explore characters from the Rick & Morty universe"
            />
            <User username={session.username} job={session.job} />
          </Stack>
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
            {characters.results.map((character) => (
              <GridItem key={character.id}>
                <Character character={character} />
              </GridItem>
            ))}
          </SimpleGrid>
          <Pagination count={characters.info.count} pageSize={20} page={page} />
        </VStack>
      </Container>
    </Box>
  );
};

export default CharactersPage;
