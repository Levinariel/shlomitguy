import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ד\"ר שלומית גיא | הרצאות וסמינרים בנושא ספורט וחברה",
  description: "ד\"ר שלומית גיא – חוקרת, סופרת ומרצה בתחום ספורט וחברה. הרצאות למנהלים, מאמנים וארגונים על אלימות בספורט, חינוך וספורט הישגי.",
  openGraph: {
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
        {/* Hidden form – lets Netlify detect the contact form at build time */}
        <form name="contact" data-netlify="true" hidden>
          <input name="name" />
          <input name="email" />
          <input name="subject" />
          <textarea name="message" />
        </form>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
