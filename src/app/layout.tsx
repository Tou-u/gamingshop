import "./globals.css";
import { Suspense } from "react";
import { Providers } from "./providers";
import Header from "@/components/Header";
import NavBarSkeleton from "@/components/NavBarSkeleton";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <Suspense fallback={<NavBarSkeleton />}>
            <Header />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
