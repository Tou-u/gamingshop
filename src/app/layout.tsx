import { Providers } from "./providers";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { getPageSession } from "@/auth/lucia";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getPageSession();

  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <NavBar session={session} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
