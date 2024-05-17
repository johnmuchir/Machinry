import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import 'react-datepicker/dist/react-datepicker.css';
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
    title: "Machinry",
    description: "Heavy Equipment Community Hub - Connect"
}

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
    <ClerkProvider>
        <html lang='en'>
            <body className={`${inter.className} md:px-10 px-2`}>
            
                <div className="flex">
        
                <section className="flex min-h-screen flex-1 flex-col pb-6 pt-28 max-md:pb-14 sm:px-10">
                    <div className="w-full">
        
                        <Toaster />
                        {children}
        
                    </div>
                </section>
                </div>
            </body>
        </html>
    </ClerkProvider>
  )
}
