import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@cupffee.me" },
    update: {},
    create: {
      email: "admin@cupffee.me",
      password: hashedPassword,
      name: "Cupffee Admin",
    },
  });
  console.log("✅ Admin created:", admin.email);

  const smallCups = await prisma.category.upsert({
    where: { slug: "small-cups" },
    update: {},
    create: {
      name: "Small Cups",
      slug: "small-cups",
      description: "110ml edible cups",
    },
  });

  const largeCups = await prisma.category.upsert({
    where: { slug: "large-cups" },
    update: {},
    create: {
      name: "Large Cups",
      slug: "large-cups",
      description: "220ml edible cups",
    },
  });

  const samplePacks = await prisma.category.upsert({
    where: { slug: "sample-packs" },
    update: {},
    create: {
      name: "Sample Packs",
      slug: "sample-packs",
      description: "Try Cupffee before you order in bulk",
    },
  });

  console.log("✅ Categories created");

  const products = [
    {
      name: "Cupffee Edible Cup 110ml — Box of 10",
      slug: "cupffee-110ml-box-10",
      description:
        "The world's first edible cup in the classic 110ml espresso size. Perfect for espresso, cortado, and short drinks. Tasty as a cookie, thermo-resistant up to 85°C, and completely leak-proof.",
      price: 13.29,
      volume: 110,
      unit: "ml",
      features: [
        "Thermo resistant up to 85°C",
        "Leak-proof for hours",
        "No taste change to your drink",
        "100% Vegan & GMO Free",
        "Made from 7 natural ingredients",
        "Completely edible — zero waste",
      ],
      inStock: true,
      featured: true,
      categoryId: smallCups.id,
    },
    {
      name: "Cupffee Edible Cup 220ml — Box of 12",
      slug: "cupffee-220ml-box-12",
      description:
        "The perfect full-size edible cup for your regular coffee or tea. At 220ml, it holds your favorite latte or cappuccino beautifully — and then you eat the cup!",
      price: 15.99,
      volume: 220,
      unit: "ml",
      features: [
        "Thermo resistant up to 85°C",
        "Leak-proof for hours",
        "Crunchy from first sip to last bite",
        "100% Vegan & GMO Free",
        "No artificial colorants or preservatives",
        "Biodegradable & zero waste",
      ],
      inStock: true,
      featured: true,
      categoryId: largeCups.id,
    },
    {
      name: "Cupffee Sample Pack — Mixed",
      slug: "cupffee-sample-pack-mixed",
      description:
        "Try Cupffee before you commit to a full order! This sample pack includes 10 small cups (110ml) and 12 large cups (220ml), plus exquisite cup holders for each cup.",
      price: 13.29,
      volume: 110,
      unit: "ml",
      features: [
        "10 small Cupffee cups (110ml)",
        "12 large Cupffee cups (220ml)",
        "Exquisite cup holders included",
        "Perfect for tasting events",
        "Free shipping on orders over €50",
      ],
      inStock: true,
      featured: false,
      categoryId: samplePacks.id,
    },
    {
      name: "Cupffee Carton 110ml — 200 Cups",
      slug: "cupffee-110ml-carton-200",
      description:
        "Bulk order carton of 200 small Cupffee cups (110ml). Perfect for cafes, restaurants, and events. Unlock significant savings with this bulk purchase.",
      price: 89.99,
      volume: 110,
      unit: "ml",
      features: [
        "200 cups per carton",
        "12 kg CO₂ saved vs plastic cups",
        "Best value for regular coffee shops",
        "Thermo resistant up to 85°C",
        "Bulk pricing available",
      ],
      inStock: true,
      featured: false,
      categoryId: smallCups.id,
    },
    {
      name: "Cupffee Carton 220ml — 240 Cups",
      slug: "cupffee-220ml-carton-240",
      description:
        "Bulk order carton of 240 large Cupffee cups (220ml). The perfect solution for high-volume coffee shops, catering companies, and corporate events.",
      price: 109.99,
      volume: 220,
      unit: "ml",
      features: [
        "240 cups per carton",
        "18 kg CO₂ saved vs plastic cups",
        "Ideal for high-volume operations",
        "Consistent quality guaranteed",
        "Bulk pricing available",
      ],
      inStock: true,
      featured: false,
      categoryId: largeCups.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log("✅ Products seeded");

  const reviews = [
    {
      name: "Miguel Vallejo",
      company: "ZEMIYA, Mexico",
      role: "CEO",
      content:
        "I'm thrilled with your innovative Cupffee edible cup. Its uniqueness and positive environmental impact impressed me from the first taste. Not only is it a great alternative to single-use cups, but it also provides a one-of-a-kind experience. Enjoying my drink or dessert and then savoring the cup itself is a true pleasure.",
      rating: 5,
      approved: true,
      featured: true,
    },
    {
      name: "David Morales",
      company: "Cupcoffe Peru",
      role: "CEO",
      content:
        "Since we started our collaboration with you, the quality of the vegan edible cookie cups has exceeded our expectations and has been a key factor in the success of our company. The acceptance of these products has been exceptional, and we have gained an excellent reputation in the national market.",
      rating: 5,
      approved: true,
      featured: true,
    },
    {
      name: "Maxim Gelmann",
      company: "Stroodles, UK",
      role: "CEO",
      content:
        "I love the edible Cupffee cups and my customers love stroodling with them also! They are so versatile in being used for hot and cold drinks and offer such a memorable, unique and above all fun experience. This enables me to realise my mission of inspiring the world on how easy and fun sustainability can be.",
      rating: 5,
      approved: true,
      featured: true,
    },
  ];

  for (const review of reviews) {
    const existing = await prisma.review.findFirst({
      where: { name: review.name },
    });
    if (!existing) {
      await prisma.review.create({ data: review });
    }
  }

  console.log("✅ Reviews seeded");
  console.log("🎉 Database seeding complete!");
  console.log("   Admin login: admin@cupffee.me / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
