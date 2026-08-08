let cachedDomains: Set<string> | null = null;

const HARDCODED_TEMP_DOMAINS = new Set([
  'temp.com', 'test.com', 'example.com', 'mailinator.com', 'guerrillamail.com', 'yopmail.com', 'tempmail.com'
]);

export async function isDisposableEmail(email: string): Promise<boolean> {
  try {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return true;

    // Hardcoded obvious test/temp domains or if it literally contains 'temp'
    if (HARDCODED_TEMP_DOMAINS.has(domain) || domain.includes('temp') || domain.includes('test')) {
      return true;
    }

    if (!cachedDomains) {
      // Fetch community-maintained list of temporary/disposable email domains
      const response = await fetch('https://raw.githubusercontent.com/ivolo/disposable-email-domains/master/index.json');
      if (response.ok) {
        const domains: string[] = await response.json();
        cachedDomains = new Set(domains);
      }
    }
    
    if (cachedDomains && cachedDomains.has(domain)) return true;
    
    return false;
  } catch (error) {
    console.error('Failed to check disposable email:', error);
    // Even if fetch fails, check hardcoded
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain && (domain.includes('temp') || domain.includes('test'))) return true;
    return false; // Fail open for legitimate users
  }
}
