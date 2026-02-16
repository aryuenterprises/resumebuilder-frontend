export type User = {
  id: string;
  firstName: string;
  lastName: string;
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
