import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');

export const uploadFile = async (file: File) => {
  console.log(file.name, file);
  const { data, error } = await supabase.storage.from('screen').upload(file.name, file);
  if (error) throw error;
  return data.path;
};
