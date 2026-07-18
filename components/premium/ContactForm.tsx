'use client';

import { Magnetic } from '@/components/premium/Magnetic';
import { IconBrandWhatsapp, IconCalendarEvent, IconSend } from '@tabler/icons-react';

export function ContactForm() {
  return (
    <section className="w-full bg-background relative z-10 py-20 pb-40">
      <div className="max-w-[1200px] mx-auto px-8 sm:px-20 flex flex-col lg:flex-row gap-20">
        
        {/* Left Side: Contact Info & Direct Links */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
              Let&apos;s talk about<br />your product.
            <p className="text-muted text-lg leading-relaxed max-w-md mb-12">
              Fill out the form, or reach out to our Sales Executive directly. We typically respond within a few hours.
            </p>

            <div className="flex flex-col gap-6">
              <a href="#" className="group flex items-center gap-6 p-6 rounded-2xl bg-surface border border-border hover:border-primary transition-all cursor-none">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <IconCalendarEvent size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-1">Book a Call</h3>
                  <p className="text-muted text-sm">Schedule a 30-min discovery session via Calendly</p>
                </div>
              </a>

              <a href="#" className="group flex items-center gap-6 p-6 rounded-2xl bg-surface border border-border hover:border-green-500 transition-all cursor-none">
                <div className="w-14 h-14 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <IconBrandWhatsapp size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-1">WhatsApp</h3>
                  <p className="text-muted text-sm">Direct message our Sales Executive</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="flex-1">
          <form className="bg-surface border border-border rounded-[32px] p-8 sm:p-12 flex flex-col gap-8 shadow-xl">
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Your Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full bg-background border border-border rounded-full px-6 py-4 text-foreground focus:outline-none focus:border-primary transition-colors cursor-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Email Address</label>
              <input 
                type="email" 
                placeholder="john@startup.com" 
                className="w-full bg-background border border-border rounded-full px-6 py-4 text-foreground focus:outline-none focus:border-primary transition-colors cursor-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Project Budget</label>
              <select className="w-full bg-background border border-border rounded-full px-6 py-4 text-foreground focus:outline-none focus:border-primary transition-colors cursor-none appearance-none">
                <option>Less than ₹1,00,000</option>
                <option>₹1,00,000 - ₹3,00,000</option>
                <option>₹3,00,000+</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted ml-4">Project Details</label>
              <textarea 
                placeholder="Tell us about what you want to build..." 
                rows={4}
                className="w-full bg-background border border-border rounded-[24px] px-6 py-4 text-foreground focus:outline-none focus:border-primary transition-colors cursor-none resize-none"
              />
            </div>

            <Magnetic>
              <button 
                type="button"
                className="w-full py-4 mt-4 rounded-full bg-foreground text-background text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group cursor-none"
              >
                Send Message
                <IconSend size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Magnetic>

          </form>
        </div>

      </div>
    </section>
  );
}
