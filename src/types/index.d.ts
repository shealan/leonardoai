import { NextResponse } from "next/server";

export type User = {
  username: string;
  job: string;
};

export type UserCreateResponse = NextResponse & {
  user?: User;
};

export type Character = {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
};

export type CharacterResponse = {
  info: {
    count: number;
    pages: number;
    next: number;
    prev: number;
  };
  results: Character[];
};
