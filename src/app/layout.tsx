import type { Metadata } from "next";
import "./globals.css";
import Footer from './components/footer';
import NavHeader from './components/nav-header';

export const metadata: Metadata = {
  title: "koremp.blog",
  description: "koremp's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-screen-lg min-w-[320px] mx-auto min-h-screen">
        <NavHeader />
        <main className="flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
