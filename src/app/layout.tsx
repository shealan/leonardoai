import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Geist } from "next/font/google";
import ChakraProvider from "@/components/ui/provider";
import "@/app/styles/global.css";
import { Box, Text } from "@chakra-ui/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leonardo AI Code Challenge",
  description:
    "Leonardo AI Code Challenge using Next.js, Chakra UI and GraphQL",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistSans.variable}>
        <ChakraProvider>
          {children}
          <Box
            position="absolute"
            bottom={2}
            right={2}
            bg="blackAlpha.700"
            zIndex={1}
            py={1}
            px={2.5}
            rounded="md"
          >
            <Text color="white" fontSize="xs" textAlign="center">
              Leonardo.ai Challenge Brief &#8226; v3.5
            </Text>
          </Box>
          <Toaster />
        </ChakraProvider>
      </body>
    </html>
  );
}
