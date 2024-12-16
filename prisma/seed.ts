import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create mock users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
    },
  });

  // Create mock products
  const product1 = await prisma.product.create({
    data: {
      name: 'Concert Ticket - Artist A',
      priceInCents: 2500,
      filePath: '/path/to/ticket-a.pdf',
      imagePath: '/path/to/ticket-a-image.jpg',
      description: "A VIP ticket to Artist A's concert.",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'VIP Experience - Artist A',
      priceInCents: 10000,
      filePath: '/path/to/vip-experience.pdf',
      imagePath: '/path/to/vip-image.jpg',
      description: 'Get the ultimate experience with Artist A.',
    },
  });

  // Create mock orders
  await prisma.order.create({
    data: {
      pricePaidInCents: 2500,
      userId: user1.id,
      productId: product1.id,
    },
  });

  await prisma.order.create({
    data: {
      pricePaidInCents: 10000,
      userId: user2.id,
      productId: product2.id,
    },
  });

  // Optionally create download verifications
  await prisma.downloadVerification.create({
    data: {
      expiresAt: new Date(Date.now() + 86400000), // 24 hours from now
      productId: product1.id,
    },
  });

  console.log('Mock data seeded!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
