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
  metadataBase: new URL("https://rasisnahara.netlify.app"),
  title: "ד\"ר שלומית גיא | הרצאות וסמינרים בנושא ספורט וחברה",
  description: "ד\"ר שלומית גיא – חוקרת, סופרת ומרצה בתחום ספורט וחברה. הרצאות למנהלים, מאמנים וארגונים על אלימות בספורט, חינוך וספורט הישגי.",
  openGraph: {
    locale: "he_IL",
    type: "website",
    siteName: "ד\"ר שלומית גיא | הוצאת רסיס נהרה",
    images: [
      {
        url: "/images/profile-main-jpg.JPG",
        width: 800,
        alt: "ד\"ר שלומית גיא",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    languages: {
      he: "https://rasisnahara.netlify.app",
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "ד\"ר שלומית גיא",
  alternateName: "Dr. Shlomit Guy",
  url: "https://rasisnahara.netlify.app",
  image: "https://rasisnahara.netlify.app/images/profile-main-jpg.JPG",
  description:
    "חוקרת, סופרת ומרצה בתחום ספורט וחברה. בעלת תואר דוקטור מהמחלקה לאנתרופולוגיה וסוציולוגיה באוניברסיטת בן גוריון (2010). מחקריה עוסקים בקהילות אוהדים, אלימות בספורט הישגי, וכוחו של הספורט כמנוע חברתי וחינוכי.",
  jobTitle: "חוקרת, סופרת ומרצה",
  honorificPrefix: "ד\"ר",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "אוניברסיטת בן גוריון בנגב",
    alternateName: "Ben-Gurion University of the Negev",
    url: "https://www.bgu.ac.il",
  },
  knowsAbout: [
    "אלימות בספורט",
    "קהילות אוהדים",
    "ספורט וחברה",
    "חינוך דרך ספורט",
    "אנתרופולוגיה של ספורט",
    "ספורט הישגי לילדים",
    "חוליגניות בכדורגל",
  ],
  sameAs: [
    "https://www.facebook.com/dr.shlomitguy",
    "https://www.linkedin.com/in/shlomit-guy-54707873/",
  ],
  worksFor: {
    "@type": "Organization",
    name: "הוצאת רסיס נהרה",
    url: "https://rasisnahara.netlify.app",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "הוצאת רסיס נהרה",
  alternateName: "Rasis Nahara Publishing",
  url: "https://rasisnahara.netlify.app",
  description:
    "הוצאת בוטיק המתמחה בספרי ספורט וילדים. מאז 2024 מנהלת שלומית גיא את ההוצאה ומפרסמת ספרים פורצי דרך – מחקר, עיון וספרות ילדים.",
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "ד\"ר שלומית גיא",
    url: "https://rasisnahara.netlify.app/about",
  },
  inLanguage: "he",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ד\"ר שלומית גיא | הוצאת רסיס נהרה",
  url: "https://rasisnahara.netlify.app",
  description:
    "אתר רשמי של ד\"ר שלומית גיא – חוקרת, סופרת ומרצה בתחום ספורט וחברה. הוצאת רסיס נהרה – ספרי ספורט וילדים.",
  inLanguage: "he",
  author: {
    "@type": "Person",
    name: "ד\"ר שלומית גיא",
    url: "https://rasisnahara.netlify.app/about",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, organizationSchema, websiteSchema]),
          }}
        />
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
