const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Purging and Re-seeding database...');
  
  // 0. Purge
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create a Test Creator
  const creator = await prisma.user.create({
    data: {
      email: 'creator@vendora.io',
      password: 'hashedpassword',
      role: 'CREATOR'
    }
  });

  console.log('Creator created:', creator.id);

  // 2. Create Cyber Katana Product
  const product = await prisma.product.create({
    data: {
      name: 'Cyber Katana',
      description: 'Legendary blade forged in neon code. Grants +50 Style and 100% urgency.',
      price: 89,
      stock: 25,
      type: 'DIGITAL',
      image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81',
      creatorId: creator.id,
      dropExpires: new Date('2026-04-01T12:00:00Z')
    }
  });

  console.log('Product created:', JSON.stringify(product, null, 2));
  console.log('Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
