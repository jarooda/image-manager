import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { host } from "@/utils/config/host"

const defaultUrl = host

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Image Manager",
  description: "Manage images using Next.js, Supabase, AWS and Vercel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
