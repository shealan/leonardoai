import { User, UserCreateResponse } from "@/types";

const createUser = async ({
  username,
  job,
}: User): Promise<UserCreateResponse> => {
  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({ username, job }),
  });
  return response.json();
};

export const api = {
  createUser,
};
