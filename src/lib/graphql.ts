import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { gql } from "@apollo/client";
import type { CharacterResponse } from "@/types";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://rickandmortyapi.com/graphql",
      fetchOptions: {},
    }),
  });
});

const getCharacters = gql`
  query Characters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
      }
    }
  }
`;

export const getCharactersQuery = async ({
  page,
}: {
  page?: string;
}): Promise<CharacterResponse> => {
  const { data } = await query({
    query: getCharacters,
    variables: { page: page ? parseInt(page) : 1 },
  });

  if (!data.characters) {
    throw new Error("An error occurred while fetching characters");
  }

  return data.characters;
};
