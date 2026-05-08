import { Prisma } from "@prisma/client";

export interface UserSyncData {
  id: string;
  email: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  externalAccounts: Prisma.InputJsonValue[];
}
