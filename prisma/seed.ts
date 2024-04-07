import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN',
    },
  });

  const customerRole = await prisma.role.create({
    data: { name: 'CUSTOMER' },
  });

  console.log({ adminRole, customerRole });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
