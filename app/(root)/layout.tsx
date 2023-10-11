import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from "@clerk/nextjs";
import Bottombar from "@/components/shared/Bottombar";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from '@/components/shared/LeftSidebar';
import RightSidebar from '@/components/shared/RightSidebar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Machinry",
  description: "A Next.js 13 Meta Machinry Application"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider 
    >
      <html lang="en">
        <body className={inter.className}>
          <Topbar />
      
          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>{children}</div>
            </section>
            {/* @ts-ignore */}
            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}
