"use client";

import { logoutAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import Profile from "@/components/profile";
import { Avatar, Box, Menu, Card, Stack } from "@chakra-ui/react";
import type { User } from "@/types";
import { useState } from "react";

const User = ({ username, job }: User) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  const handleProfileToggle = () => {
    setProfileOpen(!profileOpen);
  };

  const handleUpdate = () => {
    router.refresh();
  };

  return (
    <Card.Root
      py={2}
      px={2.5}
      position="relative"
      bg="bg.emphasized"
      rounded="md"
    >
      <Card.Body gap="3" display="flex" alignItems="start" flexDirection="row">
        <Avatar.Root size="lg" shape="rounded" bg="white">
          <Avatar.Fallback name={username} color="black" />
        </Avatar.Root>
        <Stack gap={0}>
          <Card.Title fontSize="sm">{username}</Card.Title>
          <Card.Description fontSize="xs" color="fg.muted">
            {job}
          </Card.Description>
        </Stack>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Box mt={0.5} as="button" aria-label="User settings menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </Box>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content bg="bg.canvas" rounded="md">
              <Menu.Item
                value="profile"
                py={2}
                fontSize="sm"
                px={3}
                onClick={handleProfileToggle}
              >
                Edit Profile
              </Menu.Item>
              <Menu.Item
                value="logout"
                py={2}
                fontSize="sm"
                px={3}
                onClick={logoutAction}
              >
                Logout
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Card.Body>
      <Profile
        isOpen={profileOpen}
        onClose={handleProfileToggle}
        onUpdate={handleUpdate}
        user={{ username, job }}
      />
    </Card.Root>
  );
};
export default User;
