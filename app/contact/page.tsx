'use client';
import { Navbar } from '@/components/premium/Navbar';
import { Cursor } from '@/components/premium/Cursor';
import { Footer } from '@/components/premium/Footer';
import { ContactForm } from '@/components/premium/ContactForm';
import { TextMask } from '@/components/premium/TextMask';

export default function ContactPage() {
  return (
    <div className="relative bg-background text-foreground min-h-screen cursor-none font-sans">
      <Cursor />
      <Navbar />

      {/* Contact Page Header */}
      <section className="relative pt-[25vh] pb-[10vh] px-8 sm:px-20 text-center bg-background z-20">
        <h1 className="text-[12vw] sm:text-[8vw] font-bold leading-[0.85] tracking-tighter uppercase mb-6 flex flex-col items-center">
          <TextMask>Start A</TextMask>
          <TextMask delay={0.1}>Project</TextMask>
        </h1>
        <p className="text-muted text-xl max-w-2xl mx-auto uppercase tracking-widest font-medium">
          Ready to ship? Let&apos;s build something extraordinary.
        </p>
      </section>

      {/* Contact Form & Links */}
      <ContactForm />

      <Footer />
    </div>
  );
}
