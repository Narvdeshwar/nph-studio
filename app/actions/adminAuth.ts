'use server';

import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';

export async function checkSetupStatus() {
  try {
    const { count, error } = await supabase
      .from('admin_users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'superadmin');

    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true, needsSetup: count === 0 };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
  }
}

// This function verifies a login attempt against the hashed password in the database
export async function verifyLogin(username: string, passwordRaw: string) {
  try {
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error);
      return { success: false, error: `DB Error: ${error.message || JSON.stringify(error)}` };
    }
    if (!user) {
      return { success: false, error: 'User not found in database' };
    }

    // Compare the raw password with the hashed password stored in the DB
    const isValid = await bcrypt.compare(passwordRaw, user.password);

    if (isValid) {
      return { 
        success: true, 
        user: { id: user.id, username: user.username, role: user.role } 
      };
    } else {
      return { success: false, error: 'Password does not match' };
    }
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
  }
}

// This function hashes a new password and creates the user
export async function createAdminUser(username: string, passwordRaw: string, role: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(passwordRaw, salt);

    const { data, error } = await supabase
      .from('admin_users')
      .insert([
        { 
          username, 
          password: passwordHash, 
          role 
        }
      ])
      .select()
      .single();

    if (error) {
      // Handle unique constraint violation gracefully
      if (error.code === '23505') {
        return { success: false, error: 'Username already exists' };
      }
      return { success: false, error: error.message };
    }

    return { success: true, user: data };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
  }
}
