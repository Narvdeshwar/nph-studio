export function ProofStrip() {
  return (
    <div className="w-full border-t border-border bg-white py-12 flex flex-col items-center">
      <p className="text-[13px] text-muted font-medium mb-6 uppercase tracking-wider">Trusted by founders & teams behind</p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
        <span className="text-[20px] font-bold text-foreground">AIBulletin</span>
        <span className="text-[20px] font-bold text-foreground">JSPARK.AI</span>
        <span className="text-[20px] font-bold text-foreground flex items-center">JSPARK Prime</span>
        <span className="text-[20px] font-bold text-foreground">LMS Project</span>
      </div>
    </div>
  );
}
