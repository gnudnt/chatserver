import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function clearData() {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations'); // Không xóa bảng migrations của Prisma

  try {
    // Vô hiệu hóa trigger (tùy chọn nhưng giúp tăng tốc)
    // await prisma.$executeRawUnsafe(`ALTER TABLE ${tables.map(t => `"${t}"`).join(', ')} DISABLE TRIGGER ALL;`);

    // Chạy lệnh TRUNCATE để xóa dữ liệu
    // RESTART IDENTITY: Reset lại cột ID tự tăng
    // CASCADE: Tự động xóa dữ liệu ở các bảng có khóa ngoại liên quan
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE ${tables.map(t => `"${t}"`).join(', ')} RESTART IDENTITY CASCADE;`
    );

    // Bật lại trigger
    // await prisma.$executeRawUnsafe(`ALTER TABLE ${tables.map(t => `"${t}"`).join(', ')} ENABLE TRIGGER ALL;`);

    console.log('Xóa hết dữ liệu ở tất cả các bảng thành công!');
  } catch (error) {
    console.error('Có lỗi xảy ra khi xóa dữ liệu:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function initSeeds() {

  await clearData();

  // await prisma.user.createMany({
  //   data: [{
  //     userId: 'root',
  //     name: 'root',
  //     status: 'ACTIVE',
  //     phone: '0964990458',
  //     password: "root123@@",
  //     role: "OWNER"
  //   }]
  // })
  // await prisma.categories.createMany({
  //   data: [
  //     {
  //       name: 'Danh mục Random acc',
  //       notes: ''
  //     },
  //     {
  //       name: 'Danh mục mở thẻ tuỳ chọn',
  //       notes: ''
  //     },
  //     {
  //       name: 'Danh mục acc Bp trắng',
  //       notes: ''
  //     },
  //     {
  //       name: 'Danh mục Acc chứa FC',
  //       notes: ''
  //     },
  //     {
  //       name: 'Danh mục Acc Đội Hình',
  //       notes: ''
  //     }
  //   ]
  // })
}

initSeeds()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
