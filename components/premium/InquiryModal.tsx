'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconCheck } from '@tabler/icons-react';
import { submitLead } from '@/app/actions/submitLead';

export function InquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState('Full-Stack MVP');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    timeline: '',
    description: ''
  });

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.service) {
        setSelectedService(customEvent.detail.service);
      }
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('open-inquiry-modal', handleOpen);
    return () => window.removeEventListener('open-inquiry-modal', handleOpen);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setIsSuccess(false), 500); // Reset after close animation
    document.body.style.overflow = 'auto';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const detailsStr = `Service: ${selectedService}\nTimeline: ${formData.timeline}\nDescription: ${formData.description || 'N/A'}`;
      
      const response = await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        budget: formData.budget,
        details: detailsStr
      });

      if (!response.success) {
        alert(response.error || 'Failed to submit form.');
        setIsSubmitting(false);
        return;
      }
      
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', budget: '', timeline: '', description: '' });
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again or message us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] overflow-y-auto flex min-h-full items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-modal-title"
            className="relative w-full max-w-xl my-auto z-[210] bg-surface border border-border rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 md:p-10 shadow-2xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] flex flex-col overflow-hidden"
          >
            {/* Top Close Button - Always visible inside modal */}
            <button 
              type="button"
              onClick={closeModal}
              aria-label="Close estimate dialog"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-muted hover:text-foreground transition-colors p-2 bg-foreground/5 hover:bg-foreground/10 rounded-full z-20 cursor-pointer"
            >
              <IconX size={20} />
            </button>

            <div className="overflow-y-auto pr-1 sm:pr-2">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-5">
                    <IconCheck size={36} />
                  </div>
                  <h3 id="inquiry-modal-title" className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-3 text-foreground">Estimate Requested</h3>
                  <p className="text-muted text-sm sm:text-base max-w-md">We&apos;ve received your inquiry and will be in touch within 24 hours to discuss the details.</p>
                  <button onClick={closeModal} className="mt-6 px-8 py-3.5 bg-foreground text-background rounded-full font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity">
                    Close Window
                  </button>
                </div>
              ) : (
                <>
                  <h3 id="inquiry-modal-title" className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-1.5 text-foreground">Get an Estimate</h3>
                  <p className="text-muted text-xs sm:text-sm mb-6">Tell us about your project and we&apos;ll get back to you with a timeline and quote.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="inquiry-name" className="text-xs font-bold uppercase tracking-widest text-muted">Name</label>
                        <input 
                          id="inquiry-name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-background border border-border rounded-xl px-4 py-2.5 sm:py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="inquiry-email" className="text-xs font-bold uppercase tracking-widest text-muted">Email Address</label>
                        <input 
                          id="inquiry-email"
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-background border border-border rounded-xl px-4 py-2.5 sm:py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder="jane@example.com"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="inquiry-phone" className="text-xs font-bold uppercase tracking-widest text-muted">Phone / WhatsApp</label>
                      <input 
                        id="inquiry-phone"
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="bg-background border border-border rounded-xl px-4 py-2.5 sm:py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="inquiry-service" className="text-xs font-bold uppercase tracking-widest text-muted">Service Needed</label>
                      <select 
                        id="inquiry-service"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="bg-background border border-border rounded-xl px-4 py-2.5 sm:py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option>Landing Page</option>
                        <option>Full-Stack MVP</option>
                        <option>AI / RAG Integration</option>
                        <option>Custom Development</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="inquiry-budget" className="text-xs font-bold uppercase tracking-widest text-muted">Estimated Budget</label>
                        <select 
                          id="inquiry-budget"
                          required
                          value={formData.budget}
                          onChange={(e) => setFormData({...formData, budget: e.target.value})}
                          className="bg-background border border-border rounded-xl px-4 py-2.5 sm:py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select Budget...</option>
                          <option>₹20K - ₹50K</option>
                          <option>₹50K - ₹1.5L</option>
                          <option>₹1.5L - ₹5L</option>
                          <option>₹5L+</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="inquiry-timeline" className="text-xs font-bold uppercase tracking-widest text-muted">Timeline</label>
                        <select 
                          id="inquiry-timeline"
                          required
                          value={formData.timeline}
                          onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                          className="bg-background border border-border rounded-xl px-4 py-2.5 sm:py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select Timeline...</option>
                          <option>ASAP (Rush)</option>
                          <option>1-3 Weeks</option>
                          <option>1-2 Months</option>
                          <option>Flexible</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="inquiry-desc" className="text-xs font-bold uppercase tracking-widest text-muted">Project Description (Optional)</label>
                      <textarea 
                        id="inquiry-desc"
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors min-h-[70px] max-h-[140px] resize-y"
                        placeholder="Briefly describe your goals..."
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="mt-2 bg-primary hover:bg-[#E04D2D] text-white py-3.5 sm:py-4 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-[1.01] active:scale-95 transition-all shadow-[0_0_30px_rgba(255,90,54,0.3)] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        'Request Estimate'
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
