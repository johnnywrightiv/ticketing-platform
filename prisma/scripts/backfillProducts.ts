const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Update all existing Product rows with default values
  const result = await prisma.product.updateMany({
    data: {
      eventDate: new Date(), // Default: Current timestamp
      eventTime: '7:00 PM', // Default: Static time
      location: 'City Arena', // Default: Static location
    },
  });

  console.log(`Updated ${result.count} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
