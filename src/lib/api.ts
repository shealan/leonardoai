import { User, UserCreateResponse } from "@/types";

/**
 * Creates a user
 *
 * @param username - The username of the user
 * @param job - The job of the user
 * @returns The user
 */
const createUser = async ({
  username,
  job,
}: User): Promise<UserCreateResponse> => {
  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({ username, job }),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

export const api = {
  createUser,
};
