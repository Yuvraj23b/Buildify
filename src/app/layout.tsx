import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/site/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster as SonnarToaster } from '@/components/ui/sonner'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Buildify",
  description: "Craft powerful, scalable web applications with speed and simplicity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // console.log(process.env.DATABASE_URL)
  return (
   
     <html lang="en" suppressHydrationWarning>
      <body
         className={`${geistSans.variable} ${geistMono.variable} `}
        >
          {/* <ClerkProvider> */}
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
            <ModalProvider>

            {children}
            <Toaster/>
            <SonnarToaster position="bottom-left" />
            </ModalProvider>
       
      
      </ThemeProvider>
      </body>
     </html>
    
  
  );
}
