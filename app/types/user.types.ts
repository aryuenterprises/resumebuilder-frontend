export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  amount?: number;
  planId?: string | null;
  planName?: string;
  planPrice?: string;
};
