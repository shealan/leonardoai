"use client";

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";
import { jobTitles } from "@/lib/constants";

interface JobTitlesProps {
  onChange: (value: string) => void;
  value?: string;
}

const JobTitles = ({ onChange, value }: JobTitlesProps) => {
  const { contains } = useFilter({ sensitivity: "base" });

  const { collection, filter } = useListCollection({
    initialItems: jobTitles,
    filter: contains,
  });

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      onValueChange={(e) => onChange(e.value[0] || "")}
      width="full"
      value={value ? [value] : []}
      defaultInputValue={value}
    >
      <Combobox.Label fontWeight="bold">Job Title</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input
          placeholder="Type to search"
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
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger mr={2} />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No items found</Combobox.Empty>
          {collection.items.map((item) => (
            <Combobox.Item item={item} key={item} px={3} py={1}>
              {item}
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
};

export default JobTitles;
