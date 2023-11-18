import type { Metadata } from 'next'
import './globals.css'
import {Header} from "@/app/_components/Header";
import {Footer} from "@/app/_components/Footer";
import {inter} from "@/app/_app";

export const metadata: Metadata = {
  title: 'Flyght',
  description: 'Membership Questions brought into Discord!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " flex min-h-screen flex-col px-12 xl:px-24 py-12 2xl:py-24 justify-middle align-middle items-center"}>
        <div>
          <Header/>
          <main>
            {children}
          </main>
          <Footer/>
        </div>
      </body>
    </html>
  )
}
