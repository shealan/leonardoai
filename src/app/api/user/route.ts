import { NextRequest, NextResponse } from "next/server";
import { setSession, getSession, clearSession } from "@/lib/session";
import { jobTitles } from "@/lib/constants";

/**
 * Get the current user session
 *
 * @returns {Promise<NextResponse>} - User data or null if no session exists
 */
export async function GET(): Promise<NextResponse> {
  const session = await getSession();
  return session
    ? NextResponse.json({ user: session }, { status: 200 })
    : NextResponse.json({ user: null }, { status: 200 });
}

/**
 * Create a new user session
 *
 * @param {NextRequest} request - User data
 * @returns {Promise<NextResponse>} - User data or an error if the request is invalid
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    // Trim start/endwhitespace from inputs
    body.username = body.username.trim();
    body.job = body.job.trim();

    // I would normally use Zod to validate inputs, but
    // instruction was to not lean on external libraries
    if (!body.username || !body.job || !jobTitles.includes(body.job))
      return NextResponse.json(
        { error: "Invalid username or job title" },
        { status: 400 }
      );

    const userData = {
      username: body.username,
      job: body.job,
    };

    // Save session cookie
    await setSession(userData);

    return NextResponse.json(
      { message: "User session created", user: userData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user session" },
      { status: 500 }
    );
  }
}

/**
 * Clear the current user session
 *
 * @returns {Promise<NextResponse>} - Session cleared message
 */
export async function DELETE(): Promise<NextResponse> {
  await clearSession();
  return NextResponse.json({ message: "Session cleared" }, { status: 200 });
}
