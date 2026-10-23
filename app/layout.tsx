import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillMirror — Find Out What You Actually Understand",
  description: "Adaptive developer education platform that diagnoses underlying mental model misconceptions in code execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#090d16] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
