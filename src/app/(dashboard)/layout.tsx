import '../globals.css'
import { Providers } from '../providers'

export const metadata = {
  title: 'Gaming Shop Dashboard'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
