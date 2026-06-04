import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type LeadStatus = 'New' | 'Contacted' | 'Assigned' | 'Completed' | 'Cancelled';

export interface Lead {
  id: string;
  name: string;
  mobile: string;
  service: string;
  address: string;
  taluka: string | null;
  preferred_date: string | null;
  message: string | null;
  status: LeadStatus;
  language: string;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  category: 'home' | 'travel';
  price: string | null;
  visit_charge: string | null;
  visit_charge_adjusted: boolean;
  icon: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
