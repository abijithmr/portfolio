import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { avatarUrl, profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description = `${profile.name} is a ${profile.role.toLowerCase()} and final-year Computer Science student at Sahrdaya College of Engineering and Technology, working with TypeScript, React, Next.js, Go, Node.js and PostgreSQL.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name}, ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name, url: profile.links.github }],
  keywords: [profile.name, "Software Engineer", "Portfolio", "Next.js", "React", "TypeScript", "Go", "Kerala"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: `${profile.name}, ${profile.role}`,
    description,
    firstName: profile.firstName,
    lastName: profile.lastName,
    username: profile.githubUser,
    images: [{ url: avatarUrl, width: 460, height: 460, alt: profile.name }],
  },
  twitter: {
    card: "summary",
    title: `${profile.name}, ${profile.role}`,
    description,
    images: [avatarUrl],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#e9ecef",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-hidden font-sans">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
