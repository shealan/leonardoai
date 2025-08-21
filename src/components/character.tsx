"use client";

import {
  Card,
  CloseButton,
  Drawer,
  Badge,
  VStack,
  DataList,
} from "@chakra-ui/react";
import Image from "next/image";
import { Character } from "@/types";
import { useState } from "react";

interface CharacterProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card.Root
        maxW="sm"
        overflow="hidden"
        as="button"
        h="100%"
        onClick={() => setIsOpen(true)}
        data-state="open"
        _open={{
          animation: "fade-in 300ms ease-out",
        }}
        _hover={{
          scale: 1.02,
          transition: "all 150ms ease-out",
          bgColor: "bg.emphasized",
          borderColor: "border.emphasized",
        }}
      >
        <Image
          src={character.image}
          alt={character.name}
          width={500}
          height={500}
          loading="lazy"
        />
        <Card.Body gap="1" p={4}>
          <Card.Title fontSize="lg">{character.name}</Card.Title>
          <Card.Description fontSize="xs" color="fg.muted" fontWeight="medium">
            {character.species}
          </Card.Description>
        </Card.Body>
      </Card.Root>
      <Drawer.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Drawer.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.700" />
        <Drawer.Trigger />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger asChild>
              <CloseButton
                size="xs"
                bg={{ base: "whiteAlpha.700", _dark: "blackAlpha.700" }}
              />
            </Drawer.CloseTrigger>
            <Drawer.Body>
              <Image
                src={character.image}
                alt={character.name}
                width={500}
                height={500}
                loading="lazy"
              />
              <VStack gap="6" p={6} align="start">
                <Drawer.Title fontSize="2xl">{character.name}</Drawer.Title>
                <DataList.Root textTransform="capitalize">
                  <DataList.Item>
                    <DataList.ItemLabel>Status</DataList.ItemLabel>
                    <DataList.ItemValue>
                      <Badge
                        bg={
                          character.status === "Alive"
                            ? "green.600"
                            : character.status === "Dead"
                            ? "red.600"
                            : "gray.600"
                        }
                        color="white"
                        fontSize="xs"
                        fontWeight="bold"
                        px={3}
                        py={1}
                        rounded="full"
                      >
                        {character.status}
                      </Badge>
                    </DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>Species</DataList.ItemLabel>
                    <DataList.ItemValue>{character.species}</DataList.ItemValue>
                  </DataList.Item>
                  {character.type && (
                    <DataList.Item>
                      <DataList.ItemLabel>Type</DataList.ItemLabel>
                      <DataList.ItemValue>{character.type}</DataList.ItemValue>
                    </DataList.Item>
                  )}
                  <DataList.Item>
                    <DataList.ItemLabel>Gender</DataList.ItemLabel>
                    <DataList.ItemValue>{character.gender}</DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>Origin</DataList.ItemLabel>
                    <DataList.ItemValue>
                      {character.origin.name}
                    </DataList.ItemValue>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.ItemLabel>Location</DataList.ItemLabel>
                    <DataList.ItemValue>
                      {character.location.name}
                    </DataList.ItemValue>
                  </DataList.Item>
                </DataList.Root>
              </VStack>
            </Drawer.Body>
            <Drawer.Footer />
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  );
};

export default CharacterCard;
