import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Gaming Shop'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <main className="max-w-[1050px] m-auto px-2">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
