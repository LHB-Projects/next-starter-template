import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  await prisma.employee.create({
    data: {
      email: "employee@example.com",
      name: "John Doe",
      password: hashedPassword,
    },
  });
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
