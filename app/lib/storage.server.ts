import { randomUUID } from 'node:crypto';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');

export const uploadFile = async (file: File) => {
  const ext = file.name.split('.').pop();
  const fileName = `${randomUUID()}.${ext}`;
  const { data, error } = await supabase.storage.from('screen').upload(fileName, file);
  if (error) throw error;
  return data.path;
};
