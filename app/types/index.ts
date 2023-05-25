import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "upadtedAt" | "emailVerified"
> & {
  createdAt: string;
  upadtedAt: string;
  emailVerified: string | null;
};
