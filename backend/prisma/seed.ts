import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const adminUser = await prisma.user.upsert({
    where: { id: "seed_admin_001" },
    update: {},
    create: {
      id: "seed_admin_001",
      email: "admin@example.com",
      username: "admin",
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
    },
  });

  const regularUser = await prisma.user.upsert({
    where: { id: "seed_user_001" },
    update: {},
    create: {
      id: "seed_user_001",
      email: "user@example.com",
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      role: "USER",
    },
  });

  await prisma.post.upsert({
    where: { id: "seed_post_001" },
    update: {},
    create: {
      id: "seed_post_001",
      title: "Welcome Post",
      content: "This is a seed post for development.",
      published: true,
      authorId: adminUser.id,
    },
  });

  console.log("Seeded:", {
    adminUser: adminUser.id,
    regularUser: regularUser.id,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
