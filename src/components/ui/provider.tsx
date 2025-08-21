"use client";

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./colourmode";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: "Geist, sans-serif" },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

export default function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
