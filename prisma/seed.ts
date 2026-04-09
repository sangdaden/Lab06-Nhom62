import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import departments from "../lib/data/departments.json";
import doctors from "../lib/data/doctors.json";
import branches from "../lib/data/branches.json";
import faqs from "../lib/data/faq.json";
import guides from "../lib/data/preparation-guides.json";
import users from "../lib/data/users.json";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Departments
  for (const dept of departments) {
    await prisma.department.upsert({
      where: { id: dept.id },
      update: dept,
      create: dept,
    });
  }
  console.log(`✅ Seeded: ${departments.length} departments`);

  // 2. Doctors
  for (const doc of doctors) {
    await prisma.doctor.upsert({
      where: { id: doc.id },
      update: doc,
      create: doc,
    });
  }
  console.log(`✅ Seeded: ${doctors.length} doctors`);

  // 3. Users
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
  }
  console.log(`✅ Seeded: ${users.length} users`);

  // 4. Branches
  for (const branch of branches) {
    await prisma.branch.upsert({
      where: { id: branch.id },
      update: branch,
      create: branch,
    });
  }
  console.log(`✅ Seeded: ${branches.length} branches`);

  // 5. FAQs (no natural id — use question as unique key via deleteMany + createMany for idempotency)
  await prisma.faq.deleteMany();
  await prisma.faq.createMany({ data: faqs });
  console.log(`✅ Seeded: ${faqs.length} faqs`);

  // 6. Preparation Guides
  for (const guide of guides) {
    await prisma.preparationGuide.upsert({
      where: { id: guide.id },
      update: guide,
      create: guide,
    });
  }
  console.log(`✅ Seeded: ${guides.length} guides`);

  console.log(
    `\n🎉 Seed complete: ${departments.length} departments, ${doctors.length} doctors, ${users.length} users, ${branches.length} branches, ${faqs.length} faqs, ${guides.length} guides`
  );
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
