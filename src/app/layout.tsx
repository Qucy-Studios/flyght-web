import type { Metadata } from 'next'
import './globals.css'
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import {inter} from "@/app";

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
    <html lang="en" className={"dark"}>
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
