import "./globals.css";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import type { ReactNode } from "react";
import { getSessionServer } from "@/lib/api/serverApi";
import type { User } from "@/types/user";

export const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Application for creating and viewing notes",
  icons: { icon: "/notehub.svg" },
  openGraph: {
    title: "NoteHub",
    description: "Application for creating and viewing notes",
    url: "https://ac.goit.global/fullstack/react",
    images: [
      { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
    ],
  },
};

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default async function RootLayout({ children, modal }: RootLayoutProps) {
  const initialUser: User | null = await getSessionServer();

  return (
    <html lang="en">
      <body className={roboto.className}>
        <TanStackProvider>
          <AuthProvider initialUser={initialUser}>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}