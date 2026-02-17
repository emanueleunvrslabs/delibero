-- Deny all access to linkedin_tokens for anon/authenticated users
CREATE POLICY "Deny all access to linkedin_tokens"
  ON public.linkedin_tokens
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);