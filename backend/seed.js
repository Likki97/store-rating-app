const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const userPassword = await bcrypt.hash('User@123', 10);
  const ownerPassword = await bcrypt.hash('Owner@123', 10);

  // Create Admin
  await prisma.user.create({
    data: {
      name: 'System Admin',
      email: 'admin@example.com',
      password: adminPassword,
      address: 'Admin Address',
      role: 'ADMIN',
    },
  });

  // Create Store Owners and Stores
  const owner1 = await prisma.user.create({
    data: {
      name: 'Owner One',
      email: 'owner1@example.com',
      password: ownerPassword,
      address: 'Owner One Address',
      role: 'STORE_OWNER',
    },
  });

  const owner2 = await prisma.user.create({
    data: {
      name: 'Owner Two',
      email: 'owner2@example.com',
      password: ownerPassword,
      address: 'Owner Two Address',
      role: 'STORE_OWNER',
    },
  });

  await prisma.store.createMany({
    data: [
      {
        name: 'Store One',
        email: 'store1@example.com',
        address: '123 Main Street',
        ownerId: owner1.id,
      },
      {
        name: 'Store Two',
        email: 'store2@example.com',
        address: '456 Elm Street',
        ownerId: owner2.id,
      },
    ],
  });

  // Create Normal Users
  await prisma.user.createMany({
    data: [
      {
        name: 'User One',
        email: 'user1@example.com',
        password: userPassword,
        address: 'User One Address',
        role: 'USER',
      },
      {
        name: 'User Two',
        email: 'user2@example.com',
        password: userPassword,
        address: 'User Two Address',
        role: 'USER',
      },
    ],
  });
}

main()
  .then(() => {
    console.log('🌱 Database seeded successfully!');
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
