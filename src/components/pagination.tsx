"use client";

import {
  Pagination,
  ButtonGroup,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface PaginationProps {
  count: number;
  pageSize: number;
  page?: string;
}

const PaginationNavigation = ({ count, pageSize, page }: PaginationProps) => {
  const router = useRouter();
  // Invalid page numbers treated as 1 on server and client for simplicity
  // Would normally use a library like Nuqs to handle query strings safely
  const pageNumber = page && !isNaN(parseInt(page)) ? parseInt(page) : 1;
  const startRange = (pageNumber - 1) * pageSize;
  const endRange = startRange + pageSize;

  const handlePageChange = (page: number) => {
    router.push(`/characters?page=${page}`);
  };

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      gap="4"
      align="center"
      mb="24"
    >
      <Text fontSize="sm" textAlign="center">
        Showing: {startRange} - {endRange} of {count}
      </Text>
      <Pagination.Root
        count={count}
        pageSize={pageSize}
        page={pageNumber}
        onPageChange={(e) => handlePageChange(e.page)}
        ml="auto"
      >
        <ButtonGroup variant="ghost" size="xs">
          <Pagination.PrevTrigger asChild>
            <IconButton>&#8249;</IconButton>
          </Pagination.PrevTrigger>
          <Pagination.Items
            render={(page) => (
              <IconButton
                variant={{ base: "ghost", _selected: "outline" }}
                size="xs"
              >
                {page.value}
              </IconButton>
            )}
          />
          <Pagination.NextTrigger asChild>
            <IconButton>&#8250;</IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Stack>
  );
};

export default PaginationNavigation;
