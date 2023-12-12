import Scroll from '@/components/Scroll'
import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Gaming Shop'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <Scroll />
      <body className="max-w-[1050px] m-auto px-2">
        <Providers>
          {children}
          <footer>
            <div className="w-full p-4 text-center">
              <span className="text-sm text-gray-400">
                <a href="#" className="hover:underline px-2">
                  Rodrigo Riquelme
                </a>
                Portfolio Gaming Shop App
              </span>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
