
-- Drop the overly permissive policy
DROP POLICY "Service role full access" ON public.delibere;

-- No INSERT/UPDATE/DELETE policies for anon/authenticated users
-- Edge functions use service_role key which bypasses RLS entirely
-- So we don't need any write policy at all
