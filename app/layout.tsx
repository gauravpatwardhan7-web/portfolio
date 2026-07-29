import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gauravs-portfolio-in.vercel.app"),
  title: "Gaurav Patwardhan — Portfolio",
  description:
    "Portfolio of Gaurav Patwardhan. Products I've built end to end, each starting from a real user problem — plus case studies and how I work.",
  openGraph: {
    title: "Gaurav Patwardhan — Portfolio",
    description:
      "Portfolio of Gaurav Patwardhan. Products I've built end to end, each starting from a real user problem — plus case studies and how I work.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Gaurav Patwardhan",
              jobTitle: "Product Manager",
              description:
                "Portfolio of Gaurav Patwardhan — products built end to end, from user problem to shipped solution.",
              url: "https://gauravs-portfolio-in.vercel.app",
              image: "https://gauravs-portfolio-in.vercel.app/About-me-1.jpg",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bengaluru",
                addressCountry: "IN",
              },
              worksFor: { "@type": "Organization", name: "Shell" },
              sameAs: [
                "https://www.linkedin.com/in/patwardhangaurav/",
                "https://github.com/gauravpatwardhan7-web",
              ],
              knowsAbout: [
                "Product Management",
                "AI Agents",
                "Product Discovery",
                "Roadmapping",
              ],
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
