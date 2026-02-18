
-- Table for WhatsApp verified users
CREATE TABLE public.whatsapp_verified_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL UNIQUE,
  otp_code TEXT,
  otp_expires_at TIMESTAMP WITH TIME ZONE,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.whatsapp_verified_users ENABLE ROW LEVEL SECURITY;

-- No public access - only edge functions with service role can read/write
CREATE POLICY "Deny all access to whatsapp_verified_users"
  ON public.whatsapp_verified_users
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);
