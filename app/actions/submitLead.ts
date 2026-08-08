'use server';

import { supabase } from '@/lib/supabase';
import { isDisposableEmail } from '@/utils/tempMailCheck';

type LeadData = {
  name: string;
  email: string;
  phone: string;
  budget: string;
  details: string;
};

export async function submitLead(data: LeadData) {
  try {
    const { name, email, phone, budget, details } = data;

    if (!name || !email || !details || !phone) {
      return { success: false, error: 'Please fill in all required fields.' };
    }

    // Basic phone validation: mostly numbers, allows spaces, plus, hyphens, min 7 digits
    const phoneRegex = /^\+?[\d\s\-()]{7,20}$/;
    if (!phoneRegex.test(phone)) {
      return { success: false, error: 'Please enter a valid mobile number.' };
    }

    // 1. Validate against temporary/disposable emails
    const isTemp = await isDisposableEmail(email);
    if (isTemp) {
      return { success: false, error: 'Temporary or disposable email addresses are not allowed. Please use a valid email.' };
    }

    // 2. Insert into Supabase
    const { error } = await supabase.from('leads').insert({
      name,
      contact_info: email,
      country_code: phone, // using country_code field to store phone number since they want phone in contact form
      source: 'Website',
      status: 'New',
      notes: `Budget: ${budget}\nDetails: ${details}`
    });

    if (error) {
      console.error('Supabase insertion error:', error);
      return { success: false, error: 'Failed to submit your query. Please try again later.' };
    }

    return { success: true };
  } catch (error: unknown) {
    console.error('Lead submission error:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
