const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create mock products (events/tickets)
  const product1 = await prisma.product.create({
    data: {
      name: 'Concert A Ticket',
      priceInCents: 5000, // $50
      filePath: '/products/concert_a_ticket.pdf',
      imagePath: '/images/concert_a.jpg',
      description: 'A ticket for Concert A, a live concert event.',
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Concert B Ticket',
      priceInCents: 5500, // $55
      filePath: '/products/concert_b_ticket.pdf',
      imagePath: '/images/concert_b.jpg',
      description:
        'A ticket for Concert B, another exciting live concert event.',
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Concert B VIP Meet and Greet',
      priceInCents: 12000, // $120
      filePath: '/products/concert_b_vip_meet_and_greet.pdf',
      imagePath: '/images/concert_b_vip.jpg',
      description: 'VIP ticket for Concert B with a meet and greet experience.',
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: 'Sports Event Ticket',
      priceInCents: 3000, // $30
      filePath: '/products/sports_event_ticket.pdf',
      imagePath: '/images/sports_event.jpg',
      description: 'A ticket for an exciting sports event.',
    },
  });

  const product5 = await prisma.product.create({
    data: {
      name: 'Theatre Event Ticket',
      priceInCents: 7000, // $70
      filePath: '/products/theatre_event_ticket.pdf',
      imagePath: '/images/theatre_event.jpg',
      description: 'A ticket for a fantastic theatre play.',
    },
  });

  // Create mock users
  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.smith@example.com',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'mike.johnson@example.com',
    },
  });

  const user4 = await prisma.user.create({
    data: {
      email: 'alice.williams@example.com',
    },
  });

  const user5 = await prisma.user.create({
    data: {
      email: 'bob.brown@example.com',
    },
  });

  // Create orders for users (each user buys different tickets)
  await prisma.order.create({
    data: {
      pricePaidInCents: 5000, // $50
      userId: user1.id,
      productId: product1.id, // Concert A Ticket
    },
  });

  await prisma.order.create({
    data: {
      pricePaidInCents: 5500, // $55
      userId: user2.id,
      productId: product2.id, // Concert B Ticket
    },
  });

  await prisma.order.create({
    data: {
      pricePaidInCents: 12000, // $120
      userId: user3.id,
      productId: product3.id, // Concert B VIP Meet and Greet
    },
  });

  await prisma.order.create({
    data: {
      pricePaidInCents: 3000, // $30
      userId: user4.id,
      productId: product4.id, // Sports Event Ticket
    },
  });

  await prisma.order.create({
    data: {
      pricePaidInCents: 7000, // $70
      userId: user5.id,
      productId: product5.id, // Theatre Event Ticket
    },
  });

  // Create more orders
  await prisma.order.create({
    data: {
      pricePaidInCents: 7000, // $70
      userId: user1.id,
      productId: product5.id, // Theatre Event Ticket
    },
  });

  await prisma.order.create({
    data: {
      pricePaidInCents: 3000, // $30
      userId: user2.id,
      productId: product4.id, // Sports Event Ticket
    },
  });

  await prisma.order.create({
    data: {
      pricePaidInCents: 12000, // $120
      userId: user3.id,
      productId: product3.id, // Concert B VIP Meet and Greet
    },
  });

  await prisma.order.create({
    data: {
      pricePaidInCents: 5000, // $50
      userId: user4.id,
      productId: product1.id, // Concert A Ticket
    },
  });

  await prisma.order.create({
    data: {
      pricePaidInCents: 5500, // $55
      userId: user5.id,
      productId: product2.id, // Concert B Ticket
    },
  });

  console.log('Mock data seeded successfully!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
