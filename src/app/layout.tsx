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
      <body className={inter.className + " flex min-h-screen flex-col"}>
        <Header/>
        <div className={"padding-standard xl:justify-middle xl:align-middle xl:items-center"}>
          <main className={"flex-grow w-full"}>
            {children}
          </main>
        </div>
        <Footer/>
      </body>
    </html>
  )
}
