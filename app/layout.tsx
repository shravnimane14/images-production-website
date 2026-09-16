import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Images Production | Photography & Videography in Mumbai",
  description:
    "Images Production is a photography, videography and video editing studio in Mulund West, Mumbai.",
  openGraph: {
    title: "Images Production",
    description: "Photography, videography and video editing studio in Mumbai.",
    images: ["/images/Cinematic photo 1.JPG"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
