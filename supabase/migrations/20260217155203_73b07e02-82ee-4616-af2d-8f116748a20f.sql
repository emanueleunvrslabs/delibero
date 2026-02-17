
-- Table to store LinkedIn OAuth tokens
CREATE TABLE public.linkedin_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  refresh_token_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.linkedin_tokens ENABLE ROW LEVEL SECURITY;

-- Only service role can access tokens (no public access)
-- No RLS policies = no access via anon/authenticated, only service role key

-- Trigger for updated_at
CREATE TRIGGER update_linkedin_tokens_updated_at
  BEFORE UPDATE ON public.linkedin_tokens
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
