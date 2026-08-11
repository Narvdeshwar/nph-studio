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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl z-[210] p-4"
          >
            <div className="bg-surface border border-border rounded-[32px] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
              
              <button 
                onClick={closeModal}
                className="absolute top-8 right-8 text-muted hover:text-foreground transition-colors p-2 bg-white/5 rounded-full"
              >
                <IconX size={24} />
              </button>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <IconCheck size={40} />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-foreground">Estimate Requested</h3>
                  <p className="text-muted text-lg">We&apos;ve received your inquiry and will be in touch within 24 hours to discuss the details.</p>
                  <button onClick={closeModal} className="mt-8 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors text-white">
                    Close Window
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-2 text-foreground">Get an Estimate</h3>
                  <p className="text-muted mb-8">Tell us about your project and we&apos;ll get back to you with a timeline and quote.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted">Name</label>
                        <input 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted">Email Address</label>
                        <input 
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder="jane@example.com"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted">Phone / WhatsApp</label>
                      <input 
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted">Service Needed</label>
                      <select 
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                      >
                        <option>Landing Page</option>
                        <option>Full-Stack MVP</option>
                        <option>AI / RAG Integration</option>
                        <option>Custom Development</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted">Estimated Budget</label>
                        <select 
                          required
                          value={formData.budget}
                          onChange={(e) => setFormData({...formData, budget: e.target.value})}
                          className="bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                        >
                          <option value="" disabled>Select Budget...</option>
                          <option>₹20K - ₹50K</option>
                          <option>₹50K - ₹1.5L</option>
                          <option>₹1.5L - ₹5L</option>
                          <option>₹5L+</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted">Timeline</label>
                        <select 
                          required
                          value={formData.timeline}
                          onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                          className="bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                        >
                          <option value="" disabled>Select Timeline...</option>
                          <option>ASAP (Rush)</option>
                          <option>1-3 Weeks</option>
                          <option>1-2 Months</option>
                          <option>Flexible</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted">Project Description (Optional)</label>
                      <textarea 
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors min-h-[100px] resize-y"
                        placeholder="Briefly describe your goals..."
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="mt-4 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(255,90,54,0.3)] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
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
        </>
      )}
    </AnimatePresence>
  );
}
