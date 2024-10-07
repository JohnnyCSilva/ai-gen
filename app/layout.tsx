import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import TopNav from "@/components/nav/topNav";
import { ThemeProvider } from "@/context/theme";
import { UsageProvider } from "@/context/usage";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Elysium AI",
  description:
    "Elysium AI is a generative AI platform that helps you create content.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            <UsageProvider>
              <header>
                <TopNav />
              </header>
              {children}
              <Toaster />
            </UsageProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
