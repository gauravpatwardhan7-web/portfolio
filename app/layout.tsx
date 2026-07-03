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
  title: "Gaurav Patwardhan — Product Manager",
  description:
    "Product Manager who ships. I find underserved user problems, make the product calls, and build the solution end to end.",
  openGraph: {
    title: "Gaurav Patwardhan — Product Manager",
    description:
      "Product Manager who ships. I find underserved user problems, make the product calls, and build the solution end to end.",
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
                "Product Manager building AI-native products at Shell. Finds underserved user problems and ships end-to-end solutions.",
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
