import { Linkedin, Mail, Phone, Youtube } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SOCIAL_LINKS } from "@/lib/seo";
import styles from "./contact.module.css";

const socials = [
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: Linkedin, style: styles.linkedin },
  { label: "YouTube", href: SOCIAL_LINKS.youtube, icon: Youtube, style: styles.youtube },
  { label: "WhatsApp", href: "https://wa.me/+2348102567773", icon: FaWhatsapp, style: styles.whatsapp },
];
export default function ContactSection() {
  return <section id="contact-section" className={styles.contactSection} aria-label="Contact information"><div className={styles.contactCards}>
    <article className={styles.contactCard}><span className={styles.cardIcon}><Mail size={30} aria-hidden="true" /></span><h2>Direct Email</h2><p>Send us a direct email for general questions, admissions inquiries, or partnership discussions</p><a className={styles.contactLink} href="mailto:support@productpointer.com">support@productpointer.com</a></article>
    <article className={styles.contactCard}><span className={styles.cardIcon}><Phone size={28} aria-hidden="true" /></span><h2>Phone</h2><p>Get in touch with our team for general questions, admissions inquiries, or partnership discussions</p><a className={styles.contactLink} href="tel:+2348001293456">+234 800 129 3456</a></article>
    <article className={styles.contactCard}><span className={styles.cardIcon}><Phone size={28} aria-hidden="true" /></span><h2>Stay Connected</h2><p>Follow ProductPointers for product management insights, learning opportunities, program updates and community news.</p><div className={styles.socials}>{socials.map(social => <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer" className={social.style}><social.icon size={24} aria-hidden="true" /></a>)}</div></article>
  </div></section>;
}
