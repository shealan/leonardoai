import { User } from "@/types";
import { cookies } from "next/headers";

/**
 * Get the current user session
 *
 * @returns {Promise<User>} - User data
 */
export const getSession = async (): Promise<User> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("user");

  if (!sessionCookie) throw new Error("User session not found");

  return JSON.parse(sessionCookie.value);
};

/**
 * Set the current user session
 *
 * @param {User} data - User data to set in session
 */
export const setSession = async (data: User): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set("user", JSON.stringify(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
};

/**
 * Clear the current user session
 *
 * @returns {Promise<void>} - Clears the session cookie
 */
export const clearSession = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("user");
};
