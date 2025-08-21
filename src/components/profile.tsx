"use client";

import JobTitles from "@/components/ui/jobtitles";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { User } from "@/types";
import { toaster } from "./ui/toaster";
import { api } from "@/lib/api";

interface ProfileProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const Profile = ({ user, isOpen, onClose, onUpdate }: ProfileProps) => {
  const [username, setUsername] = useState(user.username);
  const [job, setJob] = useState(user.job);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.createUser({ username, job });
      toaster.create({
        title: "Profile Updated",
        description: "Your profile has been updated",
        type: "success",
      });
      onUpdate();
      onClose();
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
    <Dialog.Root
      open={isOpen}
      onOpenChange={onClose}
      closeOnInteractOutside={false}
      size="xs"
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" bg="blackAlpha.700" />
        <Dialog.Positioner>
          <Dialog.Content
            bg="bg.canvas"
            rounded="md"
            px={4}
            py={3}
            m={4}
            as="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={4}
          >
            <Dialog.Header>
              <Dialog.Title fontSize="sm" color="fg.muted">
                Edit Profile
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack gap={6}>
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
                    />
                  </Field.Root>
                  <Field.Root w="full" required>
                    <JobTitles onChange={setJob} value={job} />
                  </Field.Root>
                </VStack>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer py={1}>
              <Button size="xs" px={4} loading={loading} type="submit">
                Update
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default Profile;
