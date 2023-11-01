import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  const graphic_cards = await prisma.category.upsert({
    where: { id: "seed-01" },
    update: {},
    create: {
      name: "graphics cards",
      products: {
        createMany: {
          data: [
            {
              name: "NVIDIA GeForce RTX 3090",
              description:
                "Flagship NVIDIA graphics card for extreme gaming and real-time ray tracing performance.",
              image: "https://www.example.com/image_gpu3.jpg",
              price: 999.99,
              slug: "rtx3090",
              stock: 2,
            },
            {
              name: "AMD Radeon RX 6900 XT",
              description:
                "High-end AMD gaming graphics card, built for stunning visuals and competitive gaming.",
              image: "https://www.example.com/image_gpu4.jpg",
              price: 799.99,
              slug: "rx6900xt",
              stock: 5,
            },
            {
              name: "NVIDIA GeForce GTX 1660 Super",
              description:
                "Mid-range graphics card for smooth 1080p gaming and content creation.",
              image: "https://www.example.com/image_gpu5.jpg",
              price: 249.99,
              slug: "gtx1660super",
              stock: 3,
            },
            {
              name: "AMD Radeon RX 6700 XT",
              description:
                "High-performance AMD graphics card for demanding gaming and 1440p resolutions.",
              image: "https://www.example.com/image_gpu6.jpg",
              price: 499.99,
              slug: "rx6700xt",
              stock: 7,
            },
            {
              name: "NVIDIA GeForce RTX 3080",
              description:
                "High-end NVIDIA graphics card with ray tracing capabilities for immersive gaming experiences.",
              image: "https://www.example.com/image_gpu1.jpg",
              price: 699.99,
              slug: "rtx3080",
              stock: 1,
            },
            {
              name: "AMD Radeon RX 6800 XT",
              description:
                "High-quality AMD gaming graphics card designed for competitive gaming and 1440p gaming.",
              image: "https://www.example.com/image_gpu2.jpg",
              price: 649.99,
              slug: "rx6800xt",
              stock: 4,
            },
            {
              name: "NVIDIA GeForce GTX 1650",
              description:
                "Entry-level NVIDIA graphics card for budget gaming and multimedia tasks.",
              image: "https://www.example.com/image_gpu7.jpg",
              price: 169.99,
              slug: "gtx1650",
              stock: 6,
            },
            {
              name: "AMD Radeon RX 5700 XT",
              description:
                "High-performance AMD gaming graphics card for smooth 1440p gaming experiences.",
              image: "https://www.example.com/image_gpu8.jpg",
              price: 399.99,
              slug: "rx5700xt",
              stock: 2,
            },
            {
              name: "NVIDIA GeForce GTX 1660 Ti",
              description:
                "Mid-range NVIDIA graphics card for 1080p gaming and content creation.",
              image: "https://www.example.com/image_gpu9.jpg",
              price: 279.99,
              slug: "gtx1660ti",
              stock: 3,
            },
            {
              name: "AMD Radeon RX 5600 XT",
              description:
                "Value-oriented AMD gaming graphics card for 1080p gaming and multitasking.",
              image: "https://www.example.com/image_gpu10.jpg",
              price: 249.99,
              slug: "rx5600xt",
              stock: 5,
            },
            {
              name: "NVIDIA GeForce RTX 3070",
              description:
                "High-performance NVIDIA graphics card with ray tracing support for exceptional gaming visuals.",
              image: "https://www.example.com/image_gpu11.jpg",
              price: 499.99,
              slug: "rtx3070",
              stock: 4,
            },
            {
              name: "AMD Radeon RX 6600 XT",
              description:
                "Mid-range AMD gaming graphics card for 1080p gaming and eSports performance.",
              image: "https://www.example.com/image_gpu12.jpg",
              price: 299.99,
              slug: "rx6600xt",
              stock: 6,
            },
            {
              name: "NVIDIA GeForce GTX 1050 Ti",
              description:
                "Entry-level NVIDIA graphics card for budget gaming and multimedia tasks.",
              image: "https://www.example.com/image_gpu13.jpg",
              price: 149.99,
              slug: "gtx1050ti",
              stock: 2,
            },
            {
              name: "AMD Radeon RX 5500 XT",
              description:
                "Value-oriented AMD gaming graphics card for 1080p gaming and casual use.",
              image: "https://www.example.com/image_gpu14.jpg",
              price: 199.99,
              slug: "rx5500xt",
              stock: 8,
            },
            {
              name: "NVIDIA GeForce GTX 1660",
              description:
                "NVIDIA graphics card for budget-conscious gamers seeking 1080p gaming performance.",
              image: "https://www.example.com/image_gpu15.jpg",
              price: 219.99,
              slug: "gtx1660",
              stock: 5,
            },
            {
              name: "AMD Radeon RX 560",
              description:
                "AMD graphics card for basic gaming and multimedia tasks at an affordable price.",
              image: "https://www.example.com/image_gpu16.jpg",
              price: 99.99,
              slug: "rx560",
              stock: 10,
            },
            {
              name: "NVIDIA GeForce GT 1030",
              description:
                "Entry-level NVIDIA graphics card for HTPC and low-power gaming applications.",
              image: "https://www.example.com/image_gpu17.jpg",
              price: 89.99,
              slug: "gt1030",
              stock: 3,
            },
            {
              name: "AMD Radeon RX 550",
              description:
                "Basic AMD graphics card for display and multimedia purposes with low power consumption.",
              image: "https://www.example.com/image_gpu18.jpg",
              price: 69.99,
              slug: "rx550",
              stock: 5,
            },
            {
              name: "NVIDIA GeForce RTX 3050",
              description:
                "Budget-friendly NVIDIA graphics card for 1080p gaming and eSports performance.",
              image: "https://www.example.com/image_gpu19.jpg",
              price: 249.99,
              slug: "rtx3050",
              stock: 7,
            },
            {
              name: "AMD Radeon RX 6400",
              description:
                "Entry-level AMD graphics card for casual gaming and multimedia entertainment.",
              image: "https://www.example.com/image_gpu20.jpg",
              price: 129.99,
              slug: "rx6400",
              stock: 4,
            },
          ],
        },
      },
    },
  });
  const processors = await prisma.category.upsert({
    where: { id: "seed-02" },
    update: {},
    create: {
      name: "processors",
      products: {
        createMany: {
          data: [
            {
              name: "Intel Core i9-10900K 10-Core Processor",
              description:
                "High-performance 10-core, 20-thread processor from Intel, designed for gamers and content creators.",
              image: "https://www.example.com/image_processor3.jpg",
              price: 499.99,
              slug: "i910900k",
              stock: 5,
            },
            {
              name: "AMD Ryzen 9 5900X 12-Core Processor",
              description:
                "Top-tier 12-core, 24-thread processor by AMD, optimized for gaming and productivity tasks.",
              image: "https://www.example.com/image_processor4.jpg",
              price: 549.99,
              slug: "ryzen5900x",
              stock: 3,
            },
            {
              name: "Intel Core i7-10700K 8-Core Processor",
              description:
                "8-core, 16-thread processor for high-performance computing and gaming.",
              image: "https://www.example.com/image_processor6.jpg",
              price: 369.99,
              slug: "i710700k",
              stock: 6,
            },
            {
              name: "AMD Ryzen 7 5800X 8-Core Processor",
              description:
                "High-performance 8-core, 16-thread processor by AMD, ideal for gaming and content creation.",
              image: "https://www.example.com/image_processor2.jpg",
              price: 449.99,
              slug: "ryzen5800x",
              stock: 4,
            },
            {
              name: "Intel Core i5-10600K 6-Core Processor",
              description:
                "6-core, 12-thread processor for smooth gaming and multitasking performance.",
              image: "https://www.example.com/image_processor7.jpg",
              price: 259.99,
              slug: "i510600k",
              stock: 8,
            },
            {
              name: "AMD Ryzen 5 5600X 6-Core Processor",
              description:
                "6-core, 12-thread processor for excellent gaming and multitasking performance.",
              image: "https://www.example.com/image_processor5.jpg",
              price: 299.99,
              slug: "ryzen5600x",
              stock: 10,
            },
            {
              name: "Intel Core i3-10100 4-Core Processor",
              description:
                "Budget-friendly 4-core, 8-thread processor for everyday computing and light gaming.",
              image: "https://www.example.com/image_processor8.jpg",
              price: 129.99,
              slug: "i310100",
              stock: 6,
            },
            {
              name: "AMD Ryzen 3 3300X 4-Core Processor",
              description:
                "Value-oriented 4-core, 8-thread processor for budget gaming and home office tasks.",
              image: "https://www.example.com/image_processor9.jpg",
              price: 109.99,
              slug: "ryzen3300x",
              stock: 7,
            },
            {
              name: "Intel Core i9-11900K 8-Core Processor",
              description:
                "High-end 8-core, 16-thread processor from Intel, perfect for enthusiasts and gamers.",
              image: "https://www.example.com/image_processor10.jpg",
              price: 599.99,
              slug: "i911900k",
              stock: 4,
            },
            {
              name: "AMD Ryzen 9 5950X 16-Core Processor",
              description:
                "Top-tier 16-core, 32-thread processor by AMD, offering unparalleled gaming and multitasking performance.",
              image: "https://www.example.com/image_processor11.jpg",
              price: 749.99,
              slug: "ryzen5950x",
              stock: 2,
            },
          ],
        },
      },
    },
  });
  const hard_drives = await prisma.category.upsert({
    where: { id: "seed-03" },
    update: {},
    create: {
      name: "hard drives",
      products: {
        createMany: {
          data: [
            {
              name: "Samsung 1TB NVMe SSD",
              description:
                "Swift and reliable 1TB NVMe solid-state drive from Samsung, perfect for faster data access and multitasking.",
              image: "https://www.example.com/image_ssd2.jpg",
              price: 129.99,
              slug: "samsung1tbssd",
              stock: 8,
            },
            {
              name: "Seagate BarraCuda 4TB HDD",
              description:
                "High-capacity 4TB hard disk drive by Seagate, offering ample storage space for your files and applications.",
              image: "https://www.example.com/image_hdd1.jpg",
              price: 99.99,
              slug: "seagate4tbhdd",
              stock: 5,
            },
            {
              name: "Crucial MX500 2TB SATA SSD",
              description:
                "2TB SATA SSD for fast storage and system responsiveness.",
              image: "https://www.example.com/image_ssd3.jpg",
              price: 199.99,
              slug: "crucial2tbssd",
              stock: 6,
            },
            {
              name: "Western Digital 500GB NVMe SSD",
              description:
                "High-speed 500GB NVMe solid-state drive from Western Digital, ideal for system acceleration and data transfer.",
              image: "https://www.example.com/image_ssd5.jpg",
              price: 79.99,
              slug: "wd500gbssd",
              stock: 7,
            },
            {
              name: "Toshiba P300 1TB HDD",
              description:
                "1TB hard disk drive by Toshiba for reliable data storage and everyday computing tasks.",
              image: "https://www.example.com/image_hdd3.jpg",
              price: 49.99,
              slug: "toshiba1tbhdd",
              stock: 9,
            },
            {
              name: "Kingston A2000 500GB NVMe SSD",
              description:
                "500GB NVMe SSD by Kingston, offering high-speed data access and storage for your applications.",
              image: "https://www.example.com/image_ssd6.jpg",
              price: 89.99,
              slug: "kingston500gbssd",
              stock: 10,
            },
            {
              name: "Seagate IronWolf 6TB NAS HDD",
              description:
                "6TB NAS hard disk drive by Seagate, designed for network-attached storage and data backup.",
              image: "https://www.example.com/image_hdd4.jpg",
              price: 179.99,
              slug: "seagate6tbnas",
              stock: 4,
            },
            {
              name: "ADATA SU800 1TB SATA SSD",
              description:
                "1TB SATA SSD by ADATA for reliable and cost-effective storage for your data and applications.",
              image: "https://www.example.com/image_ssd7.jpg",
              price: 119.99,
              slug: "adata1tbssd",
              stock: 6,
            },
            {
              name: "WD Red Plus 4TB NAS HDD",
              description:
                "4TB NAS hard disk drive by Western Digital, suitable for home and small business network storage solutions.",
              image: "https://www.example.com/image_hdd5.jpg",
              price: 129.99,
              slug: "wd4tbnas",
              stock: 5,
            },
            {
              name: "Samsung 2TB NVMe SSD",
              description:
                "2TB NVMe solid-state drive by Samsung, offering fast and efficient storage for your work and gaming needs.",
              image: "https://www.example.com/image_ssd8.jpg",
              price: 249.99,
              slug: "samsung2tbssd",
              stock: 4,
            },
          ],
        },
      },
    },
  });
  const memory = await prisma.category.upsert({
    where: { id: "seed-04" },
    update: {},
    create: {
      name: "memory",
      products: {
        createMany: {
          data: [
            {
              name: "Corsair Vengeance LPX 16GB DDR4 RAM",
              description:
                "High-quality 16GB DDR4 memory kit for improved system performance.",
              image: "https://www.example.com/image_memory1.jpg",
              price: 79.99,
              slug: "corsair16gbddr4",
              stock: 10,
            },
            {
              name: "G.Skill Trident Z RGB 32GB DDR4 RAM",
              description:
                "32GB DDR4 memory with RGB lighting for gaming and productivity setups.",
              image: "https://www.example.com/image_memory2.jpg",
              price: 149.99,
              slug: "gskill32gbddr4",
              stock: 8,
            },
            {
              name: "Crucial Ballistix 8GB DDR4 RAM",
              description:
                "8GB DDR4 memory module for budget-conscious users seeking improved performance.",
              image: "https://www.example.com/image_memory3.jpg",
              price: 39.99,
              slug: "crucial8gbddr4",
              stock: 12,
            },
            {
              name: "Kingston HyperX Fury 16GB DDR4 RAM",
              description:
                "16GB DDR4 memory module with heat spreader for enhanced gaming performance.",
              image: "https://www.example.com/image_memory4.jpg",
              price: 69.99,
              slug: "kingston16gbddr4",
              stock: 7,
            },
            {
              name: "Team T-Force Delta RGB 32GB DDR4 RAM",
              description:
                "32GB DDR4 memory with vibrant RGB lighting for gamers and content creators.",
              image: "https://www.example.com/image_memory5.jpg",
              price: 179.99,
              slug: "team32gbddr4-delta",
              stock: 6,
            },
            {
              name: "Patriot Viper Steel 64GB DDR4 RAM",
              description:
                "High-capacity 64GB DDR4 memory for enthusiasts and professionals demanding multitasking power.",
              image: "https://www.example.com/image_memory6.jpg",
              price: 249.99,
              slug: "patriot64gbddr4",
              stock: 5,
            },
            {
              name: "Corsair Dominator Platinum RGB 64GB DDR4 RAM",
              description:
                "64GB DDR4 memory with RGB lighting and superior performance for extreme tasks.",
              image: "https://www.example.com/image_memory7.jpg",
              price: 279.99,
              slug: "corsair64gbddr4",
              stock: 4,
            },
            {
              name: "HyperX Predator RGB 32GB DDR4 RAM",
              description:
                "32GB DDR4 memory module with RGB lighting for gaming and overclocking enthusiasts.",
              image: "https://www.example.com/image_memory8.jpg",
              price: 149.99,
              slug: "hyperx32gbddr4",
              stock: 8,
            },
            {
              name: "G.Skill Ripjaws V 16GB DDR4 RAM",
              description:
                "16GB DDR4 memory kit for enhanced gaming and productivity performance.",
              image: "https://www.example.com/image_memory9.jpg",
              price: 69.99,
              slug: "gskill16gbddr4",
              stock: 9,
            },
            {
              name: "Team T-Force Vulcan Z 32GB DDR4 RAM",
              description:
                "32GB DDR4 memory module for multitasking and content creation tasks.",
              image: "https://www.example.com/image_memory10.jpg",
              price: 119.99,
              slug: "team32gbddr4-vulcanz",
              stock: 6,
            },
          ],
        },
      },
    },
  });
  const motherboards = await prisma.category.upsert({
    where: { id: "seed-05" },
    update: {},
    create: {
      name: "motherboards",
      products: {
        createMany: {
          data: [
            {
              name: "ASUS ROG Strix B450-F Gaming Motherboard",
              description:
                "Highly-rated gaming motherboard with RGB lighting and support for AMD processors.",
              image: "https://www.example.com/image_motherboard1.jpg",
              price: 129.99,
              slug: "asusstrixb450f",
              stock: 10,
            },
            {
              name: "MSI MAG Z590 Tomahawk Motherboard",
              description:
                "Premium motherboard with support for Intel's latest processors and advanced features.",
              image: "https://www.example.com/image_motherboard2.jpg",
              price: 249.99,
              slug: "msiz590tomahawk",
              stock: 5,
            },
            {
              name: "Gigabyte B450 AORUS PRO WIFI Motherboard",
              description:
                "Feature-rich motherboard with Wi-Fi support and compatibility with AMD processors.",
              image: "https://www.example.com/image_motherboard3.jpg",
              price: 139.99,
              slug: "gigabyteb450aorus",
              stock: 7,
            },
            {
              name: "ASRock B550M Steel Legend Motherboard",
              description:
                "Compact micro-ATX motherboard with a robust steel design and support for AMD processors.",
              image: "https://www.example.com/image_motherboard4.jpg",
              price: 109.99,
              slug: "asrockb550m",
              stock: 8,
            },
            {
              name: "ASUS TUF Gaming B460-Plus Motherboard",
              description:
                "TUF series motherboard with military-grade components and support for Intel processors.",
              image: "https://www.example.com/image_motherboard5.jpg",
              price: 119.99,
              slug: "asustufb460plus",
              stock: 6,
            },
            {
              name: "MSI MPG Z590 Gaming Edge WiFi Motherboard",
              description:
                "Gaming-oriented motherboard with Wi-Fi support and compatibility with Intel processors.",
              image: "https://www.example.com/image_motherboard6.jpg",
              price: 189.99,
              slug: "msiz590gamingedge",
              stock: 4,
            },
            {
              name: "Gigabyte X570 AORUS Master Motherboard",
              description:
                "High-end motherboard with extensive features and support for AMD Ryzen processors.",
              image: "https://www.example.com/image_motherboard7.jpg",
              price: 279.99,
              slug: "gigabytex570master",
              stock: 3,
            },
            {
              name: "ASRock H510M-HDV Motherboard",
              description:
                "Entry-level micro-ATX motherboard with support for Intel processors at an affordable price.",
              image: "https://www.example.com/image_motherboard8.jpg",
              price: 79.99,
              slug: "asrockh510mhdv",
              stock: 9,
            },
            {
              name: "ASUS Prime B550M-A/CSM Micro-ATX Motherboard",
              description:
                "Micro-ATX motherboard with business features and compatibility with AMD processors.",
              image: "https://www.example.com/image_motherboard9.jpg",
              price: 99.99,
              slug: "asusprimeb550m",
              stock: 7,
            },
            {
              name: "MSI B450 TOMAHAWK MAX Motherboard",
              description:
                "Reliable motherboard with extensive compatibility for AMD processors and gaming features.",
              image: "https://www.example.com/image_motherboard10.jpg",
              price: 109.99,
              slug: "msib450tomahawk",
              stock: 8,
            },
          ],
        },
      },
    },
  });

  console.log({ graphic_cards, processors, hard_drives, memory, motherboards });
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
