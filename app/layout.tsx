import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import OCConnectWrapper from '@/components/OCConnectWrapper';
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VeriBee - Secure, Verified Research Studies",
  description:
    "Create, collect, and analyze research data with our AI-powered platform. Incentivize participants with mini tokens and get valuable insights faster than ever.",
  generator: "v0.dev",
};

const opts = {
  redirectUri: 'https://veribee.vercel.app/redirect', // Adjust this URL as needed
  referralCode: 'PARTNER6', // Partner code
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head >
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <OCConnectWrapper opts={opts} sandboxMode={true}>
            {children}
          </OCConnectWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
