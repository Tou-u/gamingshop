import { Card, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import NextLink from 'next/link'

export default function LandingCategories() {
  return (
    <>
      <Card isPressable className="h-[200px]" as={NextLink} href="/category/graphics_cards">
        <CardHeader className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col p-0 w-auto">
          <p className="text-center text-3xl text-white/90 drop-shadow-lg uppercase font-bold [text-shadow:_0_2px_4px_rgb(0_0_0_/_100%)]">
            graphics cards
          </p>
        </CardHeader>
        <Image
          isZoomed
          removeWrapper
          alt="graphic card"
          className="z-0 w-full h-full object-cover"
          src="/graphic-card.webp"
        />
      </Card>
      <Card isPressable className="h-[200px]" as={NextLink} href="/category/processors">
        <CardHeader className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col p-0 w-auto">
          <p className="text-center text-3xl text-white/90 drop-shadow-lg uppercase font-bold [text-shadow:_0_2px_4px_rgb(0_0_0_/_100%)]">
            processors
          </p>
        </CardHeader>
        <Image
          isZoomed
          removeWrapper
          alt="processors"
          className="z-0 w-full h-full object-cover"
          src="/processor.webp"
        />
      </Card>
      <Card isPressable className="h-[200px]" as={NextLink} href="/category/hard_drives">
        <CardHeader className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col p-0 w-auto">
          <p className="text-center text-3xl text-white/90 drop-shadow-lg uppercase font-bold [text-shadow:_0_2px_4px_rgb(0_0_0_/_100%)]">
            hard drives
          </p>
        </CardHeader>
        <Image
          isZoomed
          removeWrapper
          alt="hard drives"
          className="z-0 w-full h-full object-cover"
          src="/hard-drive.webp"
        />
      </Card>
      <Card isPressable className="h-[200px]" as={NextLink} href="/category/ram">
        <CardHeader className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col p-0 w-auto">
          <p className="text-center text-3xl text-white/90 drop-shadow-lg uppercase font-bold [text-shadow:_0_2px_4px_rgb(0_0_0_/_100%)]">
            ram
          </p>
        </CardHeader>
        <Image
          isZoomed
          removeWrapper
          alt="ram"
          className="z-0 w-full h-full object-cover"
          src="/ram.webp"
        />
      </Card>
      <Card
        isPressable
        className="h-[200px] col-span-2"
        as={NextLink}
        href="/category/motherboards">
        <CardHeader className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col p-0 w-auto">
          <p className="text-center text-3xl text-white/90 drop-shadow-lg uppercase font-bold [text-shadow:_0_2px_4px_rgb(0_0_0_/_100%)]">
            motherboards
          </p>
        </CardHeader>
        <Image
          isZoomed
          removeWrapper
          alt="motherboard"
          className="z-0 w-full h-full object-cover"
          src="/motherboard.webp"
        />
      </Card>
    </>
  )
}
