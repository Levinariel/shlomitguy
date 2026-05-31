import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: 'צרו קשר | ד"ר שלומית גיא',
  description:
    'יצירת קשר עם ד"ר שלומית גיא – להזמנת הרצאות, פניות להוצאת רסיס נהרה ושיתופי פעולה.',
  alternates: { canonical: "https://rasisnahara.netlify.app/contact" },
};

export default function ContactPage() {
  return <ContactForm />;
}
